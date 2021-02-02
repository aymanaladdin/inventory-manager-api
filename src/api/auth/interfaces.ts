export interface IUserToken {
  activeAccessToken,
  activeRefreshToken
}

export interface IUSer {
  key: string;
  name: string;
  email: string;
  password: string,
  createdAt: Date;
  updatedAt: Date;
}