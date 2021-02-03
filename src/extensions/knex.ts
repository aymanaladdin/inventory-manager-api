import knex from 'knex';
import { knexConfig, mysqlConfig } from '../config';

export const knexClient = knex({
  client: knexConfig.client,
  version: '8.0',
  connection: mysqlConfig,
  pool: knexConfig.pool
})

export function checkDbConnection(): Promise<any> {
  return knexClient.raw('SELECT (1 + 1)');
}