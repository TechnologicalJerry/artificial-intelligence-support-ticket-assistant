import type { FastifyInstance } from 'fastify';
import { env } from '../config/env.js';
import { connectMongo } from '../db/mongo.js';
import { createMySqlPool } from '../db/mysql.js';
import { createPostgresPool } from '../db/postgres.js';

export async function registerDatabases(app: FastifyInstance) {
  if (env.ENABLE_MONGO) {
    app.mongo = await connectMongo();
    app.log.info('MongoDB connected');
  }

  if (env.ENABLE_MYSQL) {
    app.mysql = createMySqlPool();
    await app.mysql.query('SELECT 1');
    app.log.info('MySQL connected');
  }

  if (env.ENABLE_POSTGRES) {
    app.postgres = createPostgresPool();
    await app.postgres.query('SELECT 1');
    app.log.info('PostgreSQL connected');
  }

  app.addHook('onClose', async () => {
    if (app.mysql) {
      await app.mysql.end();
    }
    if (app.postgres) {
      await app.postgres.end();
    }
    if (app.mongo) {
      await app.mongo.close();
    }
  });
}
