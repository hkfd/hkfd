import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { LoggerService } from './shared.module';
import { SendGridService } from './sendgrid.service';

let sendGridService: SendGridService;
let mockHttp: HttpTestingController;

describe('SendGridService', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [SendGridService, LoggerService]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createService()));

  describe('sendEmail', () => {
    it(
      'should call HttpClient',
      async(() => {
        sendGridService.sendEmail({ name: 'a', email: 'b@c', message: 'd' });

        mockHttp.expectOne('https://api.sendgrid.com/v3/mail/send');
      })
    );

    it(
      'should set HttpHeaders authorization as bearer env.sendGrid.apiKey',
      async(() => {
        sendGridService.sendEmail({ name: 'a', email: 'b@c', message: 'd' });
        const request = mockHttp.expectOne(
          'https://api.sendgrid.com/v3/mail/send'
        ).request;

        expect(request.headers.get('Authorization')).toBe('Bearer ghi');
      })
    );

    it(
      'should set personalizations.to.email as env email',
      async(() => {
        sendGridService.sendEmail({ name: 'a', email: 'b@c', message: 'd' });
        const request = mockHttp.expectOne(
          'https://api.sendgrid.com/v3/mail/send'
        ).request;

        expect(request.body.personalizations[0].to[0].email).toBe(
          'abc@example.com'
        );
      })
    );

    it(
      'should set reply_to.name as name',
      async(() => {
        sendGridService.sendEmail({ name: 'a', email: 'b@c', message: 'd' });
        const request = mockHttp.expectOne(
          'https://api.sendgrid.com/v3/mail/send'
        ).request;

        expect(request.body.reply_to.name).toBe('a');
      })
    );

    it(
      'should set reply_to.email as email',
      async(() => {
        sendGridService.sendEmail({ name: 'a', email: 'b@c', message: 'd' });
        const request = mockHttp.expectOne(
          'https://api.sendgrid.com/v3/mail/send'
        ).request;

        expect(request.body.reply_to.email).toBe('b@c');
      })
    );

    it(
      'should set content.value as message',
      async(() => {
        sendGridService.sendEmail({ name: 'a', email: 'b@c', message: 'd' });
        const request = mockHttp.expectOne(
          'https://api.sendgrid.com/v3/mail/send'
        ).request;

        expect(request.body.content[0].value).toBe('d');
      })
    );
  });
});

function createService() {
  sendGridService = TestBed.get(SendGridService);
  mockHttp = TestBed.get(HttpTestingController);
}
