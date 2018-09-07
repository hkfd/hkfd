import * as supertest from 'supertest';

process.env.SENTRY_DSN = 'SENTRY_DSN';
process.env.ENVIRONMENT = 'ENVIRONMENT';
process.env.MEMCACHIER_SERVERS = 'MEMCACHIER_SERVERS';

jest.mock('zone.js/dist/zone-node');
jest.mock('memjs');

const errorHandlerFn = jest.fn((_err, _req, _res, next) => next());
jest.setMock('raven', {
  config: jest.fn(_ => ({ install: () => undefined })),
  requestHandler: jest.fn(_ => (_req, _res, next) => next()),
  errorHandler: jest.fn(() => errorHandlerFn)
});

import { config, errorHandler } from 'raven';

let request: supertest.SuperTest<supertest.Test>;
let Client;
let server;

describe('Server', () => {
  describe('setup', () => {
    beforeEach(() => setupServer());

    test('should call Sentry config', () => {
      expect(config).toHaveBeenCalled();
    });

    test('should call Sentry config with `process.env.SENTRY_DSN` arg', () => {
      expect(config).toHaveBeenCalledWith('SENTRY_DSN', jasmine.anything());
    });

    test('should call Sentry config with environment as `process.env.ENVIRONMENT` arg', () => {
      expect(config).toHaveBeenCalledWith(jasmine.anything(), {
        environment: 'ENVIRONMENT'
      });
    });

    test('should call Memjs Client create', () => {
      expect(Client.create).toHaveBeenCalled();
    });

    test('should call Memjs Client create with `process.env.MEMCACHIER_SERVERS` arg', () => {
      expect(Client.create).toHaveBeenCalledWith('MEMCACHIER_SERVERS');
    });

    afterEach(() => teardownServer());
  });

  describe('cacheRequest', () => {
    describe('', () => {
      test('should call Memjs get', () => {
        const get = jest.fn((_key, fn) => fn(null, null));
        const set = jest.fn((_key, _data, _options, _next) => undefined);
        jest.unmock('memjs');
        jest.setMock('memjs', {
          Client: {
            create: jest.fn().mockImplementation(() => ({
              get,
              set
            }))
          }
        });

        setupServer();

        return request.get('/test').then(_ => {
          expect(Client.create().get).toHaveBeenCalled();
        });
      });

      test('should call Memjs get with `req.url` as `CACHE_KEY`', () => {
        const get = jest.fn((_key, fn) => fn(null, null));
        const set = jest.fn((_key, _data, _options, _next) => undefined);
        jest.unmock('memjs');
        jest.setMock('memjs', {
          Client: {
            create: jest.fn().mockImplementation(() => ({
              get,
              set
            }))
          }
        });

        setupServer();

        return request.get('/test').then(_ => {
          expect(Client.create().get).toHaveBeenCalledWith(
            '__CACHE__/test',
            jasmine.anything()
          );
        });
      });

      test('should call Sentry errorHandler on error', () => {
        const get = jest.fn((_key, fn) => fn(null, null));
        const set = jest.fn((_key, _data, _options, next) => next(new Error()));
        jest.unmock('memjs');
        jest.setMock('memjs', {
          Client: {
            create: jest.fn().mockImplementation(() => ({
              get,
              set
            }))
          }
        });

        setupServer();

        return request
          .get('/test')
          .then(_ => expect(errorHandler()).toHaveBeenCalled());
      });

      test('should call Sentry errorHandler on error with `error` arg', () => {
        const get = jest.fn((_key, fn) => fn(null, null));
        const set = jest.fn((_key, _data, _options, next) =>
          next(new Error('Test'))
        );
        jest.unmock('memjs');
        jest.setMock('memjs', {
          Client: {
            create: jest.fn().mockImplementation(() => ({
              get,
              set
            }))
          }
        });

        setupServer();

        return request
          .get('/test')
          .then(_ =>
            expect(errorHandler()).toHaveBeenCalledWith(
              new Error('Test'),
              jasmine.anything(),
              jasmine.anything(),
              jasmine.anything()
            )
          );
      });

      afterEach(() => teardownServer());
    });

    describe('cache', () => {
      beforeEach(() => {
        const get = jest.fn((_key, fn) => fn(null, ['data']));
        const set = jest.fn((_key, _data, _options, _next) => undefined);
        jest.unmock('memjs');
        jest.setMock('memjs', {
          Client: {
            create: jest.fn().mockImplementation(() => ({
              get,
              set
            }))
          }
        });

        setupServer();
      });

      test('should return cache', () => {
        return request.get('/test').then(res => expect(res.text).toBe('data'));
      });

      test('should not call Memjs set', () => {
        return request.get('/test').then(_ => {
          expect(Client.create().set).not.toHaveBeenCalled();
        });
      });

      afterEach(() => teardownServer());
    });

    describe('no cache', () => {
      beforeEach(() => {
        const get = jest.fn((_key, fn) => fn(null, null));
        const set = jest.fn((_key, _data, _options, _next) => undefined);
        jest.unmock('memjs');
        jest.setMock('memjs', {
          Client: {
            create: jest.fn().mockImplementation(() => ({
              get,
              set
            }))
          }
        });

        setupServer();
      });

      test('should call Memjs set', () => {
        return request.get('/test').then(_ => {
          expect(Client.create().set).toHaveBeenCalled();
        });
      });

      test('should call Memjs set with `req.url` as `CACHE_KEY` arg', () => {
        return request.get('/test').then(_ => {
          expect(Client.create().set).toHaveBeenCalledWith(
            '__CACHE__/test',
            jasmine.anything(),
            jasmine.anything(),
            jasmine.anything()
          );
        });
      });

      test('should call Memjs set with `body` arg', () => {
        return request.get('/test').then(_ => {
          expect(Client.create().set).toHaveBeenCalledWith(
            jasmine.anything(),
            jasmine.any(String),
            jasmine.anything(),
            jasmine.anything()
          );
        });
      });

      test('should call Memjs set with `expires` arg', () => {
        return request.get('/test').then(_ => {
          expect(Client.create().set).toHaveBeenCalledWith(
            jasmine.anything(),
            jasmine.anything(),
            { expires: jasmine.any(Number) },
            jasmine.anything()
          );
        });
      });

      test('should return data', () => {
        return request.get('/test').then(res => expect(res.text).toBeTruthy());
      });

      afterEach(() => teardownServer());
    });
  });

  describe('GET', () => {
    beforeEach(() => setupServer());

    describe('route', () => {
      describe('Headers', () => {
        test('should set gzip', () => {
          return request
            .get('/')
            .then(res => expect(res.header['content-encoding']).toBe('gzip'));
        });

        test('should set CSP', () => {
          return request.get('/').then(res => {
            expect(res.header['content-security-policy']).toBeDefined();
            expect(res.header['x-content-security-policy']).toBeDefined();
          });
        });

        test('should not set cache', () => {
          return request
            .get('/')
            .then(res => expect(res.header['cache-control']).toBeUndefined());
        });
      });
    });

    describe('asset', () => {
      describe('Headers', () => {
        test('should set cache', () => {
          return request
            .get('/assets/heckford.png')
            .then(res => expect(res.header['cache-control']).toBeDefined());
        });

        test('should set cache to `1 year`', () => {
          return request
            .get('/assets/heckford.png')
            .then(res =>
              expect(res.header['cache-control']).toContain('31536000')
            );
        });

        test('should set CSP', () => {
          return request.get('/assets/heckford.png').then(res => {
            expect(res.header['content-security-policy']).toBeDefined();
            expect(res.header['x-content-security-policy']).toBeDefined();
          });
        });

        test('should not set gzip', () => {
          return request
            .get('/assets/heckford.png')
            .then(res =>
              expect(res.header['content-encoding']).toBeUndefined()
            );
        });
      });
    });

    afterEach(() => teardownServer());
  });
});

const setupServer = () => {
  Client = require('memjs').Client;
  server = require('./server');
  request = supertest(server);
};

const teardownServer = () => {
  server.close();
  jest.resetModules();
  jest.clearAllMocks();
};
