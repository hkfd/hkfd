import Firebase from 'firebase-functions-test';
import { ServerClient } from 'postmark';

const firebase = Firebase();
firebase.mockConfig({
  postmark: { token: 'postmark.token' }
});

import { client } from '../src/postmark';

jest.mock('postmark', () => ({
  ServerClient: jest.fn().mockImplementation(() => ({
    sendEmail: jest.fn()
  }))
}));

describe('`sendEmail`', () => {
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
