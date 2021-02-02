import express, { json } from 'express';
import cors from 'cors';
import { apiConfig } from '../config';
import { checkConnection, logger } from '../extensions';
import { registerRoutes } from './register-routes';

export interface IExpressAppOptions {
  app: express.Application
}

function errorHandler(err, req, res, next) {
  res.status(err.status || 500);

  res.json({ error: { message: err.message } });
}

export async function loadApp({ app }: IExpressAppOptions): Promise<void> {
  try {
    await checkConnection();
    logger.info(`DB connection checked successfully.`);

    app.use(cors());
    app.use(json());

    app.use(apiConfig.prefix, registerRoutes());
    logger.info(`App routes registered successfully.`);

    app.use((req, res, next) => { next({ status: 404, message: 'Not Found !' }); });
    app.use(errorHandler);
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