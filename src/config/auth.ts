export interface IAuthConfig {
  passwordSaltRounds: number,
  tokenPrivateKey: string,
  tokenIssuer: string,
  tokenAudience: string
}


export const authConfig = {
  passwordSaltRounds: parseInt(process.env.AUTH_PASS_SALT_ROUNDS, 10),
  tokenPrivateKey: process.env.AUTH_TOKEN_PRIVATE_KEY,
  tokenIssuer: process.env.AUTH_TOKEN_ISS,
  tokenAudience: process.env.AUTH_TOKEN_AUD
}