export interface IKnexConfig {
  client: string,
  version: string,
  pool: {
    min: number,
    max: number
  }
}

export const knexConfig: IKnexConfig = {
  client: process.env.KNEX_CLIENT,
  version: process.env.KNEX_CLIENT_VERSION,
  pool: {
    min: parseInt(process.env.KNEX_POOL_MIN, 10),
    max: parseInt(process.env.KNEX_POOL_MAX, 10)
  }
}