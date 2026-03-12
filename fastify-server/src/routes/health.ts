import type { FastifyPluginAsync } from 'fastify';

export const healthRoute: FastifyPluginAsync = async (app) => {
  app.get('/health', async () => ({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    databases: {
      mongo: Boolean(app.mongo),
      mysql: Boolean(app.mysql),
      postgres: Boolean(app.postgres)
    }
  }));
};
