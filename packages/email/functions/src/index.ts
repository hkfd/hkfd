import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import { config, requestHandler, errorHandler } from 'raven';

import { Email } from './schema';
import { client, createMessage, responseHasErrors } from './postmark';
import { validateRequest } from './validation';

const app = express();

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

app.post('*', validateRequest, ({ body }: { body: Email }, res, next) => {
  const data = createMessage(body);

  client
    .sendEmail(data)
    .then(({ ErrorCode, Message }) => {
      if (responseHasErrors(ErrorCode)) throw new Error(Message);

      return res.status(200).json('OK');
    })
    .catch(next);
});

app.all('*', (_, res) => res.sendStatus(404));

app.use(errorHandler());

export const email = functions.https.onRequest(app);
