import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Observable } from 'rxjs';
import {
  RouterTestingModule,
  MockMetaService,
  MockApiService,
  MockApiPipe,
  ActivatedRouteStub
} from 'testing';
import { MetaService, ApiService, Api } from 'shared';
import { CareerResolver } from './career-resolver.service';
import { CareersComponent } from './careers.component';

let activatedRoute: ActivatedRouteStub;
let careerResolver: CareerResolver;
let metaService: MetaService;
let apiService: ApiService;
let location: Location;

describe('CareerResolver', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'careers', component: CareersComponent }
        ])
      ],
      declarations: [CareersComponent, MockApiPipe],
      providers: [
        CareerResolver,
        { provide: MetaService, useClass: MockMetaService },
        { provide: ApiService, useClass: MockApiService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createService()));

  it('should call ApiService getCareer', () => {
    activatedRoute.testParamMap = { id: 'career-1' };
    activatedRoute.testQueryParamMap = {};
    careerResolver.resolve(activatedRoute.snapshot as any);

    expect(apiService.getCareer).toHaveBeenCalled();
  });

  it('should call ApiService getCareer with id arg', () => {
    activatedRoute.testParamMap = { id: 'career-1' };
    activatedRoute.testQueryParamMap = {};
    careerResolver.resolve(activatedRoute.snapshot as any);

    expect(apiService.getCareer).toHaveBeenCalledWith('career-1');
  });

  it('should call MetaService setMetaTags with career args if matching career', () => {
    activatedRoute.testParamMap = { id: 'career-1' };
    activatedRoute.testQueryParamMap = {};

    (careerResolver.resolve(activatedRoute.snapshot as any) as Observable<
      Api.Career
    >).subscribe(_ =>
      expect(metaService.setMetaTags).toHaveBeenCalledWith({
        type: 'article',
        title: 'Career 1',
        description: '£0',
        url: 'careers/career-1'
      })
    );
  });

  it('should return career if matching career', async(() => {
    activatedRoute.testParamMap = { id: 'career-1' };
    activatedRoute.testQueryParamMap = {};

    (careerResolver.resolve(activatedRoute.snapshot as any) as Observable<
      Api.Career
    >).subscribe(career => expect(career.title).toBe('Career 1'));
  }));

  it('should navigate to /careers if no matching career', fakeAsync(() => {
    activatedRoute.testParamMap = { id: 'no-career' };
    activatedRoute.testQueryParamMap = {};
    (careerResolver.resolve(activatedRoute.snapshot as any) as Observable<
      Api.Career
    >).subscribe();
    tick();

    return expect(location.path()).toBe('/careers');
  }));

  it('should not navigate to /careers if matching career', fakeAsync(() => {
    activatedRoute.testParamMap = { id: 'career-1' };
    activatedRoute.testQueryParamMap = {};
    (careerResolver.resolve(activatedRoute.snapshot as any) as Observable<
      Api.Career
    >).subscribe();
    tick();

    return expect(location.path()).toBe('');
  }));
});

function createService() {
  careerResolver = TestBed.get(CareerResolver);
  metaService = TestBed.get(MetaService);
  apiService = TestBed.get(ApiService);
  location = TestBed.get(Location);
}
