import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoggerService } from '../logger.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private logger: LoggerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error.error instanceof ErrorEvent) {
          this.logger.error(error.error);
          return throwError(error.error);
        } else {
          this.logger.error(error);
          return throwError(error);
        }
      })
    );
  }
}
