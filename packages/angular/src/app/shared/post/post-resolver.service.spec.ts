import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {
  RouterTestingModule,
  MockApiService,
  MockApiPipe,
  ActivatedRouteStub,
  Data
} from 'testing';
import { ApiService } from 'shared';
import { PostResolver } from './post-resolver.service';
import { PostComponent } from './post.component';

let activatedRoute: ActivatedRouteStub;
let postResolver: PostResolver;
let apiService: ApiService;
let location: Location;

describe('PostResolver', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '**', component: PostComponent }
        ])
      ],
      declarations: [PostComponent, MockApiPipe],
      providers: [
        PostResolver,
        { provide: ApiService, useClass: MockApiService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createService()));

  it('should call ApiService getPost', () => {
    activatedRoute.testParamMap = { type: 'service', id: 'service-1' };
    postResolver.resolve(<any>activatedRoute.snapshot);

    expect(apiService.getPost).toHaveBeenCalled();
  });

  it('should call ApiService getPost with id arg as id param', () => {
    activatedRoute.testParamMap = { type: 'service', id: 'service-1' };
    postResolver.resolve(<any>activatedRoute.snapshot);

    expect(apiService.getPost).toHaveBeenCalledWith(
      jasmine.any(String),
      'service-1'
    );
  });

  it('should call ApiService getPost with type arg as type param if exists', () => {
    activatedRoute.testParamMap = { type: 'service', id: 'service-1' };
    postResolver.resolve(<any>activatedRoute.snapshot);

    expect(apiService.getPost).toHaveBeenCalledWith(
      'service',
      jasmine.any(String)
    );
  });

  it('should call ApiService getPost with type arg as parent path if type param doesnt exist', () => {
    activatedRoute.testParamMap = { id: 'case-study-1' };
    activatedRoute.parent.routeConfig.path = 'parent-path';
    postResolver.resolve(<any>activatedRoute.snapshot);

    expect(apiService.getPost).toHaveBeenCalledWith(
      'parent-path',
      jasmine.any(String)
    );
  });

  it('should return service post if exists', () => {
    activatedRoute.testParamMap = { type: 'service', id: 'service-1' };

    postResolver
      .resolve(<any>activatedRoute.snapshot)
      .subscribe(post => expect(post).toEqual(Data.Api.services[0]));
  });

  it('should return case study post if exists', () => {
    activatedRoute.testParamMap = { id: 'case-study-1' };
    activatedRoute.parent.routeConfig.path = 'work';

    postResolver
      .resolve(<any>activatedRoute.snapshot)
      .subscribe(post => expect(post).toEqual(Data.Api.caseStudies[0]));
  });

  it('should return null if no matching post', () => {
    activatedRoute.testParamMap = { type: 'service', id: 'service-nope' };

    postResolver
      .resolve(<any>activatedRoute.snapshot)
      .subscribe(post => expect(post).toBeNull());
  });

  it('should return null if no matching post', () => {
    activatedRoute.testParamMap = { type: 'service', id: 'service-nope' };

    postResolver
      .resolve(<any>activatedRoute.snapshot)
      .subscribe(post => expect(post).toBeNull());
  });

  it(
    'should navigate to / if no matching post',
    fakeAsync(() => {
      activatedRoute.testParamMap = { type: 'service', id: 'service-nope' };
      postResolver.resolve(<any>activatedRoute.snapshot).subscribe();
      tick();

      return expect(location.path()).toBe('/');
    })
  );

  it(
    'should not navigate to / if matching post',
    fakeAsync(() => {
      activatedRoute.testParamMap = { type: 'service', id: 'service-1' };
      postResolver.resolve(<any>activatedRoute.snapshot).subscribe();
      tick();

      return expect(location.path()).toBe('');
    })
  );
});

function createService() {
  postResolver = TestBed.get(PostResolver);
  apiService = TestBed.get(ApiService);
  location = TestBed.get(Location);
}
