import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { makeImmutable } from 'testing';

import { FormService } from './form.service';

let formService: FormService;
let mockHttp: HttpTestingController;

describe('FormService', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FormService]
    }).compileComponents()));

  beforeEach(async(() => createService()));

  it('should create service', () => {
    expect(formService).toBeTruthy();
  });

  describe('`sendEmail`', () => {
    it('should call `HttpClient` `post`', () => {
      formService.sendEmail({} as any);
      const {
        request: { method }
      } = mockHttp.expectOne('https://email.testing');

      expect(method).toBe('POST');
    });

    it('should call `HttpClient` `post` with `body` as `email` arg', () => {
      const email = makeImmutable({ name: 'a', email: 'b@c', message: 'd' });
      formService.sendEmail(email);
      const {
        request: { body }
      } = mockHttp.expectOne('https://email.testing');

      expect(body).toEqual(email);
    });

    describe('Has error', () => {
      it('should reject promise', async(() => {
        formService
          .sendEmail({} as any)
          .then(fail)
          .catch(err => expect(err).toBeDefined());

        mockHttp.expectOne('https://email.testing').error(new ErrorEvent(''));
      }));
    });

    describe('No error', () => {
      it('should resolve promise', async(() => {
        formService
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
  formService = TestBed.get(FormService);
  mockHttp = TestBed.get(HttpTestingController);
}
