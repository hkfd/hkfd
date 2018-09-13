import * as functions from 'firebase-functions';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import ajv from 'ajv';
import { setApiKey, send } from '@sendgrid/mail';
import { config, requestHandler, errorHandler } from 'raven';

import { Email } from './schema';
import schemaJson from './schema.json';

const app = express();
const validate = new ajv({ allErrors: true }).compile(schemaJson);

setApiKey(functions.config().sendgrid.key);
config(functions.config().sentry.dsn, {
  environment: process.env.GCLOUD_PROJECT
}).install();

app.use(requestHandler());
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

app.post(
  '*',
  validateRequest,
  ({ body: { name, email, message } }: { body: Email }, res, next) => {
    const data = {
      to: functions.config().email.to,
      from: functions.config().email.from,
      replyTo: {
        name,
        email
      },
      subject: functions.config().email.subject,
      text: message
    };

    send(data)
      .then(_ => res.sendStatus(200))
      .catch(next);
  }
);

app.all('*', (_, res) => res.sendStatus(404));

app.use(errorHandler());

export const email = functions.https.onRequest(app);