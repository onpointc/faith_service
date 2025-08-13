import { FastifyInstance } from 'fastify';
import { prisma } from '../prisma';

import { requireAuth } from '../auth';
export async function submissionsRoutes(app: FastifyInstance) {
  // list submissions with filters
  app.get('/submissions', async (req, res) => {
    const q = (req.query as any) || {};
    const where: any = {};
    if (q.status) where.status = q.status;
    if (q.year) where.student = { user: { yearGroup: { code: q.year } } };
    const subs = await prisma.submission.findMany({
      where,
      include: { activity: true, student: { include: { user: true } }, messages: true },
      orderBy: { createdAt: 'desc' }
    });
    return subs;
  });

  // create a submission (student completion log)
  app.post('/submissions', { preHandler: requireAuth }, async (req, res) => {
    const body = req.body as any;
    const sub = await prisma.submission.create({
      data: {
        activityId: body.activityId,
        studentId: body.studentId,
        dateCompleted: new Date(body.dateCompleted),
        minutesSpent: body.minutesSpent ?? 0,
        reflection: body.reflection ?? '',
        proofUrl: body.proofUrl,
        status: 'PENDING',
        pointsAwarded: 0
      }
    });
    return sub;
  });

  // teacher replies to a submission (threaded)
  app.post('/submissions/:id/reply', { preHandler: requireAuth }, async (req, res) => {
    const { id } = req.params as any;
    const body = req.body as any;
    const msg = await prisma.submissionMessage.create({
      data: {
        submissionId: id,
        fromTeacher: true,
        content: body.content
      }
    });
    return msg;
  });

  // approve or reject submission and award points
  app.post('/submissions/:id/approve', { preHandler: requireAuth }, async (req, res) => {
    const { id } = req.params as any;
    const body = req.body as any; // { approve: boolean, points?: number }
    const approve = !!body.approve;
    const updated = await prisma.submission.update({
      where: { id },
      data: {
        status: approve ? 'APPROVED' : 'REJECTED',
        pointsAwarded: approve ? (body.points ?? 0) : 0
      }
    });
    if (approve && updated.pointsAwarded > 0) {
      // increment student's total points and add a transaction
      await prisma.student.update({
        where: { id: updated.studentId },
        data: { totalPoints: { increment: updated.pointsAwarded } }
      });
      await prisma.pointsTransaction.create({
        data: {
          studentId: updated.studentId,
          amount: updated.pointsAwarded,
          reason: 'Approved submission',
          submissionId: updated.id
        }
      });
    }
    return updated;
  });
}
