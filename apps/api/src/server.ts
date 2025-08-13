import { newsRoutes } from './routes/news';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { activitiesRoutes } from './routes/activities';
import { registrationsRoutes } from './routes/registrations';
import { submissionsRoutes } from './routes/submissions';

const server = Fastify();
await server.register(cors, { origin: true });

server.get('/health', async () => ({ ok: true }));

await server.register(activitiesRoutes);
await server.register(registrationsRoutes);
await server.register(submissionsRoutes);
await server.register(newsRoutes);

server.listen({ port: Number(process.env.API_PORT || 8787), host: '0.0.0.0' })
  .then(() => console.log('API listening on', process.env.API_PORT || 8787))
  .catch((e) => { console.error(e); process.exit(1); });
