import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { LoggerService } from './logger.service';

const url = 'https://api.sendgrid.com/v3/mail/send';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${environment.sendGrid.apiKey}`
  })
};

@Injectable()
export class SendGridService {
  constructor(private http: HttpClient, private logger: LoggerService) {}

  sendEmail({
    name,
    email,
    message
  }: {
    name: string;
    email: string;
    message: string;
  }): Promise<Object> {
    const data = {
      personalizations: [{ to: [{ email: environment.sendGrid.email }] }],
      from: { email: 'website@hkfd.co.uk' },
      reply_to: {
        name: name,
        email: email
      },
      subject: 'Contact Form Enquiry',
      content: [{ type: 'text/plain', value: message }]
    };

    this.logger.log('sendEmail', data);

    return this.http.post(url, data, httpOptions).toPromise();
  }
}
