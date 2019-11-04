import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import ajv from 'ajv';
import { config, requestHandler, errorHandler } from 'raven';

import { Email } from './schema';
import schemaJson from './schema.json';
import { client, createMessage } from './postmark';

const app = express();
const validate = new ajv({ allErrors: true }).compile(schemaJson);

config(functions.config().sentry.dsn, {
  environment: process.env.GCLOUD_PROJECT
}).install();

app.use(requestHandler());
app.use(cors({ origin: true }));
app.use(compression());
app.use(express.json());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"]
    }
  })
);

const validateRequest: express.RequestHandler = (req, res, next) => {
  const valid = validate(req.body);
  if (valid) return next();

  return res
    .status(400)
    .json(validate.errors)
    .end();
};

app.post('*', validateRequest, ({ body }: { body: Email }, res, next) => {
  const data = createMessage(body);

  client
    .sendEmail(data)
    .then(({ ErrorCode, Message }) => {
      if (ErrorCode !== 0) throw new Error(Message);

      return res.status(200).json('OK');
    })
    .catch(next);
});

app.all('*', (_, res) => res.sendStatus(404));

app.use(errorHandler());

export const email = functions.https.onRequest(app);
