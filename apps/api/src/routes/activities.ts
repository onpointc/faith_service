import { FastifyInstance } from 'fastify';
import { prisma } from '../prisma';

import { requireAuth } from '../auth';
export async function activitiesRoutes(app: FastifyInstance) {
  app.get('/activities', async (req, res) => {
    const { year } = (req.query as any) || {};
    const activities = await prisma.activity.findMany({
      where: year ? { yearGroups: { has: year } } : {},
      orderBy: { date: 'asc' }
    });
    return activities;
  });

  app.post('/activities', { preHandler: requireAuth }, async (req, res) => {
    const body = req.body as any;
    const activity = await prisma.activity.create({
      data: {
        title: body.title,
        description: body.description,
        date: new Date(body.date),
        location: body.location,
        points: body.points ?? 0,
        yearGroups: body.yearGroups ?? [],
        createdById: body.createdById ?? 'teacher-id-placeholder',
        tags: body.tags ?? []
      }
    });
    return activity;
  });
}
