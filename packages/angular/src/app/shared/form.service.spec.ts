import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { of } from 'rxjs';

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
      formService
        .sendEmail({ name: 'a', email: 'b@c', message: 'd' })
        .then(res => expect(res).toBeDefined());

      mockHttp.expectOne('form/form.php').flush(of(null));
    }));
  });
});

function createService() {
  formService = TestBed.get(FormService);
  mockHttp = TestBed.get(HttpTestingController);
}
