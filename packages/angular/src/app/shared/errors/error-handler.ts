import { ErrorHandler, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import Raven from 'raven-js';

import { environment } from 'environment';

export class GlobalErrorHandler implements ErrorHandler {
  constructor(@Inject(DOCUMENT) private document: Document) {
    environment.production && Raven.config(environment.sentry.dsn).install();
  }

  handleError(err: any) {
    this.document.body.classList.add('error');

    console.error(err);
    environment.production && Raven.captureException(err);
  }
}
