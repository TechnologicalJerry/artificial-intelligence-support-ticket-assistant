import { describe, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';

describe('Fastify server', () => {
  it('responds from health endpoint', async () => {
    const app = await buildApp();

    const response = await app.inject({ method: 'GET', url: '/health' });
    expect(response.statusCode).toBe(200);

    const payload = response.json();
    expect(payload.status).toBe('ok');

    await app.close();
  });

  it('exposes more than 10 services', async () => {
    const app = await buildApp();

    const response = await app.inject({ method: 'GET', url: '/services' });
    expect(response.statusCode).toBe(200);

    const payload = response.json();
    expect(payload.count).toBeGreaterThanOrEqual(10);

    await app.close();
  });
});
