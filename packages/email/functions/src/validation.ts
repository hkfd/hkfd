import express from 'express';
import ajv from 'ajv';

import schemaJson from './schema.json';

export const validate = new ajv({ allErrors: true }).compile(schemaJson);

export const validateRequest: express.RequestHandler = (req, res, next) => {
  const valid = validate(req.body);
  if (valid) return next();

  return res
    .status(400)
    .json(validate.errors)
    .end();
};
