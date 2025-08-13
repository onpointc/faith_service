import { FastifyInstance } from 'fastify';
import { prisma } from '../prisma';

import { requireAuth } from '../auth';
export async function registrationsRoutes(app: FastifyInstance) {
  app.post('/registrations', { preHandler: requireAuth }, async (req, res) => {
    const body = req.body as any;
    const reg = await prisma.activityRegistration.create({
      data: {
        activityId: body.activityId,
        studentId: body.studentId,
        status: 'REGISTERED'
      }
    });
    return reg;
  });
}
