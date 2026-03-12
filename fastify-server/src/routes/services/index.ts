import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { analyticsServiceRoute } from './analytics.js';
import { authServiceRoute } from './auth.js';
import { billingServiceRoute } from './billing.js';
import { inventoryServiceRoute } from './inventory.js';
import { notificationsServiceRoute } from './notifications.js';
import { paymentsServiceRoute } from './payments.js';
import { reportsServiceRoute } from './reports.js';
import { searchServiceRoute } from './search.js';
import { slaServiceRoute } from './sla.js';
import { ticketsServiceRoute } from './tickets.js';
import { usersServiceRoute } from './users.js';

type RegistryEntry = {
  name: string;
  route: FastifyPluginAsync;
};

const serviceRegistry: RegistryEntry[] = [
  { name: 'auth', route: authServiceRoute },
  { name: 'users', route: usersServiceRoute },
  { name: 'tickets', route: ticketsServiceRoute },
  { name: 'billing', route: billingServiceRoute },
  { name: 'payments', route: paymentsServiceRoute },
  { name: 'notifications', route: notificationsServiceRoute },
  { name: 'analytics', route: analyticsServiceRoute },
  { name: 'inventory', route: inventoryServiceRoute },
  { name: 'search', route: searchServiceRoute },
  { name: 'reports', route: reportsServiceRoute },
  { name: 'sla', route: slaServiceRoute }
];

export async function registerServiceRoutes(app: FastifyInstance) {
  app.decorate('serviceRegistry', serviceRegistry.map((service) => service.name));

  for (const service of serviceRegistry) {
    await app.register(service.route, { prefix: `/api/${service.name}` });
  }

  app.get('/services', async () => ({
    count: app.serviceRegistry.length,
    services: app.serviceRegistry
  }));
}
