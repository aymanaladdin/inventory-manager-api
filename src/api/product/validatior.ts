import Joi from 'joi';
import express from 'express';

const stringPattern = Joi.string()
  .trim()
  .pattern(
    /^[a-zA-Z0-9_:\s#\-@.]+$/,
    { name: 'alpha-num, underscore, dash, column, white-space' }
  );

export const productValidator = {

  listProducts(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const query = Joi
      .object()
      .keys({
        limit: Joi.number().min(1).max(50),
        offset: Joi.number().min(0)
      });

    try {
      Joi.assert(req.query, query, { abortEarly: false });
      next();
    }

    catch (err) {
      res.status(400).json({ errors: err.details })
    }
  },

  getProduct(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const params = Joi
      .object()
      .keys({
        key: Joi.string().length(10).required()
      });

    try {
      Joi.assert(req.params, params, { abortEarly: false });
      next();
    }

    catch (err) {
      res.status(400).json({ errors: err.details })
    }
  },

  createProduct(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const body = Joi
      .object()
      .keys({
        name: stringPattern.min(1).max(75).required(),
        description: stringPattern.min(1).max(65535).optional(),
        category: stringPattern.min(1).max(75).required(),
        price: Joi.number().min(0).max(999999.99).precision(2).required(),
        quantity: Joi.number().min(0).max(4294967295).precision(0).required()
      });

    try {
      Joi.assert(req.body, body, { abortEarly: false, convert: false });
      next();
    }

    catch (err) {
      res.status(400).json({ errors: err.details })
    }
  }
}