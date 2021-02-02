import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { IUserToken } from "./interfaces";
import { authConfig } from '../../config/auth';
import { AuthRepository } from "./auth.repository";

export class AuthService {
  constructor(private authRepository: AuthRepository) { }

  public async updateUserAuthPassword(key: string, newPass: string): Promise<void> {
    const salt = await bcrypt.genSalt(authConfig.passwordSaltRounds);
    const hashedPass = await bcrypt.hash(newPass, salt);

    return this.authRepository.updateUserAuthPassword(key, hashedPass);
  }

  public getUserAuthByName(name: string): Promise<{ key: string, name: string, password: string; }> {
    return this.authRepository.getUserCredsByName(name);
  }

  public async validateUserPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public getUserAuthTokens(key: string, token: Partial<IUserToken>): Promise<IUserToken> {
    return this.authRepository.getUserTokenTuple(key, token);
  }

  public deleteUserAuthTokens(key: string, token: Partial<IUserToken>): Promise<any> {
    return this.authRepository.deleteUserTokenTuple(key, token);
  }

  public async refreshUserAuthToken(usreKey: string, userName: string): Promise<{ accessToken: string, refreshToken: string }> {
    const { accessToken, refreshToken } = await this.generateAuthTokens(usreKey, userName);
    await this.authRepository.createUserTokenTuple(usreKey, { activeAccessToken: accessToken.id, activeRefreshToken: refreshToken.id })

    return { accessToken: accessToken.token, refreshToken: refreshToken.token };
  }

  private async generateAuthTokens(usreKey: string, userName: string) {
    const accessToken = await this.generateToken({ usreKey, userName, expiry: 60 * 3 });
    const refreshToken = await this.generateToken({ usreKey, userName, expiry: 60 * 5 });

    return { accessToken, refreshToken }
  }

  public verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options: jwt.SignOptions = {
        issuer: authConfig.tokenIssuer,
        audience: [authConfig.tokenAudience],
      };

      jwt.verify(token, authConfig.tokenPrivateKey, options, (err, decoded) => {
        if (err) return reject(err);

        return resolve(decoded)
      });
    });
  }

  private generateToken({ usreKey, userName, expiry }: { usreKey: string, userName: string, expiry: number }): Promise<{ token: string, id: string }> {
    const id = nanoid(15);

    return new Promise((resolve, reject) => {
      const options: jwt.SignOptions = {
        jwtid: id,
        subject: usreKey,
        issuer: authConfig.tokenIssuer,
        audience: [authConfig.tokenAudience],
        expiresIn: expiry
      };

      jwt.sign({ user: { name: userName } }, authConfig.tokenPrivateKey, options, (err, token) => {
        if (err) return reject(err);

        return resolve({ token, id })
      });
    });
  }
}
