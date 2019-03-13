import Raven from 'raven-js';
import { environment } from 'environment';

import { GlobalErrorHandler } from './error-handler';

let globalErrorHandler: GlobalErrorHandler;

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
  describe('`production`', () => {
    beforeEach(() => {
      environment.production = true;
      environment.sentry.dsn = 'dsn';
    });

    it('should call `Raven` `config` with `environment.sentry.dsn` arg', () => {
      globalErrorHandler = new GlobalErrorHandler();

      expect(Raven.config).toHaveBeenCalledWith('dsn');
    });

    it('should call `Raven` `config` `install`', () => {
      globalErrorHandler = new GlobalErrorHandler();

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
    it('should call `console` `error` with `error` arg', () => {
      globalErrorHandler = new GlobalErrorHandler();
      globalErrorHandler.handleError('error');

      expect(console.error).toHaveBeenCalledWith('error');
    });

    describe('`production`', () => {
      beforeEach(() => {
        environment.production = true;
        globalErrorHandler = new GlobalErrorHandler();
        globalErrorHandler.handleError('error');
      });

      it('should call `Raven` `captureException` with `error` arg', () => {
        expect(Raven.captureException).toHaveBeenCalledWith('error');
      });
    });

    describe('Not `production`', () => {
      beforeEach(() => {
        environment.production = false;
        globalErrorHandler = new GlobalErrorHandler();
        globalErrorHandler.handleError('error');
      });

      it('should not call `Raven` `captureException`', () => {
        expect(Raven.captureException).not.toHaveBeenCalled();
      });
    });
  });
});
