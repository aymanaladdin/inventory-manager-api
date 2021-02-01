import express, { json } from 'express';
import cors from 'cors';
import Container from 'typedi';
import { apiConfig } from '../config';
import { logger } from '../extensions';
import { InjectAppDependencies } from './dependecyInjector';

export interface IExpressAppOptions {
  app: express.Application
}

function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: { message: err.message }
  });
}

export function loadApp({ app }: IExpressAppOptions): void {
  InjectAppDependencies(); //inject all helper dependencies knexClient, logger

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(json());

  // Load API routes
  // app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;

    next(err);
  });

  app.use(errorHandler);
}

export function startApp({ app }: IExpressAppOptions): void {
  app.listen(apiConfig.port, () => {

    Container.get(logger).info(`server up and running on port ${apiConfig.port}`);
  })
}