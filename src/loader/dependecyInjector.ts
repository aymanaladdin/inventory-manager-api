import { Router } from 'express';
import { Container } from 'typedi';
import { knexClient, logger } from '../extensions';

export function InjectAppDependencies(): void {
  try {

    Container.set('router', Router());
    Container.set('logger', logger);
    Container.set('knexClient', knexClient);

    logger.info('Loader dependencies injected successfully.');
  }
  catch (err) {
    logger.error('Failed to inject loader dependencies!', err);

    throw err;
  }
}