export interface IMysqlConfig {
  host: string,
  user: string,
  password: string,
  database: string
}

export const mysqlConfig: IMysqlConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB
}