import { ErrorHandler } from '@angular/core';

import * as Raven from 'raven-js';

import { environment } from '../environments/environment';

export class RavenErrorHandler implements ErrorHandler {
  constructor() {
    if (!environment.production) return;

    Raven.config(environment.sentry.dsn).install();
  }

  handleError(err: any) {
    console.error(err);
    Raven.captureException(err);
  }
}
