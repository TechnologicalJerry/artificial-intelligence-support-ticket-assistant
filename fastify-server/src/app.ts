import Fastify from 'fastify';
import { env } from '@/config/env.js';
import { registerCommonPlugins } from '@/plugins/common.js';
import { registerDatabases } from '@/plugins/databases.js';
import { healthRoute } from '@/routes/health.js';
import { registerServiceRoutes } from '@/routes/services/index.js';

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: env.LOG_LEVEL
    }
  });

  await registerCommonPlugins(app);
  await registerDatabases(app);
  await app.register(healthRoute);
  await registerServiceRoutes(app);

  return app;
}
