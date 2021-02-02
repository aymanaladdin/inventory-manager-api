import express, { Router } from "express";

export interface IControllerOptions {
  prefix: string,
  router: express.Router
}

export function productController(mainRouter: express.Router): IControllerOptions {
  const prefix = '/products';
  const productRouter = Router();

  productRouter.get('/', (req: express.Request, res: express.Response) => {
    res.json([]);
  });

  productRouter.post('/', (req: express.Request, res: express.Response) => {
    res.json({ message: 'created successfully' });
  });

  productRouter.get('/:id', (req: express.Request, res: express.Response) => {
    res.json({ id: req.params.id });
  });

  return {
    prefix,
    router: productRouter
  };
}