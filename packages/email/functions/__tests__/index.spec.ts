import Firebase from 'firebase-functions-test';
import supertest from 'supertest';
import { errorHandler, config } from 'raven';
import { client } from '../src/postmark';

const firebase = Firebase();
firebase.mockConfig({
  email: {
    to: 'email.to',
    from: 'email.from',
    subject: 'email.subject'
  },
  sentry: { dsn: 'sentry.dsn' }
});

import { email } from '../src';

jest.mock('../src/postmark', () => ({
  client: {
    sendEmail: jest.fn()
  }
}));

const request = supertest(email);

describe('config', () => {
  test('should call Sentry config', () => {
    expect(config).toHaveBeenCalled();
  });

  test('should call Sentry config with environment `sentry.dsn` and project id environment args', () => {
    expect(config).toHaveBeenCalledWith('sentry.dsn', {
      environment: 'not-a-project'
    });
  });
});

describe('routes', () => {
  describe('POST', () => {
    test('should return status code `200`', () => {
      (client.sendEmail as jest.Mock).mockResolvedValue({
        ErrorCode: 0,
        Message: 'message'
      });

      return request
        .post('/')
        .send({
          name: 'Name',
          email: 'example@example.com',
          message: 'Message'
        })
        .expect(200);
    });

    test('should return success text', () => {
      (client.sendEmail as jest.Mock).mockResolvedValue({
        ErrorCode: 0,
        Message: 'message'
      });

      return request
        .post('/')
        .send({
          name: 'Name',
          email: 'example@example.com',
          message: 'Message'
        })
        .then(res => expect(res.text).toBe(`"OK"`));
    });
  });

  describe('GET', () => {
    test('should return status code `404`', () => {
      return request.get('/').expect(404);
    });

    test('should return error text', () => {
      return request.get('/').then(res => expect(res.text).toBe('Not Found'));
    });
  });

  describe('PUT', () => {
    test('should return status code `404`', () => {
      return request.put('/').expect(404);
    });

    test('should return error text', () => {
      return request.put('/').then(res => expect(res.text).toBe('Not Found'));
    });
  });

  describe('PATCH', () => {
    test('should return status code `404`', () => {
      return request.patch('/').expect(404);
    });

    test('should return error text', () => {
      return request.patch('/').then(res => expect(res.text).toBe('Not Found'));
    });
  });

  describe('DELETE', () => {
    test('should return status code `404`', () => {
      return request.delete('/').expect(404);
    });

    test('should return error text', () => {
      return request
        .delete('/')
        .then(res => expect(res.text).toBe('Not Found'));
    });
  });
});

