import Firebase from 'firebase-functions-test';
import supertest from 'supertest';
import { setApiKey, send } from '@sendgrid/mail';
import { config, errorHandler } from 'raven';

const firebase = Firebase();
firebase.mockConfig({
  email: {
    to: 'email.to',
    from: 'email.from',
    subject: 'email.subject'
  },
  sendgrid: { key: 'sendgrid.key' },
  sentry: { dsn: 'sentry.dsn' }
});

import { email } from '../src';
const request = supertest(email);

describe('setup', () => {
  test('should call SendGrid setApiKey', () => {
    expect(setApiKey).toHaveBeenCalled();
  });

  test('should call SendGrid setApiKey with environment `sendgrid.key` arg', () => {
    expect(setApiKey).toHaveBeenCalledWith('sendgrid.key');
  });

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
      (send as jest.Mock).mockResolvedValue(null);

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
      (send as jest.Mock).mockResolvedValue(null);

      return request
        .post('/')
        .send({
          name: 'Name',
          email: 'example@example.com',
          message: 'Message'
        })
        .then(res => expect(res.text).toBe('OK'));
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
    test('should not call SendGrid send', () => {
      (send as jest.Mock).mockClear();

      return request.post('/').then(_ => expect(send).not.toHaveBeenCalled());
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
              res.body.map(err =>
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
              res.body.map(err =>
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
              res.body.map(err =>
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
              res.body.map(err =>
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
    test('should call SendGrid send', () => {
      return request
        .post('/')
        .send({
          name: 'Name',
          email: 'example@example.com',
          message: 'Message'
        })
        .then(_ => expect(send).toHaveBeenCalled());
    });

    test('should call SendGrid send with request body data arg', () => {
      return request
        .post('/')
        .send({
          name: 'Name Surname',
          email: 'example@example.com',
          message: 'Hello'
        })
        .then(_ =>
          expect(send).toHaveBeenCalledWith({
            to: 'email.to',
            from: 'email.from',
            replyTo: { name: 'Name Surname', email: 'example@example.com' },
            subject: 'email.subject',
            text: 'Hello'
          })
        );
    });

    test('should return status code `200` on SendGrid send resolve', () => {
      (send as jest.Mock).mockResolvedValue(null);

      return request
        .post('/')
        .send({
          name: 'Name',
          email: 'example@example.com',
          message: 'Message'
        })
        .expect(200);
    });

    test('should call Sentry errorHandler on SendGrid send reject', () => {
      (send as jest.Mock).mockRejectedValue(new Error());

      return request
        .post('/')
        .send({
          name: 'Name',
          email: 'example@example.com',
          message: 'Message'
        })
        .then(_ => expect(errorHandler()).toHaveBeenCalled());
    });

    test('should call Sentry errorHandler on SendGrid send reject with error arg', () => {
      (send as jest.Mock).mockRejectedValue(new Error('Test'));

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

    test('should return status code `500` on SendGrid send reject', () => {
      (send as jest.Mock).mockRejectedValue(new Error());

      return request
        .post('/')
        .send({
          name: 'Name',
          email: 'example@example.com',
          message: 'Message'
        })
        .expect(500);
    });

    test('should return error html on SendGrid send reject', () => {
      (send as jest.Mock).mockRejectedValue(new Error());

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
