import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validator =
  (schema: Joi.AnySchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      res.redirectFlash('/auth', { invalid: message });
    }
  };
