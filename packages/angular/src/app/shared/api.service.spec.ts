import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import {
  LoggerService,
  MockLoggerService,
  MockMetaService,
  Data,
  MockNotificationService
} from 'testing';
import {
  ApiService,
  MetaService,
  NotificationService,
  catchNetworkError
} from 'shared';
import { getPostUrl, createPostMetaTags } from './api.helpers';

let mockHttp: HttpTestingController;
let metaService: MetaService;
let notificationService: NotificationService;
let apiService: ApiService;

jest.mock('shared/errors/operators', () => {
  const { pipe } = require('rxjs');

  return { catchNetworkError: jest.fn().mockReturnValue(pipe()) };
});

jest.mock('./api.helpers', () => {
  const { SERVICES, CASE_STUDIES } = (jest as any).requireActual(
    './api.helpers'
  );

  return {
    SERVICES,
    CASE_STUDIES,
    isKnownPostType: jest.fn().mockReturnValue(true),
    getPostUrl: jest.fn().mockReturnValue('/getPostUrl'),
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
        { provide: MetaService, useClass: MockMetaService },
        { provide: NotificationService, useClass: MockNotificationService }
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

      it('should call `catchNetworkError` with `NotificationService` `displayMessage` function `arg`', () => {
        (notificationService.displayMessage as jest.Mock).mockImplementation(
          (...args: any[]) => args
        );
        apiService.getServices().subscribe();
        const [
          [catchNetworkErrorFunctionArgs]
        ] = (catchNetworkError as jest.Mock).mock.calls;

        expect(catchNetworkErrorFunctionArgs()).toEqual([
          `Couldn't load services`,
          {
            action: 'Retry'
          }
        ]);
        mockHttp.expectOne(url);
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

      it('should call `catchNetworkError` with `NotificationService` `displayMessage` function `arg`', () => {
        (notificationService.displayMessage as jest.Mock).mockImplementation(
          (...args: any[]) => args
        );
        apiService.getPost('service', 'service-1').subscribe();
        const [
          [catchNetworkErrorFunctionArgs]
        ] = (catchNetworkError as jest.Mock).mock.calls;

        expect(catchNetworkErrorFunctionArgs()).toEqual([
          `Couldn't load post`,
          {
            action: 'Retry'
          }
        ]);
        mockHttp.expectOne('/getPostUrl');
      });

      describe('No error', () => {
        it('should return `post` if has `post`', async(() => {
          apiService
            .getPost('service', 'service-3')
            .subscribe(res =>
              expect(res).toEqual(Data.Api.getServices('Service 3'))
            );

          mockHttp.expectOne('/getPostUrl').flush(Data.Api.getServices<void>());
        }));

        it('should return `null` if no `post`', async(() => {
          apiService
            .getPost('service', 'no-service')
            .subscribe(res => expect(res).toBe(null));

          mockHttp.expectOne('/getPostUrl').flush(Data.Api.getServices<void>());
        }));

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

          mockHttp.expectOne('/getPostUrl').flush(Data.Api.getServices<void>());
        }));

        it('should call `MetaService` `setMetaTags` with `createPostMetaTags` return', async(() => {
          apiService
            .getPost('service', 'service-3')
            .subscribe(_ =>
              expect(metaService.setMetaTags).toHaveBeenCalledWith(
                'createPostMetaTagsReturn'
              )
            );

          mockHttp.expectOne('/getPostUrl').flush(Data.Api.getServices<void>());
        }));
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

      it('should call `catchNetworkError` with `NotificationService` `displayMessage` function `arg`', () => {
        (notificationService.displayMessage as jest.Mock).mockImplementation(
          (...args: any[]) => args
        );
        apiService.getCaseStudies().subscribe();
        const [
          [catchNetworkErrorFunctionArgs]
        ] = (catchNetworkError as jest.Mock).mock.calls;

        expect(catchNetworkErrorFunctionArgs()).toEqual([
          `Couldn't load case studies`,
          {
            action: 'Retry'
          }
        ]);
        mockHttp.expectOne(url);
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

      it('should call `catchNetworkError` with `NotificationService` `displayMessage` function `arg`', () => {
        (notificationService.displayMessage as jest.Mock).mockImplementation(
          (...args: any[]) => args
        );
        apiService.getTeam().subscribe();
        const [
          [catchNetworkErrorFunctionArgs]
        ] = (catchNetworkError as jest.Mock).mock.calls;

        expect(catchNetworkErrorFunctionArgs()).toEqual([
          `Couldn't load team`,
          {
            action: 'Retry'
          }
        ]);
        mockHttp.expectOne(url);
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
      it('should call `catchNetworkError` with `NotificationService` `displayMessage` function `arg`', () => {
        (notificationService.displayMessage as jest.Mock).mockImplementation(
          (...args: any[]) => args
        );
        apiService.getClients().subscribe();
        const [
          [catchNetworkErrorFunctionArgs]
        ] = (catchNetworkError as jest.Mock).mock.calls;

        expect(catchNetworkErrorFunctionArgs()).toEqual([
          `Couldn't load clients`,
          {
            action: 'Retry'
          }
        ]);
        mockHttp.expectOne(url);
      });

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
  notificationService = TestBed.get(NotificationService);
}
