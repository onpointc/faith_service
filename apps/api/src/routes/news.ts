import { FastifyInstance } from 'fastify';
import { prisma } from '../prisma';
import { requireAuth } from '../auth';

export async function newsRoutes(app: FastifyInstance) {
  // List published news (optionally by schoolId)
  app.get('/news', async (req, res) => {
    const { schoolId } = (req.query as any) || {};
    const posts = await prisma.newsPost.findMany({
      where: {
        published: true,
        ...(schoolId ? { schoolId } : {})
      },
      orderBy: { createdAt: 'desc' }
    });
    return posts;
  });

  // Admin/Teacher: list all (including drafts)
  app.get('/news/all', async (req, res) => {
    const { schoolId } = (req.query as any) || {};
    const posts = await prisma.newsPost.findMany({
      where: { ...(schoolId ? { schoolId } : {}) },
      orderBy: { createdAt: 'desc' }
    });
    return posts;
  });

  // Create post
  app.post('/news', { preHandler: requireAuth }, async (req, res) => {
    const body = req.body as any;
    const post = await prisma.newsPost.create({
      data: {
        schoolId: body.schoolId,
        title: body.title,
        body: body.body,
        coverUrl: body.coverUrl,
        tags: body.tags ?? [],
        published: !!body.published
      }
    });
    return post;
  });

  // Update post (title/body/tags/published/cover)
  app.patch('/news/:id', { preHandler: requireAuth }, async (req, res) => {
    const { id } = req.params as any;
    const body = req.body as any;
    const post = await prisma.newsPost.update({
      where: { id },
      data: {
        title: body.title,
        body: body.body,
        coverUrl: body.coverUrl,
        tags: body.tags,
        published: body.published
      }
    });
    return post;
  });

  // Delete
  app.delete('/news/:id', { preHandler: requireAuth }, async (req, res) => {
    const { id } = req.params as any;
    await prisma.newsPost.delete({ where: { id } });
    return { ok: true };
  });
}
