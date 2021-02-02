import express, { json } from 'express';
import cors from 'cors';
import { logger } from '../extensions';

function errorHandler(err, req, res, next) {
  res.status(err.status || 500);

  res.json({ error: { message: err.message } });
}


export function registerAppMiddleWare(app: express.Application): void {
  app.use(cors());
  app.use(json());

  app.use(errorHandler);

  logger.info(`App middleware registered.`);
}