describe('send email', () => {
  describe('invalid', () => {
    test('should not call `sendEmail`', () => {
      (client.sendEmail as jest.Mock).mockClear();

      return request
        .post('/')
        .then(_ => expect(client.sendEmail).not.toHaveBeenCalled());
    });

    test('should not call Sentry errorHandler', () => {
      return request
        .post('/')
        .then(_ => expect(errorHandler()).not.toHaveBeenCalled());
    });

    describe('missing', () => {
      describe('name', () => {
        test('should return status code `400`', () => {
          return request
            .post('/')
            .send({ email: 'example@example.com', message: 'Message' })
            .expect(400);
        });

        test('should return `required` error', () => {
          return request
            .post('/')
            .send({ email: 'example@example.com', message: 'Message' })
            .then(res =>
              res.body.map((err: any) =>
                expect(err).toEqual(
                  jasmine.objectContaining({
                    keyword: 'required',
                    params: { missingProperty: 'name' }
                  })
                )
              )
            );
        });
      });

      describe('email', () => {
        test('should return status code `400`', () => {
          return request
            .post('/')
            .send({ name: 'Name', message: 'Message' })
            .expect(400);
        });

        test('should return `required` error', () => {
          return request
            .post('/')
            .send({ name: 'Name', message: 'Message' })
            .then(res =>
              res.body.map((err: any) =>
                expect(err).toEqual(
                  jasmine.objectContaining({
                    keyword: 'required',
                    params: { missingProperty: 'email' }
                  })
                )
              )
            );
        });
      });

      describe('message', () => {
        test('should return status code `400`', () => {
          return request
            .post('/')
            .send({ name: 'Name', email: 'example@example.com' })
            .expect(400);
        });

        test('should return `required` error', () => {
          return request
            .post('/')
            .send({ name: 'Name', email: 'example@example.com' })
            .then(res =>
              res.body.map((err: any) =>
                expect(err).toEqual(
                  jasmine.objectContaining({
                    keyword: 'required',
                    params: { missingProperty: 'message' }
                  })
                )
              )
            );
        });
      });
    });

    describe('wrong format', () => {
      describe('email', () => {
        test('should return status code `400`', () => {
          return request
            .post('/')
            .send({ name: 'Name', email: 'invalid', message: 'Message' })
            .expect(400);
        });

        test('should return `format` error', () => {
          return request
            .post('/')
            .send({ name: 'Name', email: 'invalid', message: 'Message' })
            .then(res =>
              res.body.map((err: any) =>
                expect(err).toEqual(
                  jasmine.objectContaining({
                    keyword: 'format',
                    params: { format: 'email' }
                  })
                )
              )
            );
        });
      });
    });
  });

  describe('valid', () => {
    test('should call `sendEmail`', () => {
      (client.sendEmail as jest.Mock).mockResolvedValue(undefined);

      return request
        .post('/')
        .send({
          name: 'Name',
          email: 'example@example.com',
          message: 'Message'
        })
        .then(_ => expect(client.sendEmail).toHaveBeenCalled());
    });

    test('should call `sendEmail` with request body data arg', () => {
      (client.sendEmail as jest.Mock).mockResolvedValue(undefined);

      return request
        .post('/')
        .send({
          name: 'Name Surname',
          email: 'example@example.com',
          message: 'Hello'
        })
        .then(_ =>
          expect(client.sendEmail).toHaveBeenCalledWith({
            To: 'email.to',
            From: 'Name Surname email.from',
            ReplyTo: 'example@example.com',
            Subject: 'email.subject',
            TextBody: 'Hello'
          })
        );
    });

    test('should return status code `200` on `sendEmail` resolve', () => {
      (client.sendEmail as jest.Mock).mockResolvedValue({
        ErrorCode: 0,
        Message: 'message'
      });

      return request
        .post('/')
        .send({
          name: 'Name',
          email: 'example@example.com',
          message: 'Message'
        })
        .expect(200);
    });

    test('should error correctly if `sendEmail` `ErrorCode` is not `0`', () => {
      (client.sendEmail as jest.Mock).mockResolvedValue({
        ErrorCode: 1,
        Message: 'message'
      });

      return request
        .post('/')
        .send({
          name: 'Name',
          email: 'example@example.com',
          message: 'Message'
        })
        .expect(500)
        .then(_ =>
          expect(errorHandler()).toHaveBeenCalledWith(
            new Error('message'),
            jasmine.anything(),
            jasmine.anything(),
            jasmine.anything()
          )
        );
    });

    test('should call Sentry errorHandler on `sendEmail` reject', () => {
      (client.sendEmail as jest.Mock).mockRejectedValue(new Error());

      return request
        .post('/')
        .send({
          name: 'Name',
          email: 'example@example.com',
          message: 'Message'
        })
        .then(_ => expect(errorHandler()).toHaveBeenCalled());
    });

    test('should call Sentry errorHandler on `sendEmail` reject with error arg', () => {
      (client.sendEmail as jest.Mock).mockRejectedValue(new Error('Test'));

      return request
        .post('/')
        .send({
          name: 'Name',
          email: 'example@example.com',
          message: 'Message'
        })
        .then(_ =>
          expect(errorHandler()).toHaveBeenCalledWith(
            new Error('Test'),
            jasmine.anything(),
            jasmine.anything(),
            jasmine.anything()
          )
        );
    });

    test('should return status code `500` on `sendEmail` reject', () => {
      (client.sendEmail as jest.Mock).mockRejectedValue(new Error());

      return request
        .post('/')
        .send({
          name: 'Name',
          email: 'example@example.com',
          message: 'Message'
        })
        .expect(500);
    });

    test('should return error html on `sendEmail` reject', () => {
      (client.sendEmail as jest.Mock).mockRejectedValue(new Error());

      return request
        .post('/')
        .send({
          name: 'Name',
          email: 'example@example.com',
          message: 'Message'
        })
        .then(res => expect(res.text).toBeTruthy());
    });
  });
});
