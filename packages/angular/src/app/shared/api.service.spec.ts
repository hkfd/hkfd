import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { services, careers, caseStudies, team, clients } from '../../testing';
import { LoggerService } from './shared.module';
import { ApiService } from './api.service';

let apiService: ApiService;
let mockHttp: HttpTestingController;

describe('ApiService', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ApiService, LoggerService]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createService()));

  describe('getServices', () => {
    it(
      'should call HttpClient get',
      async(() => {
        apiService.getServices().subscribe();

        mockHttp.expectOne(apiService.services).flush(services);
      })
    );

    it(
      'should call HttpClient again on error',
      async(() => {
        apiService.getServices().subscribe();

        mockHttp.expectOne(apiService.services).error(new ErrorEvent('err'));
        mockHttp.expectOne(apiService.services).flush(services);
      })
    );

    it(
      'should return services',
      async(() => {
        apiService
          .getServices()
          .subscribe(res => expect(res).toEqual(services));

        mockHttp.expectOne(apiService.services).flush(services);
      })
    );

    it(
      'should return empty array on last retry error',
      async(() => {
        apiService.getServices().subscribe(res => expect(res).toEqual([]));

        Array(4)
          .fill(0)
          .forEach(_ =>
            mockHttp.expectOne(apiService.services).error(new ErrorEvent('err'))
          );
      })
    );
  });

  describe('getCareers', () => {
    it(
      'should call HttpClient get',
      async(() => {
        apiService.getCareers().subscribe();

        mockHttp.expectOne(apiService.careers).flush(careers);
      })
    );

    it(
      'should call HttpClient again on error',
      async(() => {
        apiService.getCareers().subscribe();

        mockHttp.expectOne(apiService.careers).error(new ErrorEvent('err'));
        mockHttp.expectOne(apiService.careers).flush(careers);
      })
    );

    it(
      'should return careers',
      async(() => {
        apiService.getCareers().subscribe(res => expect(res).toEqual(careers));

        mockHttp.expectOne(apiService.careers).flush(careers);
      })
    );

    it(
      'should return empty array on last retry error',
      async(() => {
        apiService.getCareers().subscribe(res => expect(res).toEqual([]));

        Array(4)
          .fill(0)
          .forEach(_ =>
            mockHttp.expectOne(apiService.careers).error(new ErrorEvent('err'))
          );
      })
    );
  });

  describe('getCaseStudies', () => {
    it(
      'should call HttpClient get',
      async(() => {
        apiService.getCaseStudies().subscribe();

        mockHttp.expectOne(apiService.caseStudies).flush(caseStudies);
      })
    );

    it(
      'should call HttpClient again on error',
      async(() => {
        apiService.getCaseStudies().subscribe();

        mockHttp.expectOne(apiService.caseStudies).error(new ErrorEvent('err'));
        mockHttp.expectOne(apiService.caseStudies).flush(caseStudies);
      })
    );

    it(
      'should return case studies',
      async(() => {
        apiService
          .getCaseStudies()
          .subscribe(res => expect(res).toEqual(caseStudies));

        mockHttp.expectOne(apiService.caseStudies).flush(caseStudies);
      })
    );

    it(
      'should return empty array on last retry error',
      async(() => {
        apiService.getCaseStudies().subscribe(res => expect(res).toEqual([]));

        Array(4)
          .fill(0)
          .forEach(_ =>
            mockHttp
              .expectOne(apiService.caseStudies)
              .error(new ErrorEvent('err'))
          );
      })
    );
  });

  describe('getTeam', () => {
    it(
      'should call HttpClient get',
      async(() => {
        apiService.getTeam().subscribe();

        mockHttp.expectOne(apiService.team).flush(team);
      })
    );

    it(
      'should call HttpClient again on error',
      async(() => {
        apiService.getTeam().subscribe();

        mockHttp.expectOne(apiService.team).error(new ErrorEvent('err'));
        mockHttp.expectOne(apiService.team).flush(team);
      })
    );

    it(
      'should return team',
      async(() => {
        apiService.getTeam().subscribe(res => expect(res).toEqual(team));

        mockHttp.expectOne(apiService.team).flush(team);
      })
    );

    it(
      'should return empty array on last retry error',
      async(() => {
        apiService.getTeam().subscribe(res => expect(res).toEqual([]));

        Array(4)
          .fill(0)
          .forEach(_ =>
            mockHttp.expectOne(apiService.team).error(new ErrorEvent('err'))
          );
      })
    );
  });

  describe('getClients', () => {
    it(
      'should call HttpClient get',
      async(() => {
        apiService.getClients().subscribe();

        mockHttp.expectOne(apiService.clients).flush(clients);
      })
    );

    it(
      'should call HttpClient again on error',
      async(() => {
        apiService.getClients().subscribe();

        mockHttp.expectOne(apiService.clients).error(new ErrorEvent('err'));
        mockHttp.expectOne(apiService.clients).flush(clients);
      })
    );

    it(
      'should return clients',
      async(() => {
        apiService.getClients().subscribe(res => expect(res).toEqual(clients));

        mockHttp.expectOne(apiService.clients).flush(clients);
      })
    );

    it(
      'should return empty array on last retry error',
      async(() => {
        apiService.getClients().subscribe(res => expect(res).toEqual([]));

        Array(4)
          .fill(0)
          .forEach(_ =>
            mockHttp.expectOne(apiService.clients).error(new ErrorEvent('err'))
          );
      })
    );
  });

  describe('getPost', () => {
    it(
      `should set url to services if type is 'service'`,
      async(() => {
        apiService.getPost('service', null).subscribe();

        mockHttp.expectOne(apiService.services);
      })
    );

    it(
      `should set url to caseStudies if type is 'work'`,
      async(() => {
        apiService.getPost('work', null).subscribe();

        mockHttp.expectOne(apiService.caseStudies);
      })
    );

    it(
      'should return service post',
      async(() => {
        apiService
          .getPost('service', 'service-2')
          .subscribe(res => expect(res.title).toBe('Service 2'));

        mockHttp.expectOne(apiService.services).flush(services);
      })
    );

    it(
      'should return case study post',
      async(() => {
        apiService
          .getPost('work', 'case-study-1')
          .subscribe(res => expect(res.title).toBe('Case Study 1'));

        mockHttp.expectOne(apiService.caseStudies).flush(caseStudies);
      })
    );

    it(
      'should return null if no type arg',
      async(() => {
        apiService
          .getPost(null, 'service-1')
          .subscribe(res => expect(res).toBe(null));
      })
    );

    it(
      'should return undefined if no id arg',
      async(() => {
        apiService
          .getPost('work', null)
          .subscribe(res => expect(res).toBe(undefined));

        mockHttp.expectOne(apiService.caseStudies).flush(caseStudies);
      })
    );

    it(
      'should return undefined on last retry error',
      async(() => {
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
      })
    );
  });
});

function createService() {
  apiService = TestBed.get(ApiService);
  mockHttp = TestBed.get(HttpTestingController);
}
