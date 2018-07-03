import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {
  RouterTestingModule,
  MockApiService,
  MockApiPipe,
  ActivatedRouteStub
} from 'testing';
import { ApiService } from 'shared';
import { CareerResolver } from './career-resolver.service';
import { CareersComponent } from './careers.component';

let activatedRoute: ActivatedRouteStub;
let careerResolver: CareerResolver;
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
        { provide: ApiService, useClass: MockApiService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createService()));

  it('should call ApiService getCareer', () => {
    activatedRoute.testParamMap = { id: 'career-1' };
    activatedRoute.testQueryParamMap = {};
    careerResolver.resolve(<any>activatedRoute.snapshot);

    expect(apiService.getCareer).toHaveBeenCalled();
  });

  it('should call ApiService getCareer with id arg', () => {
    activatedRoute.testParamMap = { id: 'career-1' };
    activatedRoute.testQueryParamMap = {};
    careerResolver.resolve(<any>activatedRoute.snapshot);

    expect(apiService.getCareer).toHaveBeenCalledWith('career-1');
  });

  it('should return career if matching career', async(() => {
    activatedRoute.testParamMap = { id: 'career-1' };
    activatedRoute.testQueryParamMap = {};

    careerResolver
      .resolve(<any>activatedRoute.snapshot)
      .subscribe(career => expect(career.title).toBe('Career 1'));
  }));

  it('should return null if no matching career', async(() => {
    activatedRoute.testParamMap = { id: 'no-career' };
    activatedRoute.testQueryParamMap = {};

    careerResolver
      .resolve(<any>activatedRoute.snapshot)
      .subscribe(career => expect(career).toBe(null));
  }));

  it('should navigate to /careers if no matching career', async(() => {
    activatedRoute.testParamMap = { id: 'no-career' };
    activatedRoute.testQueryParamMap = {};
    careerResolver.resolve(<any>activatedRoute.snapshot).subscribe();

    location.subscribe(location => expect(location.url).toBe('/careers'));
  }));

  it('should not navigate to /careers if matching career', async(() => {
    activatedRoute.testParamMap = { id: 'career-1' };
    activatedRoute.testQueryParamMap = {};
    careerResolver.resolve(<any>activatedRoute.snapshot).subscribe();

    location.subscribe(location => expect(location).toBeUndefined());
  }));
});

function createService() {
  careerResolver = TestBed.get(CareerResolver);
  apiService = TestBed.get(ApiService);
  location = TestBed.get(Location);
}
