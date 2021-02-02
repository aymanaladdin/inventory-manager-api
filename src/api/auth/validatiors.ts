import Joi from 'joi';
import express from 'express';

const stringPattern = Joi.string()
  .trim()
  .pattern(
    /^[a-zA-Z0-9_:\s#\-@.]+$/,
    { name: 'alpha-num, underscore, dash, column, white-space' }
  );

export const authValidator = {

  login(req: express.Request, res: express.Response, next: express.NextFunction): void {
    const body = Joi
      .object()
      .keys({
        username: stringPattern.min(3).max(75).required(),
        password: Joi.string().min(8).max(50).required()
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