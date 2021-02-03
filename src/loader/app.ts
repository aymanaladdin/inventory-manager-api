import express from 'express';
import { apiConfig } from '../config';
import { checkDbConnection, logger } from '../extensions';
import { registerAppRoutes } from './register-routes';
import { registerAppMiddleWare } from './register-middleware';

export interface IExpressAppOptions {
  app: express.Application
}

export async function loadApp({ app }: IExpressAppOptions): Promise<void> {
  try {
    await checkDbConnection();

    registerAppMiddleWare(app);
    registerAppRoutes(app);

    logger.info(`App loaded successfully.`);
  }
  catch (err) {
    logger.error(`Failed while loading app`, err);

    throw err;
  }
}

export function startApp({ app }: IExpressAppOptions): void {
  app.listen(apiConfig.port, () => {
    logger.info(`server up and running on port ${apiConfig.port}`);
  })
}