import { Injectable } from '@angular/core';

import * as Raven from 'raven-js';

import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(val: any, ...params: any[]) {
    if (environment.production) return;

    console.log(val, ...params);
  }

  warn(val: any, ...params: any[]) {
    console.warn(val, ...params);

    if (!environment.production) return;
    Raven.captureMessage(val, { level: 'warning' });
  }

  error(val: any, ...params: any[]) {
    console.error(val, ...params);

    if (!environment.production) return;
    Raven.captureException(val, ...params);
  }
}
