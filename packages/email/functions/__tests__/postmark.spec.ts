import Firebase from 'firebase-functions-test';
import { ServerClient } from 'postmark';

const firebase = Firebase();
firebase.mockConfig({
  postmark: { token: 'postmark.token' },
  email: {
    to: 'email.to',
    from: 'email.from',
    subject: 'email.subject'
  }
});

import { client, createMessage, responseHasErrors } from '../src/postmark';

jest.mock('postmark', () => ({
  ServerClient: jest.fn().mockImplementation(() => ({
    sendEmail: jest.fn()
  }))
}));

describe('`client`', () => {
  beforeEach(() =>
    client.sendEmail({
      To: 'To',
      From: 'From',
      ReplyTo: 'ReplyTo',
      Subject: 'Subject',
      TextBody: 'TextBody'
    }));

  test('should create new `ServerClient` with `postmark.token` arg', () => {
    expect(ServerClient).toHaveBeenCalledWith('postmark.token');
  });
});

describe('`createMessage`', () => {
  test('should create new `ServerClient` with `postmark.token` arg', () => {
    const res = createMessage({
      name: 'Name Surname',
      email: 'example@example.com',
      message: 'Hello'
    });

    expect(res).toEqual({
      To: 'email.to',
      From: 'Name Surname email.from',
      ReplyTo: 'example@example.com',
      Subject: 'email.subject',
      TextBody: 'Hello'
    });
  });
});

describe('`responseHasErrors`', () => {
  test('should return `true` if `code` is not `0`', () => {
    const res = responseHasErrors(1);

    expect(res).toBe(true);
  });

  test('should return `false` if `code` is `0`', () => {
    const res = responseHasErrors(0);

    expect(res).toBe(false);
  });
});
