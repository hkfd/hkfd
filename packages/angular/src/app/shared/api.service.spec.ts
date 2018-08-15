import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { TransferState, MockTransferState, Data } from 'testing';
import { ApiService, LoggerService } from 'shared';

let mockHttp: HttpTestingController;
let transferState: MockTransferState;
let apiService: ApiService;

describe('ApiService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        LoggerService,
        { provide: TransferState, useClass: MockTransferState }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => createService()));

  describe('getServices', () => {
    describe('cache', () => {
      beforeEach(() => transferState.set('api-services', Data.Api.services));

      it('should not call HttpClient get', async(() => {
        apiService.getServices().subscribe();

        expect(mockHttp.expectNone(apiService.services)).toBeUndefined();
      }));

      it('should return services', async(() => {
        apiService
          .getServices()
          .subscribe(res => expect(res).toEqual(Data.Api.services));
      }));
    });

    describe('no cache', () => {
      it('should call HttpClient get', async(() => {
        apiService.getServices().subscribe(res => expect(res).toBeDefined());

        mockHttp.expectOne(apiService.services).flush(Data.Api.services);
      }));

      it('should call HttpClient again on error', async(() => {
        apiService.getServices().subscribe(res => expect(res).toBeDefined());

        mockHttp.expectOne(apiService.services).error(new ErrorEvent('err'));
        mockHttp.expectOne(apiService.services).flush(Data.Api.services);
      }));

      it('should return services', async(() => {
        apiService
          .getServices()
          .subscribe(res => expect(res).toEqual(Data.Api.services));

        mockHttp.expectOne(apiService.services).flush(Data.Api.services);
      }));

      it('should return empty array on last retry error', async(() => {
        apiService.getServices().subscribe(res => expect(res).toEqual([]));

        Array(4)
          .fill(0)
          .forEach(_ =>
            mockHttp.expectOne(apiService.services).error(new ErrorEvent('err'))
          );
      }));
    });
  });

  describe('getCareers', () => {
    describe('cache', () => {
      beforeEach(() => transferState.set('api-careers', Data.Api.careers));

      it('should not call HttpClient get', async(() => {
        apiService.getCareers().subscribe();

        expect(mockHttp.expectNone(apiService.careers)).toBeUndefined();
      }));

      it('should return careers', async(() => {
        apiService
          .getCareers()
          .subscribe(res => expect(res).toEqual(Data.Api.careers));
      }));
    });

    describe('no cache', () => {
      it('should call HttpClient get', async(() => {
        apiService.getCareers().subscribe(res => expect(res).toBeDefined());

        mockHttp.expectOne(apiService.careers).flush(Data.Api.careers);
      }));

      it('should call HttpClient again on error', async(() => {
        apiService.getCareers().subscribe(res => expect(res).toBeDefined());

        mockHttp.expectOne(apiService.careers).error(new ErrorEvent('err'));
        mockHttp.expectOne(apiService.careers).flush(Data.Api.careers);
      }));

      it('should return careers', async(() => {
        apiService
          .getCareers()
          .subscribe(res => expect(res).toEqual(Data.Api.careers));

        mockHttp.expectOne(apiService.careers).flush(Data.Api.careers);
      }));

      it('should return empty array on last retry error', async(() => {
        apiService.getCareers().subscribe(res => expect(res).toEqual([]));

        Array(4)
          .fill(0)
          .forEach(_ =>
            mockHttp.expectOne(apiService.careers).error(new ErrorEvent('err'))
          );
      }));
    });
  });

  describe('getCaseStudies', () => {
    describe('cache', () => {
      beforeEach(() =>
        transferState.set('api-case-studies', Data.Api.caseStudies));

      it('should not call HttpClient get', async(() => {
        apiService.getCaseStudies().subscribe();

        expect(mockHttp.expectNone(apiService.caseStudies)).toBeUndefined();
      }));

      it('should return case studies', async(() => {
        apiService
          .getCaseStudies()
          .subscribe(res => expect(res).toEqual(Data.Api.caseStudies));
      }));
    });

    describe('no cache', () => {
      it('should call HttpClient get', async(() => {
        apiService.getCaseStudies().subscribe(res => expect(res).toBeDefined());

        mockHttp.expectOne(apiService.caseStudies).flush(Data.Api.caseStudies);
      }));

      it('should call HttpClient again on error', async(() => {
        apiService.getCaseStudies().subscribe(res => expect(res).toBeDefined());

        mockHttp.expectOne(apiService.caseStudies).error(new ErrorEvent('err'));
        mockHttp.expectOne(apiService.caseStudies).flush(Data.Api.caseStudies);
      }));

      it('should return case studies', async(() => {
        apiService
          .getCaseStudies()
          .subscribe(res => expect(res).toEqual(Data.Api.caseStudies));

        mockHttp.expectOne(apiService.caseStudies).flush(Data.Api.caseStudies);
      }));

      it('should return empty array on last retry error', async(() => {
        apiService.getCaseStudies().subscribe(res => expect(res).toEqual([]));

        Array(4)
          .fill(0)
          .forEach(_ =>
            mockHttp
              .expectOne(apiService.caseStudies)
              .error(new ErrorEvent('err'))
          );
      }));
    });
  });

  describe('getTeam', () => {
    describe('cache', () => {
      beforeEach(() => transferState.set('api-team', Data.Api.team));

      it('should not call HttpClient get', async(() => {
        apiService.getTeam().subscribe();

        expect(mockHttp.expectNone(apiService.team)).toBeUndefined();
      }));

      it('should return team', async(() => {
        apiService
          .getTeam()
          .subscribe(res => expect(res).toEqual(Data.Api.team));
      }));
    });

    describe('no cache', () => {
      it('should call HttpClient get', async(() => {
        apiService.getTeam().subscribe(res => expect(res).toBeDefined());

        mockHttp.expectOne(apiService.team).flush(Data.Api.team);
      }));

      it('should call HttpClient again on error', async(() => {
        apiService.getTeam().subscribe(res => expect(res).toBeDefined());

        mockHttp.expectOne(apiService.team).error(new ErrorEvent('err'));
        mockHttp.expectOne(apiService.team).flush(Data.Api.team);
      }));

      it('should return team', async(() => {
        apiService
          .getTeam()
          .subscribe(res => expect(res).toEqual(Data.Api.team));

        mockHttp.expectOne(apiService.team).flush(Data.Api.team);
      }));

      it('should return empty array on last retry error', async(() => {
        apiService.getTeam().subscribe(res => expect(res).toEqual([]));

        Array(4)
          .fill(0)
          .forEach(_ =>
            mockHttp.expectOne(apiService.team).error(new ErrorEvent('err'))
          );
      }));
    });
  });

  describe('getClients', () => {
    describe('cache', () => {
      beforeEach(() => transferState.set('api-clients', Data.Api.clients));

      it('should not call HttpClient get', async(() => {
        apiService.getClients().subscribe();

        expect(mockHttp.expectNone(apiService.clients)).toBeUndefined();
      }));

      it('should return clients', async(() => {
        apiService
          .getClients()
          .subscribe(res => expect(res).toEqual(Data.Api.clients));
      }));
    });

    describe('no cache', () => {
      it('should call HttpClient get', async(() => {
        apiService.getClients().subscribe(res => expect(res).toBeDefined());

        mockHttp.expectOne(apiService.clients).flush(Data.Api.clients);
      }));

      it('should call HttpClient again on error', async(() => {
        apiService.getClients().subscribe(res => expect(res).toBeDefined());

        mockHttp.expectOne(apiService.clients).error(new ErrorEvent('err'));
        mockHttp.expectOne(apiService.clients).flush(Data.Api.clients);
      }));

      it('should return clients', async(() => {
        apiService
          .getClients()
          .subscribe(res => expect(res).toEqual(Data.Api.clients));

        mockHttp.expectOne(apiService.clients).flush(Data.Api.clients);
      }));

      it('should return empty array on last retry error', async(() => {
        apiService.getClients().subscribe(res => expect(res).toEqual([]));

        Array(4)
          .fill(0)
          .forEach(_ =>
            mockHttp.expectOne(apiService.clients).error(new ErrorEvent('err'))
          );
      }));
    });
  });

  describe('getPost', () => {
    describe('cache', () => {
      beforeEach(() => transferState.set('api-post', {}));

      it('should not call HttpClient get', async(() => {
        apiService.getCareers().subscribe();

        expect(mockHttp.expectNone(apiService.services)).toBeUndefined();
        expect(mockHttp.expectNone(apiService.caseStudies)).toBeUndefined();
      }));
    });

    describe('no cache', () => {
      it(`should set url to services if type is 'service'`, async(() => {
        apiService
          .getPost('service', null)
          .subscribe(res => expect(res).toBeUndefined());

        mockHttp.expectOne(apiService.services).flush(Data.Api.services);
      }));

      it(`should set url to caseStudies if type is 'work'`, async(() => {
        apiService
          .getPost('work', null)
          .subscribe(res => expect(res).toBeUndefined());

        mockHttp.expectOne(apiService.caseStudies).flush(Data.Api.caseStudies);
      }));

      it('should return service post', async(() => {
        apiService
          .getPost('service', 'service-2')
          .subscribe(res => expect(res.title).toBe('Service 2'));

        mockHttp.expectOne(apiService.services).flush(Data.Api.services);
      }));

      it('should return case study post', async(() => {
        apiService
          .getPost('work', 'case-study-1')
          .subscribe(res => expect(res.title).toBe('Case Study 1'));

        mockHttp.expectOne(apiService.caseStudies).flush(Data.Api.caseStudies);
      }));

      it('should return null if no type arg', async(() => {
        apiService
          .getPost(null, 'service-1')
          .subscribe(res => expect(res).toBe(null));
      }));

      it('should return undefined if no id arg', async(() => {
        apiService
          .getPost('work', null)
          .subscribe(res => expect(res).toBe(undefined));

        mockHttp.expectOne(apiService.caseStudies).flush(Data.Api.caseStudies);
      }));

      it('should return undefined on last retry error', async(() => {
        apiService
          .getPost('work', 'case-study-1')
          .subscribe(res => expect(res).toBe(undefined));

        Array(4)
          .fill(0)
          .forEach(() =>
            mockHttp
              .expectOne(apiService.caseStudies)
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
