export interface IApiConfig {
  prefix: string,
  port: number
}

export const apiConfig: IApiConfig = {
  prefix: '/api',
  port: parseInt(process.env.PORT, 10)
}
