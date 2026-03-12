import type { FastifyPluginAsync } from 'fastify';

export function createServiceRoute(serviceName: string): FastifyPluginAsync {
  return async (app) => {
    app.get('/health', async () => ({
      service: serviceName,
      status: 'ok',
      timestamp: new Date().toISOString()
    }));

    app.get('/', async () => ({
      service: serviceName,
      message: `${serviceName} service ready`
    }));

    app.post('/event', async (request) => ({
      service: serviceName,
      received: true,
      payload: request.body ?? {}
    }));
  };
}
