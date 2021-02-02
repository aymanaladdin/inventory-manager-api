import express, { Router } from 'express';
import { apiConfig } from '../config';
import { logger } from '../extensions';
import { dependencyContainer } from './dependecy-injector';
import { IController } from './interfaces';

export function registerAppRoutes(app: express.Application): void {
  const router = Router();

  const controllers: IController[] = dependencyContainer.resolve('controllerList');

  controllers.forEach((controller: IController) => {
    router.use(controller.getPrefix(), controller.getRoutes());
    logger.info(`${controller.getPrefix()} routes registered successfully.`);
  })

  app.use(apiConfig.prefix, router);
  app.use((req, res, next) => { next({ status: 404, message: 'Not Found !' }); });

  logger.info(`App routes registered successfully.`);
}