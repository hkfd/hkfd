import { async, TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';

import { ErrorInterceptor } from './error-interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerService, MockLoggerService } from 'testing';
import { HttpErrorResponse, HttpHandler } from '@angular/common/http';

let loggerService: LoggerService;
let errorInterceptor: ErrorInterceptor;

describe('`ErrorInterceptor`', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ErrorInterceptor,
        { provide: LoggerService, useClass: MockLoggerService }
      ]
    }).compileComponents()));

  beforeEach(async(() => createService()));

  describe('`intercept`', () => {
    it('should call `next` `handle` with `req` arg', async(() => {
      const httpHandlerStub = {
        handle: jest.fn().mockReturnValue(of(undefined))
      };
      errorInterceptor.intercept('req' as any, httpHandlerStub).subscribe();

      expect(httpHandlerStub.handle).toHaveBeenCalledWith('req');
    }));

    describe('`handleError`', () => {
      describe('Is `ErrorEvent`', () => {
        let errorError: ErrorEvent;
        let error: HttpErrorResponse;
        let httpHandlerStub: HttpHandler;

        beforeEach(() => {
          errorError = new ErrorEvent('error');
          error = new HttpErrorResponse({ error: errorError });
          httpHandlerStub = {
            handle: jest.fn().mockReturnValue(throwError(error))
          };
        });

        it('should call `LoggerService` `error` with `error.error` arg', async(() => {
          errorInterceptor
            .intercept('req' as any, httpHandlerStub)
            .subscribe(() => undefined, () => undefined);

          expect(loggerService.error).toHaveBeenCalledWith(errorError);
        }));

        it('should return  `error.error`', async(() => {
          errorInterceptor
            .intercept('req' as any, httpHandlerStub)
            .subscribe(_ => fail(), err => expect(err).toBe(errorError));
        }));
      });

      describe('Not `ErrorEvent`', () => {
        let errorError: string;
        let error: HttpErrorResponse;
        let httpHandlerStub: HttpHandler;

        beforeEach(() => {
          errorError = 'Network error';
          error = new HttpErrorResponse({ error: errorError });
          httpHandlerStub = {
            handle: jest.fn().mockReturnValue(throwError(error))
          };
        });

        it('should call `LoggerService` `error` with `error` arg', async(() => {
          errorInterceptor
            .intercept('req' as any, httpHandlerStub)
            .subscribe(() => undefined, () => undefined);

          expect(loggerService.error).toHaveBeenCalledWith(error);
        }));

        it('should return `error` arg', async(() => {
          errorInterceptor
            .intercept('req' as any, httpHandlerStub)
            .subscribe(_ => fail(), err => expect(err).toBe(error));
        }));
      });
    });
  });
});

function createService() {
  errorInterceptor = TestBed.get(ErrorInterceptor);
  loggerService = TestBed.get(LoggerService);
}
