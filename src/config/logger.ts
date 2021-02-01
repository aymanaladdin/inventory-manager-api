export interface ILoggerConfig {
  level: string
}

export const loggerConfig: ILoggerConfig = {
  level: process.env.LOG_LEVEL || 'silly',
}