import express from 'express';
import { logger } from '../../extensions';
import { AuthService } from './auth.service';

export class IsAuthorizedMiddleWare {
  public verify = this.tokenDecoder.bind(this);

  constructor(private authService: AuthService) { }


  private async tokenDecoder(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    if (!req.headers?.authorization)
      res.status(401).json({ error: { message: 'Unauthorized, no authorization header found!' } });

    else {
      try {
        const decodedToken = await this.authService.verifyToken(req.headers.authorization.split(' ')[1]);
        console.log('decodedToken', decodedToken);

        (<any>req).decodedToken = decodedToken;

        next();
      }

      catch (err) {
        logger.error('error verify Token:', err);

        res.status(401).json({ error: { message: 'Unauthorized, invalid authorization header!' } });
      }
    }
  }
}