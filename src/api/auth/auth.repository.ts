import Knex from 'knex';
import { IUserToken, IUSer } from './interfaces';

export class AuthRepository {
  private tableName: string;

  constructor(private knexClient: Knex) {
    this.tableName = 'user'
  }

  public updateUserAuthPassword(key: string, newPass: string): Promise<any> {
    return this.knexClient.update({ password: newPass })
      .from(this.tableName)
      .where({ key });
  }

  public getUserTokenTuple(key: string, { activeAccessToken, activeRefreshToken }: Partial<IUserToken>): Promise<IUserToken> {

    return this.knexClient.first()
      .from('token')
      .where(Object.assign(
        { user: key },
        activeAccessToken ? { activeAccessToken } : {},
        activeRefreshToken ? { activeRefreshToken } : {},
      ));
  }

  public createUserTokenTuple(key: string, tokenTuple: IUserToken): Promise<void> {
    return this.knexClient.insert({ user: key, ...tokenTuple }).into('token');
  }

  public getUserCredsByName(name: string): Promise<Pick<IUSer, 'name' | 'password' | 'key'>> {
    return this.knexClient.first(['name', 'password', 'key'])
      .from(this.tableName)
      .where({ name });
  }

  public deleteUserTokenTuple(key: string, { activeAccessToken, activeRefreshToken }: Partial<IUserToken>): Knex.QueryBuilder<unknown, number> {
    return this.knexClient.delete()
      .from('token')
      .where(Object.assign(
        { user: key },
        activeAccessToken ? { activeAccessToken } : {},
        activeRefreshToken ? { activeRefreshToken } : {},
      ));
  }

}
