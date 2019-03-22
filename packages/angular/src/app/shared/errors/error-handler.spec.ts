import Raven from 'raven-js';
import { environment } from 'environment';

import { GlobalErrorHandler } from './error-handler';

let globalErrorHandler: GlobalErrorHandler;
let document: Document;

jest.mock('raven-js', () => {
  const install = jest.fn();

  return {
    config: jest.fn().mockReturnValue({ install }),
    captureException: jest.fn()
  };
});
jest.spyOn(global.console, 'error').mockImplementation(() => undefined);

beforeEach(jest.clearAllMocks);

describe('`GlobalErrorHandler`', () => {
  beforeEach(
    () => (document = { body: { classList: { add: jest.fn() } } } as any)
  );

  describe('`production`', () => {
    beforeEach(() => {
      environment.production = true;
      environment.sentry.dsn = 'dsn';
    });

    it('should call `Raven` `config` with `environment.sentry.dsn` arg', () => {
      globalErrorHandler = new GlobalErrorHandler(document);

      expect(Raven.config).toHaveBeenCalledWith('dsn');
    });

    it('should call `Raven` `config` `install`', () => {
      globalErrorHandler = new GlobalErrorHandler(document);

      expect(Raven.config('').install).toHaveBeenCalled();
    });
  });

  describe('Not `production`', () => {
    beforeEach(() => {
      environment.production = false;
      environment.sentry.dsn = 'dsn';
    });

    it('should not call `Raven` `config`', () => {
      expect(Raven.config).not.toHaveBeenCalled();
    });
  });

  describe('`handleError`', () => {
    it('should call `document.body.classList.add` with error arg', () => {
      globalErrorHandler = new GlobalErrorHandler(document);
      globalErrorHandler.handleError('Error');

      expect(document.body.classList.add).toHaveBeenCalledWith('error');
    });

    it('should call `console` `error` with `error` arg', () => {
      globalErrorHandler = new GlobalErrorHandler(document);
      globalErrorHandler.handleError('error');

      expect(console.error).toHaveBeenCalledWith('error');
    });

    describe('`production`', () => {
      beforeEach(() => {
        environment.production = true;
        globalErrorHandler = new GlobalErrorHandler(document);
        globalErrorHandler.handleError('error');
      });

      it('should call `Raven` `captureException` with `error` arg', () => {
        expect(Raven.captureException).toHaveBeenCalledWith('error');
      });
    });

    describe('Not `production`', () => {
      beforeEach(() => {
        environment.production = false;
        globalErrorHandler = new GlobalErrorHandler(document);
        globalErrorHandler.handleError('error');
      });

      it('should not call `Raven` `captureException`', () => {
        expect(Raven.captureException).not.toHaveBeenCalled();
      });
    });
  });
});
