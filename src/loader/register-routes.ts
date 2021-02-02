import express, { Router } from 'express';
import { healthCheckController } from '../api/health-check/health-check.controller';
import { productController } from '../api/product/product.controller';
import { logger } from '../extensions';

export function registerRoutes(): express.Router {
  const router = Router();

  const product = productController(router);
  router.use(product.prefix, product.router);
  logger.info(`${product.prefix} routes registered successfully.`);

  const healthCheck = healthCheckController(router);
  router.use(healthCheck.prefix, healthCheck.router);
  logger.info(`${healthCheck.prefix} routes registered successfully.`);

  return router;
}