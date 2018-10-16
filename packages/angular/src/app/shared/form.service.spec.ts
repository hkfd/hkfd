import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { FormService } from './form.service';

let formService: FormService;
let mockHttp: HttpTestingController;

describe('FormService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FormService]
    }).compileComponents();
  }));

  beforeEach(async(() => createService()));

  describe('sendEmail', () => {
    it('should call HttpClient', async(() => {
      const email = { name: 'a', email: 'b@c', message: 'd' };
      formService.sendEmail(email);

      expect(mockHttp.expectOne('https://email.testing')).toBeTruthy();
    }));

    it('should call HttpClient with `body` as email data', async(() => {
      const email = { name: 'a', email: 'b@c', message: 'd' };
      formService.sendEmail(email);

      expect(mockHttp.expectOne(res => res.body === email)).toBeTruthy();
    }));
  });
});

function createService() {
  formService = TestBed.get(FormService);
  mockHttp = TestBed.get(HttpTestingController);
}
