import { ErrorHandler } from '@angular/core';

import Raven from 'raven-js';

import { environment } from 'environment';

export class GlobalErrorHandler implements ErrorHandler {
  constructor() {
    environment.production && Raven.config(environment.sentry.dsn).install();
  }

  handleError(err: any) {
    console.error(err);
    environment.production && Raven.captureException(err);
  }
}
