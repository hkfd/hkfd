import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class LoggerService {
  env = environment;

  log(val: any, ...params: any[]) {
    if (this.env.production) return;

    console.log(val, ...params);
  }

  warn(val: any, ...params: any[]) {
    if (this.env.production) return;

    console.warn(val, ...params);
  }

  error(val: any, ...params: any[]) {
    console.error(val, ...params);
  }
}
