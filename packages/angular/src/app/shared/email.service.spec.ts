import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { EmailService } from './email.service';

let emailService: EmailService;
let mockHttp: HttpTestingController;

describe('EmailService', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmailService]
    }).compileComponents()));

  beforeEach(async(() => createService()));

  it('should create service', () => {
    expect(emailService).toBeTruthy();
  });

  describe('`sendEmail`', () => {
    it('should call `HttpClient` `post`', () => {
      emailService.sendEmail({} as any);
      const {
        request: { method }
      } = mockHttp.expectOne('https://email.testing');

      expect(method).toBe('POST');
    });

    it('should call `HttpClient` `post` with `body` as `email` arg', () => {
      const email = () => ({ name: 'a', email: 'b@c', message: 'd' });
      emailService.sendEmail(email());
      const {
        request: { body }
      } = mockHttp.expectOne('https://email.testing');

      expect(body).toEqual(email());
    });

    describe('Has error', () => {
      it('should reject promise', async(() => {
        emailService
          .sendEmail({} as any)
          .then(fail)
          .catch(err => expect(err).toBeDefined());

        mockHttp.expectOne('https://email.testing').error(new ErrorEvent(''));
      }));
    });

    describe('No error', () => {
      it('should resolve promise', async(() => {
        emailService
          .sendEmail({} as any)
          .then(res => expect(res).toBeDefined())
          .catch(fail);

        mockHttp.expectOne('https://email.testing').flush(null);
      }));
    });
  });

  afterEach(() => mockHttp.verify());
});

function createService() {
  emailService = TestBed.get(EmailService);
  mockHttp = TestBed.get(HttpTestingController);
}
