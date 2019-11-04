import * as functions from 'firebase-functions';
import { ServerClient, Message } from 'postmark';

import { Email } from './schema';

export const client = new ServerClient(functions.config().postmark.token);

export const createMessage = ({ name, email, message }: Email): Message => ({
  To: functions.config().email.to,
  From: `${name} ${functions.config().email.from}`,
  ReplyTo: email,
  Subject: functions.config().email.subject,
  TextBody: message
});

export const responseHasErrors = (code: number): boolean => code !== 0;
