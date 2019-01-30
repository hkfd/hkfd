import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import {
  MockMetaService,
  MockApiService,
  ActivatedRouteStub,
  Router,
  RouterStub,
  Data
} from 'testing';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

import { MetaService, ApiService } from 'shared';
import { Career } from 'api';
import { CareerResolver } from './career-resolver.service';

let activatedRoute: ActivatedRouteStub;
let careerResolver: CareerResolver;
let metaService: MetaService;
let apiService: ApiService;
let router: Router;

describe('CareerResolver', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      providers: [
        CareerResolver,
        { provide: Router, useClass: RouterStub },
        { provide: MetaService, useClass: MockMetaService },
        { provide: ApiService, useClass: MockApiService }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => createService()));

  it('should create service', () => {
    expect(careerResolver).toBeTruthy();
  });

  it('should call `ApiService` `getCareer` with `id` arg if `id`', () => {
    activatedRoute.testParamMap = { id: 'career-1' };
    careerResolver.resolve(activatedRoute.snapshot as any);

    expect(apiService.getCareer).toHaveBeenCalledWith('career-1');
  });

  it('should call `ApiService` `getCareer` with `` arg if no `id`', () => {
    activatedRoute.testParamMap = {};
    careerResolver.resolve(activatedRoute.snapshot as any);

    expect(apiService.getCareer).toHaveBeenCalledWith('');
  });

  describe('Has `career`', () => {
    beforeEach(() => (activatedRoute.testParamMap = { id: 'career-1' }));

    it('should call `MetaService` `setMetaTags` with career args', () => {
      (careerResolver.resolve(activatedRoute.snapshot as any) as Observable<
        Career
      >)
        .pipe(timeout(100))
        .subscribe(_ =>
          expect(metaService.setMetaTags).toHaveBeenCalledWith({
            type: 'article',
            title: 'Career 1',
            description: '£0',
            url: 'careers/career-1'
          })
        );
    });

    it('should not call `Router` `navigate`', () => {
      (careerResolver.resolve(activatedRoute.snapshot as any) as Observable<
        Career
      >)
        .pipe(timeout(100))
        .subscribe(_ => expect(router.navigate).not.toHaveBeenCalled());
    });

    it('should return `career`', () => {
      (careerResolver.resolve(activatedRoute.snapshot as any) as Observable<
        Career
      >)
        .pipe(timeout(100))
        .subscribe(career =>
          expect(career).toEqual(Data.Api.getCareers('Career 1'))
        );
    });
  });

  describe('No `career`', () => {
    beforeEach(() => (activatedRoute.testParamMap = { id: 'no-career' }));

    it('should not call `MetaService` `setMetaTags`', fakeAsync(() => {
      (careerResolver.resolve(activatedRoute.snapshot as any) as Observable<
        Career
      >)
        .pipe(timeout(100))
        .subscribe();

      tick(100);
      expect(metaService.setMetaTags).not.toHaveBeenCalled();
    }));

    it('should call `Router` `navigate` with `[/careers]` arg', fakeAsync(() => {
      (careerResolver.resolve(activatedRoute.snapshot as any) as Observable<
        Career
      >)
        .pipe(timeout(100))
        .subscribe();

      tick(100);
      expect(router.navigate).toHaveBeenCalledWith(['/careers']);
    }));
  });
});

function createService() {
  careerResolver = TestBed.get(CareerResolver);
  metaService = TestBed.get(MetaService);
  apiService = TestBed.get(ApiService);
  router = TestBed.get(Router);
}
