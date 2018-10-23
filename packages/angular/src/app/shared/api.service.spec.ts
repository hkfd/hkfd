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
import { ApiService, Api } from 'shared';

let mockHttp: HttpTestingController;
let transferState: MockTransferState;
let apiService: ApiService;

describe('ApiService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: TransferState, useClass: MockTransferState }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => createService()));

  describe('getServices', () => {
    describe('cache', () => {
      beforeEach(() =>
        transferState.set('api-services', Data.Api.getServices<void>()));

      it('should not call HttpClient get', async(() => {
        apiService.getServices().subscribe();

        expect(
          mockHttp.expectNone('https://api.testing/services.json')
        ).toBeUndefined();
      }));

      it('should return services', async(() => {
        apiService
          .getServices()
          .subscribe(res => expect(res).toEqual(Data.Api.getServices<void>()));
      }));
    });

    describe('no cache', () => {
      it('should call HttpClient get', async(() => {
        apiService.getServices().subscribe(res => expect(res).toBeDefined());

        mockHttp
          .expectOne('https://api.testing/services.json')
          .flush(Data.Api.getServices<void>());
      }));

      it('should call HttpClient again on error', async(() => {
        apiService.getServices().subscribe(res => expect(res).toBeDefined());

        mockHttp
          .expectOne('https://api.testing/services.json')
          .error(new ErrorEvent('err'));
        mockHttp
          .expectOne('https://api.testing/services.json')
          .flush(Data.Api.getServices<void>());
      }));

      it('should return services', async(() => {
        apiService
          .getServices()
          .subscribe(res => expect(res).toEqual(Data.Api.getServices<void>()));

        mockHttp
          .expectOne('https://api.testing/services.json')
          .flush(Data.Api.getServices<void>());
      }));

      it('should return empty array on last retry error', async(() => {
        apiService.getServices().subscribe(res => expect(res).toEqual([]));

        Array(4)
          .fill(0)
          .forEach(_ =>
            mockHttp
              .expectOne('https://api.testing/services.json')
              .error(new ErrorEvent('err'))
          );
      }));
    });
  });

  describe('getCareers', () => {
    describe('cache', () => {
      beforeEach(() =>
        transferState.set('api-careers', Data.Api.getCareers<void>()));

      it('should not call HttpClient get', async(() => {
        apiService.getCareers().subscribe();

        expect(
          mockHttp.expectNone('https://api.testing/careers.json')
        ).toBeUndefined();
      }));

      it('should return careers', async(() => {
        apiService
          .getCareers()
          .subscribe(res => expect(res).toEqual(Data.Api.getCareers<void>()));
      }));
    });

    describe('no cache', () => {
      it('should call HttpClient get', async(() => {
        apiService.getCareers().subscribe(res => expect(res).toBeDefined());

        mockHttp
          .expectOne('https://api.testing/careers.json')
          .flush(Data.Api.getCareers<void>());
      }));

      it('should call HttpClient again on error', async(() => {
        apiService.getCareers().subscribe(res => expect(res).toBeDefined());

        mockHttp
          .expectOne('https://api.testing/careers.json')
          .error(new ErrorEvent('err'));
        mockHttp
          .expectOne('https://api.testing/careers.json')
          .flush(Data.Api.getCareers<void>());
      }));

      it('should return careers', async(() => {
        apiService
          .getCareers()
          .subscribe(res => expect(res).toEqual(Data.Api.getCareers<void>()));

        mockHttp
          .expectOne('https://api.testing/careers.json')
          .flush(Data.Api.getCareers<void>());
      }));

      it('should return empty array on last retry error', async(() => {
        apiService.getCareers().subscribe(res => expect(res).toEqual([]));

        Array(4)
          .fill(0)
          .forEach(_ =>
            mockHttp
              .expectOne('https://api.testing/careers.json')
              .error(new ErrorEvent('err'))
          );
      }));
    });
  });

  describe('getCareer', () => {
    describe('cache', () => {
      beforeEach(() =>
        transferState.set('api-career', Data.Api.getCareers<void>()[0]));

      describe('same id', () => {
        it('should not call HttpClient get', async(() => {
          apiService.getCareer('career-1').subscribe();

          expect(
            mockHttp.expectNone('https://api.testing/careers.json')
          ).toBeUndefined();
        }));

        it('should return career', async(() => {
          apiService
            .getCareer('career-1')
            .subscribe(res =>
              expect(res).toEqual(Data.Api.getCareers<void>()[0])
            );
        }));
      });

      describe('different id', () => {
        it('should call HttpClient get', async(() => {
          apiService.getCareer('career-2').subscribe();

          expect(
            mockHttp.expectOne('https://api.testing/careers.json')
          ).toBeTruthy();
        }));

        it('should return career', async(() => {
          apiService
            .getCareer('career-2')
            .subscribe(res =>
              expect((res as Api.Career).title).toBe('Career 2')
            );

          mockHttp
            .expectOne('https://api.testing/careers.json')
            .flush(Data.Api.getCareers<void>());
        }));
      });
    });

    describe('no cache', () => {
      it('should call HttpClient get', async(() => {
        apiService
          .getCareer('career-1')
          .subscribe(res => expect(res).toBeDefined());

        mockHttp
          .expectOne('https://api.testing/careers.json')
          .flush(Data.Api.getCareers<void>());
      }));

      it('should call HttpClient again on error', async(() => {
        apiService
          .getCareer('career-1')
          .subscribe(res => expect(res).toBeDefined());

        mockHttp
          .expectOne('https://api.testing/careers.json')
          .error(new ErrorEvent('err'));
        mockHttp
          .expectOne('https://api.testing/careers.json')
          .flush(Data.Api.getCareers<void>());
      }));

      it('should return career', async(() => {
        apiService
          .getCareer('career-1')
          .subscribe(res =>
            expect(res).toEqual(Data.Api.getCareers<void>()[0])
          );

        mockHttp
          .expectOne('https://api.testing/careers.json')
          .flush(Data.Api.getCareers<void>());
      }));

      it('should return undefined on last retry error', async(() => {
        apiService
          .getCareer('career-1')
          .subscribe(res => expect(res).toBe(undefined));

        Array(4)
          .fill(0)
          .forEach(_ =>
            mockHttp
              .expectOne('https://api.testing/careers.json')
              .error(new ErrorEvent('err'))
          );
      }));
    });
  });

  describe('getCaseStudies', () => {
    describe('cache', () => {
      beforeEach(() =>
        transferState.set('api-case-studies', Data.Api.getCaseStudies<void>()));

      it('should not call HttpClient get', async(() => {
        apiService.getCaseStudies().subscribe();

        expect(
          mockHttp.expectNone('https://api.testing/case-studies.json')
        ).toBeUndefined();
      }));

      it('should return case studies', async(() => {
        apiService
          .getCaseStudies()
          .subscribe(res =>
            expect(res).toEqual(Data.Api.getCaseStudies<void>())
          );
      }));
    });

    describe('no cache', () => {
      it('should call HttpClient get', async(() => {
        apiService.getCaseStudies().subscribe(res => expect(res).toBeDefined());

        mockHttp
          .expectOne('https://api.testing/case-studies.json')
          .flush(Data.Api.getCaseStudies<void>());
      }));

      it('should call HttpClient again on error', async(() => {
        apiService.getCaseStudies().subscribe(res => expect(res).toBeDefined());

        mockHttp
          .expectOne('https://api.testing/case-studies.json')
          .error(new ErrorEvent('err'));
        mockHttp
          .expectOne('https://api.testing/case-studies.json')
          .flush(Data.Api.getCaseStudies<void>());
      }));

      it('should return case studies', async(() => {
        apiService
          .getCaseStudies()
          .subscribe(res =>
            expect(res).toEqual(Data.Api.getCaseStudies<void>())
          );

        mockHttp
          .expectOne('https://api.testing/case-studies.json')
          .flush(Data.Api.getCaseStudies<void>());
      }));

      it('should return empty array on last retry error', async(() => {
        apiService.getCaseStudies().subscribe(res => expect(res).toEqual([]));

        Array(4)
          .fill(0)
          .forEach(_ =>
            mockHttp
              .expectOne('https://api.testing/case-studies.json')
              .error(new ErrorEvent('err'))
          );
      }));
    });
  });

  describe('getTeam', () => {
    describe('cache', () => {
      beforeEach(() => transferState.set('api-team', Data.Api.getTeam<void>()));

      it('should not call HttpClient get', async(() => {
        apiService.getTeam().subscribe();

        expect(
          mockHttp.expectNone('https://api.testing/team.json')
        ).toBeUndefined();
      }));

      it('should return team', async(() => {
        apiService
          .getTeam()
          .subscribe(res => expect(res).toEqual(Data.Api.getTeam<void>()));
      }));
    });

    describe('no cache', () => {
      it('should call HttpClient get', async(() => {
        apiService.getTeam().subscribe(res => expect(res).toBeDefined());

        mockHttp
          .expectOne('https://api.testing/team.json')
          .flush(Data.Api.getTeam<void>());
      }));

      it('should call HttpClient again on error', async(() => {
        apiService.getTeam().subscribe(res => expect(res).toBeDefined());

        mockHttp
          .expectOne('https://api.testing/team.json')
          .error(new ErrorEvent('err'));
        mockHttp
          .expectOne('https://api.testing/team.json')
          .flush(Data.Api.getTeam<void>());
      }));

      it('should return team', async(() => {
        apiService
          .getTeam()
          .subscribe(res => expect(res).toEqual(Data.Api.getTeam<void>()));

        mockHttp
          .expectOne('https://api.testing/team.json')
          .flush(Data.Api.getTeam<void>());
      }));

      it('should return empty array on last retry error', async(() => {
        apiService.getTeam().subscribe(res => expect(res).toEqual([]));

        Array(4)
          .fill(0)
          .forEach(_ =>
            mockHttp
              .expectOne('https://api.testing/team.json')
              .error(new ErrorEvent('err'))
          );
      }));
    });
  });

  describe('getClients', () => {
    describe('cache', () => {
      beforeEach(() => transferState.set('api-clients', Data.Api.getClients()));

      it('should not call HttpClient get', async(() => {
        apiService.getClients().subscribe();

        expect(
          mockHttp.expectNone('https://api.testing/clients.json')
        ).toBeUndefined();
      }));

      it('should return clients', async(() => {
        apiService
          .getClients()
          .subscribe(res => expect(res).toEqual(Data.Api.getClients()));
      }));
    });

    describe('no cache', () => {
      it('should call HttpClient get', async(() => {
        apiService.getClients().subscribe(res => expect(res).toBeDefined());

        mockHttp
          .expectOne('https://api.testing/clients.json')
          .flush(Data.Api.getClients());
      }));

      it('should call HttpClient again on error', async(() => {
        apiService.getClients().subscribe(res => expect(res).toBeDefined());

        mockHttp
          .expectOne('https://api.testing/clients.json')
          .error(new ErrorEvent('err'));
        mockHttp
          .expectOne('https://api.testing/clients.json')
          .flush(Data.Api.getClients());
      }));

      it('should return clients', async(() => {
        apiService
          .getClients()
          .subscribe(res => expect(res).toEqual(Data.Api.getClients()));

        mockHttp
          .expectOne('https://api.testing/clients.json')
          .flush(Data.Api.getClients());
      }));

      it('should return empty array on last retry error', async(() => {
        apiService.getClients().subscribe(res => expect(res).toEqual([]));

        Array(4)
          .fill(0)
          .forEach(_ =>
            mockHttp
              .expectOne('https://api.testing/clients.json')
              .error(new ErrorEvent('err'))
          );
      }));
    });
  });

  describe('getPost', () => {
    describe('cache', () => {
      beforeEach(() =>
        transferState.set('api-post', Data.Api.getCaseStudies<void>()[0]));

      describe('same id', () => {
        it('should not call HttpClient get', async(() => {
          apiService.getPost('work', 'case-study-1').subscribe();

          expect(
            mockHttp.expectNone('https://api.testing/services.json')
          ).toBeUndefined();
          expect(
            mockHttp.expectNone('https://api.testing/case-studies.json')
          ).toBeUndefined();
        }));

        it('should return post', async(() => {
          apiService
            .getPost('work', 'case-study-1')
            .subscribe(res =>
              expect(res).toEqual(Data.Api.getCaseStudies<void>()[0])
            );
        }));
      });

      describe('different id', () => {
        it('should call HttpClient get', async(() => {
          apiService.getPost('work', 'case-study-2').subscribe();

          expect(
            mockHttp.expectOne('https://api.testing/case-studies.json')
          ).toBeTruthy();
        }));

        it('should return post', async(() => {
          apiService
            .getPost('work', 'case-study-2')
            .subscribe(res =>
              expect((res as Api.Post).title).toBe('Case Study 2')
            );

          mockHttp
            .expectOne('https://api.testing/case-studies.json')
            .flush(Data.Api.getCaseStudies<void>());
        }));
      });
    });

    describe('no cache', () => {
      it('should set url to services if type is `service`', async(() => {
        apiService
          .getPost('service', '')
          .subscribe(res => expect(res).toBeUndefined());

        mockHttp
          .expectOne('https://api.testing/services.json')
          .flush(Data.Api.getServices<void>());
      }));

      it('should set url to caseStudies if type is `work`', async(() => {
        apiService
          .getPost('work', '')
          .subscribe(res => expect(res).toBeUndefined());

        mockHttp
          .expectOne('https://api.testing/case-studies.json')
          .flush(Data.Api.getCaseStudies<void>());
      }));

      it('should return service post', async(() => {
        apiService
          .getPost('service', 'service-2')
          .subscribe(res => expect((res as Api.Post).title).toBe('Service 2'));

        mockHttp
          .expectOne('https://api.testing/services.json')
          .flush(Data.Api.getServices<void>());
      }));

      it('should return case study post', async(() => {
        apiService
          .getPost('work', 'case-study-1')
          .subscribe(res =>
            expect((res as Api.Post).title).toBe('Case Study 1')
          );

        mockHttp
          .expectOne('https://api.testing/case-studies.json')
          .flush(Data.Api.getCaseStudies<void>());
      }));

      it('should return undefined if no type arg', async(() => {
        apiService
          .getPost('', 'service-1')
          .subscribe(res => expect(res).toBe(undefined));
      }));

      it('should return undefined if no id arg', async(() => {
        apiService
          .getPost('work', '')
          .subscribe(res => expect(res).toBe(undefined));

        mockHttp
          .expectOne('https://api.testing/case-studies.json')
          .flush(Data.Api.getCaseStudies<void>());
      }));

      it('should return undefined on last retry error', async(() => {
        apiService
          .getPost('work', 'case-study-1')
          .subscribe(res => expect(res).toBe(undefined));

        Array(4)
          .fill(0)
          .forEach(() =>
            mockHttp
              .expectOne('https://api.testing/case-studies.json')
              .error(new ErrorEvent('err'))
          );
      }));
    });
  });
});

function createService() {
  mockHttp = TestBed.get(HttpTestingController);
  transferState = TestBed.get(TransferState);
  apiService = TestBed.get(ApiService);
}
