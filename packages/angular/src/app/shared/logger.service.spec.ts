import { TestBed, async } from '@angular/core/testing';

import Raven from 'raven-js';

import { environment } from 'environment';
import { LoggerService } from './logger.service';

let loggerService: LoggerService;
let consoleStub: ConsoleStub;
let raven: RavenStub;

describe('LoggerService', () => {
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
        expect(consoleStub.log).not.toHaveBeenCalled();
      });
    });

    describe('Not `production`', () => {
      beforeEach(() => {
        environment.production = false;
        loggerService.log('val', 'param');
      });

      it('should call `console` `log` with args', () => {
        expect(consoleStub.log).toHaveBeenCalledWith('val', 'param');
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
        expect(consoleStub.warn).toHaveBeenCalledWith('val', 'param');
      });

      it('should call `Raven` `captureMessage` with `val` and `warning` level args', () => {
        expect(raven.captureMessage).toHaveBeenCalledWith('val', {
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
        expect(consoleStub.warn).toHaveBeenCalledWith('val', 'param');
      });

      it('should not call `Raven` `captureMessage`', () => {
        expect(raven.captureMessage).not.toHaveBeenCalled();
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
        expect(consoleStub.error).toHaveBeenCalledWith('val', 'param');
      });

      it('should call `Raven` `captureException` with args', () => {
        expect(raven.captureException).toHaveBeenCalledWith('val', 'param');
      });
    });

    describe('Not `production`', () => {
      beforeEach(() => {
        environment.production = false;
        loggerService.error('val', 'param');
      });

      it('should call `console` `error` with args', () => {
        expect(consoleStub.error).toHaveBeenCalledWith('val', 'param');
      });

      it('should not call `Raven` `captureException`', () => {
        expect(raven.captureException).not.toHaveBeenCalled();
      });
    });
  });
});

class ConsoleStub {
  log: jasmine.Spy;
  warn: jasmine.Spy;
  error: jasmine.Spy;

  constructor() {
    const noop = () => undefined;

    this.log = spyOn(console, 'log').and.callFake(noop);
    this.warn = spyOn(console, 'warn').and.callFake(noop);
    this.error = spyOn(console, 'error').and.callFake(noop);
  }
}

class RavenStub {
  captureMessage: jasmine.Spy;
  captureException: jasmine.Spy;

  constructor() {
    const noop = () => undefined;

    this.captureMessage = spyOn(Raven, 'captureMessage').and.callFake(noop);
    this.captureException = spyOn(Raven, 'captureException').and.callFake(noop);
  }
}

function createService() {
  loggerService = TestBed.get(LoggerService);
  consoleStub = new ConsoleStub();
  raven = new RavenStub();
}
