import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import {
  LoggerService,
  MockLoggerService,
  MockMetaService,
  Data
} from 'testing';
import { ApiService, MetaService } from 'shared';
import {
  getPostUrl,
  createCareerMetaTags,
  createPostMetaTags
} from './api.helpers';

let mockHttp: HttpTestingController;
let metaService: MetaService;
let apiService: ApiService;

jest.mock('./api.helpers', () => {
  const { SERVICES, CASE_STUDIES } = (jest as any).requireActual(
    './api.helpers'
  );

  return {
    SERVICES,
    CASE_STUDIES,
    isKnownPostType: jest.fn().mockReturnValue(true),
    getPostUrl: jest.fn().mockReturnValue('/getPostUrl'),
    createCareerMetaTags: jest
      .fn()
      .mockReturnValue('createCareerMetaTagsReturn'),
    createPostMetaTags: jest.fn().mockReturnValue('createPostMetaTagsReturn')
  };
});

beforeEach(jest.clearAllMocks);

describe('ApiService', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: MetaService, useClass: MockMetaService }
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
        it('should return career', async(() => {
          apiService
            .getCareer('career-3')
            .subscribe(res =>
              expect(res).toEqual(Data.Api.getCareers('Career 3'))
            );
          mockHttp.expectOne(url).flush(Data.Api.getCareers<void>());

          expect(createCareerMetaTags).toHaveBeenCalledWith(
            Data.Api.getCareers('Career 3')
          );
        }));

        describe('Has `career`', () => {
          it('should call `createCareerMetaTags` with `career` arg', async(() => {
            apiService
              .getCareer('career-3')
              .subscribe(_ =>
                expect(createCareerMetaTags).toHaveBeenCalledWith(
                  Data.Api.getCareers('Career 3')
                )
              );

            mockHttp.expectOne(url).flush(Data.Api.getCareers<void>());
          }));

          it('should call `MetaService` `setMetaTags` with `createCareerMetaTags` return', async(() => {
            apiService
              .getCareer('career-3')
              .subscribe(_ =>
                expect(metaService.setMetaTags).toHaveBeenCalledWith(
                  'createCareerMetaTagsReturn'
                )
              );

            mockHttp.expectOne(url).flush(Data.Api.getCareers<void>());
          }));
        });

        describe('No `career`', () => {
          it('should not call `createCareerMetaTags`', async(() => {
            apiService
              .getCareer('no')
              .subscribe(_ =>
                expect(createCareerMetaTags).not.toHaveBeenCalled()
              );

            mockHttp.expectOne(url).flush(Data.Api.getCareers<void>());
          }));

          it('should not call `MetaService` `setMetaTags`', async(() => {
            apiService
              .getCareer('no')
              .subscribe(_ =>
                expect(metaService.setMetaTags).not.toHaveBeenCalled()
              );

            mockHttp.expectOne(url).flush(Data.Api.getCareers<void>());
          }));
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
        it('should return `post`', async(() => {
          apiService
            .getPost('service', 'service-3')
            .subscribe(res =>
              expect(res).toEqual(Data.Api.getServices('Service 3'))
            );

          mockHttp.expectOne('/getPostUrl').flush(Data.Api.getServices<void>());
        }));

        describe('Has `post`', () => {
          it('should call `createPostMetaTags` with `type` `id` and `post` args', async(() => {
            apiService
              .getPost('service', 'service-3')
              .subscribe(_ =>
                expect(createPostMetaTags).toHaveBeenCalledWith(
                  'service',
                  'service-3',
                  Data.Api.getServices('Service 3')
                )
              );

            mockHttp
              .expectOne('/getPostUrl')
              .flush(Data.Api.getServices<void>());
          }));

          it('should call `MetaService` `setMetaTags` with `createPostMetaTags` return', async(() => {
            apiService
              .getPost('service', 'service-3')
              .subscribe(_ =>
                expect(metaService.setMetaTags).toHaveBeenCalledWith(
                  'createPostMetaTagsReturn'
                )
              );

            mockHttp
              .expectOne('/getPostUrl')
              .flush(Data.Api.getServices<void>());
          }));
        });

        describe('No `post`', () => {
          it('should not call `createPostMetaTags`', async(() => {
            apiService
              .getPost('service', 'no-service')
              .subscribe(_ =>
                expect(createPostMetaTags).not.toHaveBeenCalled()
              );

            mockHttp
              .expectOne('/getPostUrl')
              .flush(Data.Api.getServices<void>());
          }));

          it('should not call `MetaService` `setMetaTags`', async(() => {
            apiService
              .getPost('service', 'no-service')
              .subscribe(_ =>
                expect(metaService.setMetaTags).not.toHaveBeenCalled()
              );

            mockHttp
              .expectOne('/getPostUrl')
              .flush(Data.Api.getServices<void>());
          }));
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
  metaService = TestBed.get(MetaService);
}
