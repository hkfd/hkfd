import { TestBed, async } from '@angular/core/testing';

import { LoggerService } from './logger.service';

let loggerService: LoggerService;
let service: Service;
let _console: ConsoleStub;

describe('LoggerService', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        providers: [LoggerService]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createService()));

  describe('log', () => {
    it('should be called in dev environment', () => {
      loggerService.env.production = false;
      loggerService.log('');

      expect(service.log).toHaveBeenCalled();
    });

    it('should be called in prod environment', () => {
      loggerService.env.production = true;
      loggerService.log('');

      expect(service.log).toHaveBeenCalled();
    });

    it('should call console log in dev environment', () => {
      loggerService.env.production = false;
      loggerService.log('');

      expect(_console.log).toHaveBeenCalled();
    });

    it('should call console log with val and param args in dev environment', () => {
      loggerService.env.production = false;
      loggerService.log('val', 'param');

      expect(_console.log).toHaveBeenCalledWith('val', 'param');
    });

    it('should not call console log in prod environment', () => {
      loggerService.env.production = true;
      loggerService.log('');

      expect(_console.log).not.toHaveBeenCalled();
    });
  });

  describe('warn', () => {
    it('should be called in dev environment', () => {
      loggerService.env.production = false;
      loggerService.warn('');

      expect(service.warn).toHaveBeenCalled();
    });

    it('should be called in prod environment', () => {
      loggerService.env.production = true;
      loggerService.warn('');

      expect(service.warn).toHaveBeenCalled();
    });

    it('should call console warn in dev environment', () => {
      loggerService.env.production = false;
      loggerService.warn('');

      expect(_console.warn).toHaveBeenCalled();
    });

    it('should call console warn with val and param args in dev environment', () => {
      loggerService.env.production = false;
      loggerService.warn('val', 'param');

      expect(_console.warn).toHaveBeenCalledWith('val', 'param');
    });

    it('should not call console warn in prod environment', () => {
      loggerService.env.production = true;
      loggerService.warn('');

      expect(_console.warn).not.toHaveBeenCalled();
    });
  });

  describe('error', () => {
    it('should be called in dev environment', () => {
      loggerService.env.production = false;
      loggerService.error('');

      expect(service.error).toHaveBeenCalled();
    });

    it('should be called in prod environment', () => {
      loggerService.env.production = true;
      loggerService.error('');

      expect(service.error).toHaveBeenCalled();
    });

    it('should call console error in dev environment', () => {
      loggerService.env.production = false;
      loggerService.error('');

      expect(_console.error).toHaveBeenCalled();
    });

    it('should call console error with val and param args in dev environment', () => {
      loggerService.env.production = false;
      loggerService.error('val', 'param');

      expect(_console.error).toHaveBeenCalledWith('val', 'param');
    });

    it('should call console error in prod environment', () => {
      loggerService.env.production = true;
      loggerService.error('');

      expect(_console.error).toHaveBeenCalled();
    });

    it('should call console error with val and param args in prod environment', () => {
      loggerService.env.production = true;
      loggerService.error('val', 'param');

      expect(_console.error).toHaveBeenCalledWith('val', 'param');
    });
  });
});

function createService() {
  loggerService = TestBed.get(LoggerService);
  _console = new ConsoleStub();
  service = new Service();
}

class ConsoleStub {
  log: jasmine.Spy;
  warn: jasmine.Spy;
  error: jasmine.Spy;

  constructor() {
    this.log = spyOn(console, 'log').and.callThrough();
    this.warn = spyOn(console, 'warn').and.callThrough();
    this.error = spyOn(console, 'error').and.callThrough();
  }
}

class Service {
  log: jasmine.Spy;
  warn: jasmine.Spy;
  error: jasmine.Spy;

  constructor() {
    this.log = spyOn(loggerService, 'log').and.callThrough();
    this.warn = spyOn(loggerService, 'warn').and.callThrough();
    this.error = spyOn(loggerService, 'error').and.callThrough();
  }
}
