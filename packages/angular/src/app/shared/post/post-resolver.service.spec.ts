import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Observable } from 'rxjs';
import {
  RouterTestingModule,
  MockMetaService,
  MockApiService,
  MockApiPipe,
  ActivatedRouteStub,
  Data
} from 'testing';
import { MetaService, ApiService, Api } from 'shared';
import { PostResolver } from './post-resolver.service';
import { PostComponent } from './post.component';

let activatedRoute: ActivatedRouteStub;
let postResolver: PostResolver;
let metaService: MetaService;
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
        { provide: MetaService, useClass: MockMetaService },
        { provide: ApiService, useClass: MockApiService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createService()));

  it('should call ApiService getPost', () => {
    activatedRoute.testParamMap = { type: 'service', id: 'service-1' };
    postResolver.resolve(activatedRoute.snapshot as any);

    expect(apiService.getPost).toHaveBeenCalled();
  });

  it('should call ApiService getPost with id arg as id param', () => {
    activatedRoute.testParamMap = { type: 'service', id: 'service-1' };
    postResolver.resolve(activatedRoute.snapshot as any);

    expect(apiService.getPost).toHaveBeenCalledWith(
      jasmine.any(String),
      'service-1'
    );
  });

  it('should call ApiService getPost with type arg as type param if exists', () => {
    activatedRoute.testParamMap = { type: 'service', id: 'service-1' };
    postResolver.resolve(activatedRoute.snapshot as any);

    expect(apiService.getPost).toHaveBeenCalledWith(
      'service',
      jasmine.any(String)
    );
  });

  it('should call ApiService getPost with type arg as parent path if type param doesnt exist', () => {
    activatedRoute.testParamMap = { id: 'case-study-1' };
    activatedRoute.parent.routeConfig.path = 'parent-path';
    postResolver.resolve(activatedRoute.snapshot as any);

    expect(apiService.getPost).toHaveBeenCalledWith(
      'parent-path',
      jasmine.any(String)
    );
  });

  it('should call MetaService setMetaTags with post args if exists', () => {
    activatedRoute.testParamMap = { type: 'service', id: 'service-1' };

    (postResolver.resolve(activatedRoute.snapshot as any) as Observable<
      Api.Post
    >).subscribe(_ =>
      expect(metaService.setMetaTags).toHaveBeenCalledWith({
        type: 'article',
        title: 'Service 1',
        description: 'Service 1 intro',
        url: 'service/service-1',
        image:
          'https://res.cloudinary.com/dv8oeiozq/image/upload/w_2400,h_ih,c_limit,q_auto,f_auto/service-1'
      })
    );
  });

  it('should return service post if exists', () => {
    activatedRoute.testParamMap = { type: 'service', id: 'service-1' };

    (postResolver.resolve(activatedRoute.snapshot as any) as Observable<
      Api.Post
    >).subscribe(post =>
      expect(post).toEqual(Data.Api.getServices('Service 1'))
    );
  });

  it('should return case study post if exists', () => {
    activatedRoute.testParamMap = { id: 'case-study-1' };
    activatedRoute.parent.routeConfig.path = 'work';

    (postResolver.resolve(activatedRoute.snapshot as any) as Observable<
      Api.Post
    >).subscribe(post =>
      expect(post).toEqual(Data.Api.getCaseStudies('Case Study 1'))
    );
  });

  it('should navigate to / if no matching post', fakeAsync(() => {
    activatedRoute.testParamMap = { type: 'service', id: 'service-nope' };
    (postResolver.resolve(activatedRoute.snapshot as any) as Observable<
      Api.Post
    >).subscribe();
    tick();

    return expect(location.path()).toBe('/');
  }));

  it('should not navigate to / if matching post', fakeAsync(() => {
    activatedRoute.testParamMap = { type: 'service', id: 'service-1' };
    (postResolver.resolve(activatedRoute.snapshot as any) as Observable<
      Api.Post
    >).subscribe();
    tick();

    return expect(location.path()).toBe('');
  }));
});

function createService() {
  postResolver = TestBed.get(PostResolver);
  metaService = TestBed.get(MetaService);
  apiService = TestBed.get(ApiService);
  location = TestBed.get(Location);
}
