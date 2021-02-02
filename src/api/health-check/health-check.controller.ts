import express, { Router } from "express";

export interface IControllerOptions {
  prefix: string,
  router: express.Router
}

export function healthCheckController(mainRouter: express.Router): IControllerOptions {
  const prefix = '/health-check';
  const healthCheckRouter = Router();

  healthCheckRouter.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).json({});
  });

  return {
    prefix,
    router: healthCheckRouter
  };
}