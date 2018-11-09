import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import {
  TransferState,
  MockTransferState,
  LoggerService,
  MockLoggerService,
  Data
} from 'testing';
import { ApiService } from 'shared';

let mockHttp: HttpTestingController;
let transferState: MockTransferState;
let apiService: ApiService;

describe('ApiService', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: TransferState, useClass: MockTransferState }
      ]
    }).compileComponents()));

  beforeEach(async(() => createService()));

  it('should create service', () => {
    expect(apiService).toBeTruthy();
  });

  describe('`getServices`', () => {
    const url = 'https://api.testing/services.json';

    it('should call `TransferState` `get` with `SERVICES_KEY` and `null` args', () => {
      apiService.getServices().subscribe();
      mockHttp.expectOne(url);

      expect(transferState.get).toHaveBeenCalledWith('api-services', null);
    });

    describe('Cache', () => {
      describe('Has `cache`', () => {
        beforeEach(() =>
          transferState.set('api-services', Data.Api.getServices<void>())
        );

        it('should not call `HttpClient` `get`', () => {
          apiService.getServices().subscribe();

          expect(mockHttp.expectNone(url)).toBeUndefined();
        });

        it('should return `services`', () => {
          apiService
            .getServices()
            .subscribe(res =>
              expect(res).toEqual(Data.Api.getServices<void>())
            );
        });
      });

      describe('No `cache`', () => {
        it('should call `HttpClient` `get`', () => {
          apiService.getServices().subscribe();
          const {
            request: { method }
          } = mockHttp.expectOne(url);

          expect(method).toBe('GET');
        });
      });
    });

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

        it('should call `TransferState` `set` with `SERVICES_KEY` and `services` args', () => {
          expect(transferState.set).toHaveBeenCalledWith(
            'api-services',
            Data.Api.getServices<void>()
          );
        });

        it('should return `services`', () => {
          expect(res).toEqual(Data.Api.getServices<void>());
        });
      });

      describe('Error', () => {
        let res: any = 'fail';

        beforeEach(() => {
          apiService.getServices().subscribe(response => (res = response));
          mockHttp.expectOne(url).error(new ErrorEvent('err'));
        });

        it('should call `HttpClient` `get`', () => {
          const {
            request: { method }
          } = mockHttp.expectOne(url);

          expect(method).toBe('GET');
        });

        it('should not call `TransferState` `set`', () => {
          mockHttp.expectOne(url);

          expect(transferState.set).not.toHaveBeenCalled();
        });

        it('should return `[]`', () => {
          mockHttp.expectOne(url).error(new ErrorEvent(''));
          mockHttp.expectOne(url).error(new ErrorEvent(''));
          mockHttp.expectOne(url).error(new ErrorEvent(''));

          expect(res).toEqual([]);
        });
      });
    });
  });

  describe('`getCareers`', () => {
    const url = 'https://api.testing/careers.json';

    it('should call `TransferState` `get` with `CAREERS_KEY` and `null` args', () => {
      apiService.getCareers().subscribe();
      mockHttp.expectOne(url);

      expect(transferState.get).toHaveBeenCalledWith('api-careers', null);
    });

    describe('Cache', () => {
      describe('Has `cache`', () => {
        beforeEach(() =>
          transferState.set('api-careers', Data.Api.getCareers<void>())
        );

        it('should not call `HttpClient` `get`', () => {
          apiService.getCareers().subscribe();

          expect(mockHttp.expectNone(url)).toBeUndefined();
        });

        it('should return `careers`', () => {
          apiService
            .getCareers()
            .subscribe(res => expect(res).toEqual(Data.Api.getCareers<void>()));
        });
      });

      describe('No `cache`', () => {
        it('should call `HttpClient` `get`', () => {
          apiService.getCareers().subscribe();
          const {
            request: { method }
          } = mockHttp.expectOne(url);

          expect(method).toBe('GET');
        });
      });
    });

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

        it('should call `TransferState` `set` with `CAREERS_KEY` and `careers` args', () => {
          expect(transferState.set).toHaveBeenCalledWith(
            'api-careers',
            Data.Api.getCareers<void>()
          );
        });

        it('should return `careers`', () => {
          expect(res).toEqual(Data.Api.getCareers<void>());
        });
      });

      describe('Error', () => {
        let res: any = 'fail';

        beforeEach(() => {
          apiService.getCareers().subscribe(response => (res = response));
          mockHttp.expectOne(url).error(new ErrorEvent('err'));
        });

        it('should call `HttpClient` `get`', () => {
          const {
            request: { method }
          } = mockHttp.expectOne(url);

          expect(method).toBe('GET');
        });

        it('should not call `TransferState` `set`', () => {
          mockHttp.expectOne(url);

          expect(transferState.set).not.toHaveBeenCalled();
        });

        it('should return `[]`', () => {
          mockHttp.expectOne(url).error(new ErrorEvent(''));
          mockHttp.expectOne(url).error(new ErrorEvent(''));
          mockHttp.expectOne(url).error(new ErrorEvent(''));

          expect(res).toEqual([]);
        });
      });
    });
  });

  describe('`getCareer`', () => {
    const url = 'https://api.testing/careers.json';

    it('should call `TransferState` `get` with `CAREER_KEY` and `null` args', () => {
      apiService.getCareer('career-1').subscribe();
      mockHttp.expectOne(url);

      expect(transferState.get).toHaveBeenCalledWith('api-career', null);
    });

    describe('Cache', () => {
      describe('Has `cache` and `cache.id` is `id`', () => {
        beforeEach(() =>
          transferState.set('api-career', Data.Api.getCareers('Career 1'))
        );

        it('should not call `HttpClient` `get`', () => {
          apiService.getCareer('career-1').subscribe();

          expect(mockHttp.expectNone(url)).toBeUndefined();
        });

        it('should return `career`', () => {
          apiService
            .getCareer('career-1')
            .subscribe(res =>
              expect(res).toEqual(Data.Api.getCareers('Career 1'))
            );
        });
      });

      it('should call `HttpClient` `get` if no `cache`', () => {
        apiService.getCareer('career-1').subscribe();
        const {
          request: { method }
        } = mockHttp.expectOne(url);

        expect(method).toBe('GET');
      });

      it('should call `HttpClient` `get` if `cache.id` is not `id`', () => {
        transferState.set('api-career', Data.Api.getCareers('Career 2'));
        apiService.getCareer('career-1').subscribe();
        const {
          request: { method }
        } = mockHttp.expectOne(url);

        expect(method).toBe('GET');
      });
    });

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

        it('should call `TransferState` `set` with `CAREER_KEY` and `career` args', () => {
          expect(transferState.set).toHaveBeenCalledWith(
            'api-career',
            Data.Api.getCareers('Career 3')
          );
        });

        it('should return `career`', () => {
          expect(res).toEqual(Data.Api.getCareers('Career 3'));
        });
      });

      describe('Error', () => {
        let res: any = 'fail';

        beforeEach(() => {
          apiService
            .getCareer('career-2')
            .subscribe(response => (res = response));
          mockHttp.expectOne(url).error(new ErrorEvent('err'));
        });

        it('should call `HttpClient` `get`', () => {
          const {
            request: { method }
          } = mockHttp.expectOne(url);

          expect(method).toBe('GET');
        });

        it('should not call `TransferState` `set`', () => {
          mockHttp.expectOne(url);

          expect(transferState.set).not.toHaveBeenCalled();
        });

        it('should return `undefined`', () => {
          mockHttp.expectOne(url).error(new ErrorEvent(''));
          mockHttp.expectOne(url).error(new ErrorEvent(''));
          mockHttp.expectOne(url).error(new ErrorEvent(''));

          expect(res).toBeUndefined();
        });
      });
    });

    describe('No `cache`', () => {
      it('should call `TransferState` `get`', () => {
        apiService.getCareer('career-1').subscribe();
        mockHttp.expectOne(url);

        expect(transferState.get).toHaveBeenCalled();
      });

      it('should call `TransferState` `get` with `CAREER_KEY` and `null` args', () => {
        apiService.getCareer('career-1').subscribe();
        mockHttp.expectOne(url);

        expect(transferState.get).toHaveBeenCalledWith('api-career', null);
      });

      it('should call `HttpClient` `get`', () => {
        apiService.getCareer('career-1').subscribe();
        const {
          request: { method }
        } = mockHttp.expectOne(url);

        expect(method).toBe('GET');
      });
    });
  });

  describe('`getPost`', () => {
    const servicesUrl = 'https://api.testing/services.json';
    const caseStudiesUrl = 'https://api.testing/case-studies.json';

    it('should call `TransferState` `get` with `POST_KEY` and `null` args if valid `type`', () => {
      apiService.getPost('service', 'service-1').subscribe();
      mockHttp.expectOne(servicesUrl);

      expect(transferState.get).toHaveBeenCalledWith('api-post', null);
    });

    it('should not call `TransferState` `get` if invalid `type`', () => {
      apiService.getPost('', '').subscribe();

      expect(transferState.get).not.toHaveBeenCalled();
    });

    describe('Cache', () => {
      describe('Has `cache` and `cache.id` is `id`', () => {
        beforeEach(() =>
          transferState.set('api-post', Data.Api.getServices('Service 2'))
        );

        it('should not call `HttpClient` `get`', () => {
          apiService.getPost('service', 'service-2').subscribe();

          expect(mockHttp.expectNone(servicesUrl)).toBeUndefined();
        });

        it('should return `post`', () => {
          apiService
            .getPost('service', 'service-2')
            .subscribe(res =>
              expect(res).toEqual(Data.Api.getServices('Service 2'))
            );
        });
      });

      it('should call `HttpClient` `get` if has `cache` and `cache.id` is not `id`', () => {
        transferState.set('api-post', Data.Api.getServices('Service 1'));
        apiService.getPost('service', 'service-2').subscribe();
        const {
          request: { method }
        } = mockHttp.expectOne(servicesUrl);

        expect(method).toBe('GET');
      });

      it('should call `HttpClient` `get` if no `cache`', () => {
        apiService.getPost('service', 'service-2').subscribe();
        const {
          request: { method }
        } = mockHttp.expectOne(servicesUrl);

        expect(method).toBe('GET');
      });
    });

    describe('Request', () => {
      describe('`type`', () => {
        describe('`service`', () => {
          it('should call `HttpClient` `get` with `SERVICES` url', () => {
            apiService.getPost('service', 'service-1').subscribe();
            const {
              request: { method }
            } = mockHttp.expectOne(servicesUrl);

            expect(method).toBe('GET');
          });
        });

        describe('`work`', () => {
          it('should call `HttpClient` `get` with `CASE_STUDIES` url', () => {
            apiService.getPost('work', 'case-study-1').subscribe();
            const {
              request: { method }
            } = mockHttp.expectOne(caseStudiesUrl);

            expect(method).toBe('GET');
          });
        });

        describe('other', () => {
          it('should not call `HttpClient` `get`', () => {
            apiService.getPost('', 'service-1').subscribe();

            expect(mockHttp.verify()).toBeUndefined();
          });

          it('should return `undefined`', () => {
            apiService
              .getPost('', 'service-1')
              .subscribe(res => expect(res).toBeUndefined());
          });
        });
      });

      describe('No error', () => {
        let res: any;

        beforeEach(() => {
          apiService
            .getPost('service', 'service-3')
            .subscribe(response => (res = response));
          mockHttp.expectOne(servicesUrl).flush(Data.Api.getServices<void>());
        });

        it('should call `TransferState` `set` with `POST_KEY` and `post` args', () => {
          expect(transferState.set).toHaveBeenCalledWith(
            'api-post',
            Data.Api.getServices('Service 3')
          );
        });

        it('should return `post`', () => {
          expect(res).toEqual(Data.Api.getServices('Service 3'));
        });
      });

      describe('Error', () => {
        let res: any = 'fail';

        beforeEach(() => {
          apiService
            .getPost('service', 'service-1')
            .subscribe(response => (res = response));
          mockHttp.expectOne(servicesUrl).error(new ErrorEvent('err'));
        });

        it('should call `HttpClient` `get`', () => {
          mockHttp.expectOne(servicesUrl).error(new ErrorEvent('err'));
          const {
            request: { method }
          } = mockHttp.expectOne(servicesUrl);

          expect(method).toBe('GET');
        });

        it('should not call `TransferState` `set`', () => {
          mockHttp.expectOne(servicesUrl);

          expect(transferState.set).not.toHaveBeenCalled();
        });

        it('should return `undefined`', () => {
          mockHttp.expectOne(servicesUrl).error(new ErrorEvent(''));
          mockHttp.expectOne(servicesUrl).error(new ErrorEvent(''));
          mockHttp.expectOne(servicesUrl).error(new ErrorEvent(''));

          expect(res).toBeUndefined();
        });
      });
    });
  });

  describe('`getCaseStudies`', () => {
    const url = 'https://api.testing/case-studies.json';

    it('should call `TransferState` `get` with `CASE_STUDIES_KEY` and `null` args', () => {
      apiService.getCaseStudies().subscribe();
      mockHttp.expectOne(url);

      expect(transferState.get).toHaveBeenCalledWith('api-case-studies', null);
    });

    describe('Cache', () => {
      describe('Has `cache`', () => {
        beforeEach(() =>
          transferState.set('api-case-studies', Data.Api.getCaseStudies<void>())
        );

        it('should not call `HttpClient` `get`', () => {
          apiService.getCaseStudies().subscribe();

          expect(mockHttp.expectNone(url)).toBeUndefined();
        });

        it('should return `caseStudies`', () => {
          apiService
            .getCaseStudies()
            .subscribe(res =>
              expect(res).toEqual(Data.Api.getCaseStudies<void>())
            );
        });
      });

      describe('No `cache`', () => {
        it('should call `HttpClient` `get`', () => {
          apiService.getCaseStudies().subscribe();
          const {
            request: { method }
          } = mockHttp.expectOne(url);

          expect(method).toBe('GET');
        });
      });
    });

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

        it('should call `TransferState` `set` with `CASE_STUDIES_KEY` and `caseStudies` args', () => {
          expect(transferState.set).toHaveBeenCalledWith(
            'api-case-studies',
            Data.Api.getCaseStudies<void>()
          );
        });

        it('should return `caseStudies`', () => {
          expect(res).toEqual(Data.Api.getCaseStudies<void>());
        });
      });

      describe('Error', () => {
        let res: any = 'fail';

        beforeEach(() => {
          apiService.getCaseStudies().subscribe(response => (res = response));
          mockHttp.expectOne(url).error(new ErrorEvent('err'));
        });

        it('should call `HttpClient` `get`', () => {
          const {
            request: { method }
          } = mockHttp.expectOne(url);

          expect(method).toBe('GET');
        });

        it('should not call `TransferState` `set`', () => {
          mockHttp.expectOne(url);

          expect(transferState.set).not.toHaveBeenCalled();
        });

        it('should return `[]`', () => {
          mockHttp.expectOne(url).error(new ErrorEvent(''));
          mockHttp.expectOne(url).error(new ErrorEvent(''));
          mockHttp.expectOne(url).error(new ErrorEvent(''));

          expect(res).toEqual([]);
        });
      });
    });
  });

  describe('`getTeam`', () => {
    const url = 'https://api.testing/team.json';

    it('should call `TransferState` `get` with `TEAM_KEY` and `null` args', () => {
      apiService.getTeam().subscribe();
      mockHttp.expectOne(url);

      expect(transferState.get).toHaveBeenCalledWith('api-team', null);
    });

    describe('Cache', () => {
      describe('Has `cache`', () => {
        beforeEach(() =>
          transferState.set('api-team', Data.Api.getTeam<void>())
        );

        it('should not call `HttpClient` `get`', () => {
          apiService.getTeam().subscribe();

          expect(mockHttp.expectNone(url)).toBeUndefined();
        });

        it('should return `team`', () => {
          apiService
            .getTeam()
            .subscribe(res => expect(res).toEqual(Data.Api.getTeam<void>()));
        });
      });

      describe('No `cache`', () => {
        it('should call `HttpClient` `get`', () => {
          apiService.getTeam().subscribe();
          const {
            request: { method }
          } = mockHttp.expectOne(url);

          expect(method).toBe('GET');
        });
      });
    });

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

        it('should call `TransferState` `set` with `TEAM_KEY` and `team` args', () => {
          expect(transferState.set).toHaveBeenCalledWith(
            'api-team',
            Data.Api.getTeam<void>()
          );
        });

        it('should return `team`', () => {
          expect(res).toEqual(Data.Api.getTeam<void>());
        });
      });

      describe('Error', () => {
        let res: any = 'fail';

        beforeEach(() => {
          apiService.getTeam().subscribe(response => (res = response));
          mockHttp.expectOne(url).error(new ErrorEvent('err'));
        });

        it('should call `HttpClient` `get`', () => {
          const {
            request: { method }
          } = mockHttp.expectOne(url);

          expect(method).toBe('GET');
        });

        it('should not call `TransferState` `set`', () => {
          mockHttp.expectOne(url);

          expect(transferState.set).not.toHaveBeenCalled();
        });

        it('should return `[]`', () => {
          mockHttp.expectOne(url).error(new ErrorEvent(''));
          mockHttp.expectOne(url).error(new ErrorEvent(''));
          mockHttp.expectOne(url).error(new ErrorEvent(''));

          expect(res).toEqual([]);
        });
      });
    });
  });

  describe('`getClients`', () => {
    const url = 'https://api.testing/clients.json';

    it('should call `TransferState` `get` with `CLIENTS_KEY` and `null` args', () => {
      apiService.getClients().subscribe();
      mockHttp.expectOne(url);

      expect(transferState.get).toHaveBeenCalledWith('api-clients', null);
    });

    describe('Cache', () => {
      describe('Has `cache`', () => {
        beforeEach(() =>
          transferState.set('api-clients', Data.Api.getClients())
        );

        it('should not call `HttpClient` `get`', () => {
          apiService.getClients().subscribe();

          expect(mockHttp.expectNone(url)).toBeUndefined();
        });

        it('should return `clients`', () => {
          apiService
            .getClients()
            .subscribe(res => expect(res).toEqual(Data.Api.getClients()));
        });
      });

      describe('No `cache`', () => {
        it('should call `HttpClient` `get`', () => {
          apiService.getClients().subscribe();
          const {
            request: { method }
          } = mockHttp.expectOne(url);

          expect(method).toBe('GET');
        });
      });
    });

    describe('Request', () => {
      describe('No error', () => {
        let res: any;

        beforeEach(() => {
          apiService.getClients().subscribe(request => (res = request));
          mockHttp.expectOne(url).flush(Data.Api.getClients());
        });

        it('should call `TransferState` `set` with `CLIENTS_KEY` and `clients` args', () => {
          expect(transferState.set).toHaveBeenCalledWith(
            'api-clients',
            Data.Api.getClients()
          );
        });

        it('should return `clients`', () => {
          expect(res).toEqual(Data.Api.getClients());
        });
      });

      describe('Error', () => {
        let res: any = 'fail';

        beforeEach(() => {
          apiService.getClients().subscribe(request => (res = request));
          mockHttp.expectOne(url).error(new ErrorEvent('err'));
        });

        it('should call `HttpClient` `get`', () => {
          const {
            request: { method }
          } = mockHttp.expectOne(url);

          expect(method).toBe('GET');
        });

        it('should not call `TransferState` `set`', () => {
          mockHttp.expectOne(url);

          expect(transferState.set).not.toHaveBeenCalled();
        });

        it('should return `[]`', () => {
          mockHttp.expectOne(url).error(new ErrorEvent(''));
          mockHttp.expectOne(url).error(new ErrorEvent(''));
          mockHttp.expectOne(url).error(new ErrorEvent(''));

          expect(res).toEqual([]);
        });
      });
    });
  });

  afterEach(() => mockHttp.verify());
});

function createService() {
  mockHttp = TestBed.get(HttpTestingController);
  transferState = TestBed.get(TransferState);
  apiService = TestBed.get(ApiService);
}
