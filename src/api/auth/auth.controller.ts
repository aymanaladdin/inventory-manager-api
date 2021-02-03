import { json } from "body-parser";
import express, { Router } from "express";
import { IController, IValidator } from "../../loader/interfaces";
import { AuthService } from "./auth.service";
import { IsAuthorizedMiddleWare } from "./middleware";

export class AuthController implements IController {
  private prefix: string;
  private routes: express.Router;

  constructor(
    private authService: AuthService,
    private authValidator: IValidator,
    private isAuthorizedMiddleWare: IsAuthorizedMiddleWare
  ) {
    this.prefix = '/auth';
    this.routes = Router();

    this.registerRoutes();
  }

  public getRoutes(): express.Router {
    return this.routes;
  }

  public getPrefix(): string {
    return this.prefix;
  }

  private registerRoutes() {
    this.routes.post('/login', this.authValidator.login, async (req: express.Request, res: express.Response) => {
      const clientCreds = await this.authService.getUserAuthByName(req.body.username);

      if (!clientCreds) res.status(403).json({ error: { message: 'Forbidden, invalid username or password' } });

      else {
        const validPass = await this.authService.validateUserPassword(req.body.password, clientCreds.password);

        if (!validPass) res.status(403).json({ error: { message: 'Forbidden, invalid username or password' } });

        else {
          const tokens = await this.authService.refreshUserAuthToken(clientCreds.key, clientCreds.name);

          res.status(200).json(tokens);
        }
      }
    });

    this.routes.post('/logout', async (req: express.Request, res: express.Response) => {
      try {
        if (req.headers.authorization) {
          const decodedToken = await this.authService.verifyToken(req.headers.authorization.split(' ')[1]);
          const { sub, jti } = decodedToken;
          const tokens = await this.authService.getUserAuthTokens(sub, { activeAccessToken: jti });

          if (tokens) await this.authService.deleteUserAuthTokens(sub, { activeAccessToken: jti });
        }
      }
      finally {
        res.status(204).end();
      }
    });

    this.routes.post('/refresh-token', this.isAuthorizedMiddleWare.verify, async (req: express.Request, res: express.Response) => {
      const { sub, jti, user } = (<any>req).decodedToken;
      const tokens = await this.authService.getUserAuthTokens(sub, { activeRefreshToken: jti });

      if (!tokens) res.status(403).json('Forbidden, your token not exist or invalid!');

      else {
        await this.authService.deleteUserAuthTokens(sub, { activeRefreshToken: jti });
        const newTokens = await this.authService.refreshUserAuthToken(sub, user?.name);

        res.status(200).json(newTokens);
      }
    });
  }
}