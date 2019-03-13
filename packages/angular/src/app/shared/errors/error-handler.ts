import { ErrorHandler } from '@angular/core';

import Raven from 'raven-js';

import { environment } from 'environment';

export class GlobalErrorHandler implements ErrorHandler {
  constructor() {
    if (!environment.production) return;

    Raven.config(environment.sentry.dsn).install();
  }

  handleError(err: any) {
    console.error(err);
    Raven.captureException(err);
  }
}
