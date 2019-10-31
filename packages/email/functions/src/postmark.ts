import * as functions from 'firebase-functions';
import { ServerClient } from 'postmark';

export const client = new ServerClient(functions.config().postmark.token);
