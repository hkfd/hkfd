import { TestBed, async } from '@angular/core/testing';

import Raven from 'raven-js';

import { environment } from 'environment';
import { LoggerService } from './logger.service';

let loggerService: LoggerService;

jest.mock('raven-js');

describe('LoggerService', () => {
  beforeEach(jest.clearAllMocks);

  beforeEach(async(() =>
    TestBed.configureTestingModule({
      providers: [LoggerService]
    }).compileComponents()));

  beforeEach(async(() => createService()));

  it('should create service', () => {
    expect(loggerService).toBeTruthy();
  });

  describe('`log`', () => {
    describe('Is `production`', () => {
      beforeEach(() => {
        environment.production = true;
        loggerService.log('val', 'param');
      });

      it('should not call `console` `log`', () => {
        expect(console.log).not.toHaveBeenCalled();
      });
    });

    describe('Not `production`', () => {
      beforeEach(() => {
        environment.production = false;
        loggerService.log('val', 'param');
      });

      it('should call `console` `log` with args', () => {
        expect(console.log).toHaveBeenCalledWith('val', 'param');
      });
    });
  });

  describe('`warn`', () => {
    describe('Is `production`', () => {
      beforeEach(() => {
        environment.production = true;
        loggerService.warn('val', 'param');
      });

      it('should call `console` `warn` with args', () => {
        expect(console.warn).toHaveBeenCalledWith('val', 'param');
      });

      it('should call `Raven` `captureMessage` with `val` and `warning` level args', () => {
        expect(Raven.captureMessage).toHaveBeenCalledWith('val', {
          level: 'warning'
        });
      });
    });

    describe('Not `production`', () => {
      beforeEach(() => {
        environment.production = false;
        loggerService.warn('val', 'param');
      });

      it('should call `console` `warn` with args', () => {
        expect(console.warn).toHaveBeenCalledWith('val', 'param');
      });

      it('should not call `Raven` `captureMessage`', () => {
        expect(Raven.captureMessage).not.toHaveBeenCalled();
      });
    });
  });

  describe('`error`', () => {
    describe('Is `production`', () => {
      beforeEach(() => {
        environment.production = true;
        loggerService.error('val', 'param');
      });

      it('should call `console` `error` with args', () => {
        expect(console.error).toHaveBeenCalledWith('val', 'param');
      });

      it('should call `Raven` `captureException` with args', () => {
        expect(Raven.captureException).toHaveBeenCalledWith('val', 'param');
      });
    });

    describe('Not `production`', () => {
      beforeEach(() => {
        environment.production = false;
        loggerService.error('val', 'param');
      });

      it('should call `console` `error` with args', () => {
        expect(console.error).toHaveBeenCalledWith('val', 'param');
      });

      it('should not call `Raven` `captureException`', () => {
        expect(Raven.captureException).not.toHaveBeenCalled();
      });
    });
  });
});

function createService() {
  loggerService = TestBed.get(LoggerService);
  console.log = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
}
