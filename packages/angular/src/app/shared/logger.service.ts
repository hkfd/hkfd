import { Injectable } from '@angular/core';

import * as Raven from 'raven-js';

import { environment } from '../../environments/environment';

@Injectable()
export class LoggerService {
  log(val: any, ...params: any[]) {
    if (environment.production) return;

    console.log(val, ...params);
  }

  warn(val: any, ...params: any[]) {
    console.warn(val, ...params);
    Raven.captureMessage(val, { level: 'warning' });
  }

  error(val: any, ...params: any[]) {
    console.error(val, ...params);
    Raven.captureException(val, ...params);
  }
}
