import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { LoggerService, MockLoggerService, Data } from 'testing';
import { ApiService } from 'shared';
import * as ApiHelpers from './api.helpers';
import { getPostUrl } from './api.helpers';

let mockHttp: HttpTestingController;
let apiService: ApiService;

jest.spyOn(ApiHelpers, 'getPostUrl').mockReturnValue('/getPostUrl');

describe('ApiService', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        { provide: LoggerService, useClass: MockLoggerService }
      ]
    }).compileComponents()));

  beforeEach(async(() => createService()));

  it('should create service', () => {
    expect(apiService).toBeTruthy();
  });

  describe('`getServices`', () => {
    const url = 'https://api.testing/services.json';

    describe('Request', () => {
      it('should call `HttpClient` `get`', () => {
        apiService.getServices().subscribe();
        const {
          request: { method }
        } = mockHttp.expectOne(url);

        expect(method).toBe('GET');
      });

      describe('No error', () => {
        let res: any;

        beforeEach(() => {
          apiService.getServices().subscribe(response => (res = response));
          mockHttp.expectOne(url).flush(Data.Api.getServices<void>());
        });

        it('should return `services`', () => {
          expect(res).toEqual(Data.Api.getServices<void>());
        });
      });

      describe('Error', () => {
        let error: ErrorEvent;
        let err: any;

        beforeEach(() => {
          error = new ErrorEvent('err');
          apiService
            .getServices()
            .subscribe(
              response => fail(response),
              errorRes => (err = errorRes)
            );
          mockHttp.expectOne(url).error(error);
        });

        it('should return error', () => {
          expect(err.error).toEqual(new ErrorEvent('err'));
        });
      });
    });
  });

  describe('`getCareers`', () => {
    const url = 'https://api.testing/careers.json';

    describe('Request', () => {
      it('should call `HttpClient` `get`', () => {
        apiService.getCareers().subscribe();
        const {
          request: { method }
        } = mockHttp.expectOne(url);

        expect(method).toBe('GET');
      });

      describe('No error', () => {
        let res: any;

        beforeEach(() => {
          apiService.getCareers().subscribe(response => (res = response));
          mockHttp.expectOne(url).flush(Data.Api.getCareers<void>());
        });

        it('should return `careers`', () => {
          expect(res).toEqual(Data.Api.getCareers<void>());
        });
      });

      describe('Error', () => {
        let error: ErrorEvent;
        let err: any;

        beforeEach(() => {
          error = new ErrorEvent('err');
          apiService
            .getCareers()
            .subscribe(
              response => fail(response),
              errorRes => (err = errorRes)
            );
          mockHttp.expectOne(url).error(error);
        });

        it('should return error', () => {
          expect(err.error).toEqual(new ErrorEvent('err'));
        });
      });
    });
  });

  describe('`getCareer`', () => {
    const url = 'https://api.testing/careers.json';

    describe('Request', () => {
      it('should call `HttpClient` `get`', () => {
        apiService.getCareer('career-1').subscribe();
        const {
          request: { method }
        } = mockHttp.expectOne(url);

        expect(method).toBe('GET');
      });

      describe('No error', () => {
        let res: any;

        beforeEach(() => {
          apiService
            .getCareer('career-3')
            .subscribe(response => (res = response));
          mockHttp.expectOne(url).flush(Data.Api.getCareers<void>());
        });

        it('should return `career`', () => {
          expect(res).toEqual(Data.Api.getCareers('Career 3'));
        });
      });

      describe('Error', () => {
        let error: ErrorEvent;
        let err: any;

        beforeEach(() => {
          error = new ErrorEvent('err');
          apiService
            .getCareer('career-2')
            .subscribe(
              response => fail(response),
              errorRes => (err = errorRes)
            );
          mockHttp.expectOne(url).error(error);
        });

        it('should return error', () => {
          expect(err.error).toEqual(new ErrorEvent('err'));
        });
      });
    });
  });

  describe('`getPost`', () => {
    it('should call `getPostUrl` with `type` arg', () => {
      apiService.getPost('type' as any, 'id').subscribe();
      mockHttp.expectOne('/getPostUrl');

      expect(getPostUrl).toHaveBeenCalledWith('type');
    });

    describe('Request', () => {
      it('should call `HttpClient` `get` with `getPostUrl` return', () => {
        apiService.getPost('service', 'service-1').subscribe();
        const {
          request: { method }
        } = mockHttp.expectOne('/getPostUrl');

        expect(method).toBe('GET');
      });

      describe('No error', () => {
        let res: any;

        beforeEach(() => {
          apiService
            .getPost('service', 'service-3')
            .subscribe(response => (res = response));
          mockHttp.expectOne('/getPostUrl').flush(Data.Api.getServices<void>());
        });

        it('should return `post`', () => {
          expect(res).toEqual(Data.Api.getServices('Service 3'));
        });
      });

      describe('Error', () => {
        let error: ErrorEvent;
        let err: any;

        beforeEach(() => {
          error = new ErrorEvent('err');
          apiService
            .getPost('service', 'service-1')
            .subscribe(
              response => fail(response),
              errorRes => (err = errorRes)
            );
          mockHttp.expectOne('/getPostUrl').error(error);
        });

        it('should return error', () => {
          expect(err.error).toEqual(new ErrorEvent('err'));
        });
      });
    });
  });

  describe('`getCaseStudies`', () => {
    const url = 'https://api.testing/case-studies.json';

    describe('Request', () => {
      it('should call `HttpClient` `get`', () => {
        apiService.getCaseStudies().subscribe();
        const {
          request: { method }
        } = mockHttp.expectOne(url);

        expect(method).toBe('GET');
      });

      describe('No error', () => {
        let res: any;

        beforeEach(() => {
          apiService.getCaseStudies().subscribe(response => (res = response));
          mockHttp.expectOne(url).flush(Data.Api.getCaseStudies<void>());
        });

        it('should return `caseStudies`', () => {
          expect(res).toEqual(Data.Api.getCaseStudies<void>());
        });
      });

      describe('Error', () => {
        let error: ErrorEvent;
        let err: any;

        beforeEach(() => {
          error = new ErrorEvent('err');
          apiService
            .getCaseStudies()
            .subscribe(
              response => fail(response),
              errorRes => (err = errorRes)
            );
          mockHttp.expectOne(url).error(error);
        });

        it('should return error', () => {
          expect(err.error).toEqual(new ErrorEvent('err'));
        });
      });
    });
  });

  describe('`getTeam`', () => {
    const url = 'https://api.testing/team.json';

    describe('Request', () => {
      it('should call `HttpClient` `get`', () => {
        apiService.getTeam().subscribe();
        const {
          request: { method }
        } = mockHttp.expectOne(url);

        expect(method).toBe('GET');
      });

      describe('No error', () => {
        let res: any;

        beforeEach(() => {
          apiService.getTeam().subscribe(response => (res = response));
          mockHttp.expectOne(url).flush(Data.Api.getTeam<void>());
        });

        it('should return `team`', () => {
          expect(res).toEqual(Data.Api.getTeam<void>());
        });
      });

      describe('Error', () => {
        let error: ErrorEvent;
        let err: any;

        beforeEach(() => {
          error = new ErrorEvent('err');
          apiService
            .getTeam()
            .subscribe(
              response => fail(response),
              errorRes => (err = errorRes)
            );
          mockHttp.expectOne(url).error(error);
        });

        it('should return error', () => {
          expect(err.error).toEqual(new ErrorEvent('err'));
        });
      });
    });
  });

  describe('`getClients`', () => {
    const url = 'https://api.testing/clients.json';

    describe('Request', () => {
      describe('No error', () => {
        let res: any;

        beforeEach(() => {
          apiService.getClients().subscribe(request => (res = request));
          mockHttp.expectOne(url).flush(Data.Api.getClients());
        });

        it('should return `clients`', () => {
          expect(res).toEqual(Data.Api.getClients());
        });
      });

      describe('Error', () => {
        let error: ErrorEvent;
        let err: any;

        beforeEach(() => {
          error = new ErrorEvent('err');
          apiService
            .getClients()
            .subscribe(
              response => fail(response),
              errorRes => (err = errorRes)
            );
          mockHttp.expectOne(url).error(error);
        });

        it('should return error', () => {
          expect(err.error).toEqual(new ErrorEvent('err'));
        });
      });
    });
  });

  afterEach(() => mockHttp.verify());
});

function createService() {
  mockHttp = TestBed.get(HttpTestingController);
  apiService = TestBed.get(ApiService);
}
