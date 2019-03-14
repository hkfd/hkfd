export { LoggerService } from 'shared';

export class MockLoggerService {
  constructor() {
    jest.spyOn(this, 'log');
    jest.spyOn(this, 'warn');
    jest.spyOn(this, 'error');
  }

  log() {
    return;
  }

  warn() {
    return;
  }

  error() {
    return;
  }
}
