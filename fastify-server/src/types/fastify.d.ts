import type { FastifyInstance } from 'fastify';
import type { Connection as MongooseConnection } from 'mongoose';
import type { Pool as PgPool } from 'pg';
import type { Pool as MySqlPool } from 'mysql2/promise';

declare module 'fastify' {
  interface FastifyInstance {
    mongo?: MongooseConnection;
    mysql?: MySqlPool;
    postgres?: PgPool;
    serviceRegistry: string[];
  }
}

export type TypedFastify = FastifyInstance;
