import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';

import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import {
  MockMetaService,
  MockApiService,
  ActivatedRouteStub,
  Router,
  RouterStub,
  Data
} from 'testing';
import { MetaService, ApiService } from 'shared';
import { Post } from 'api';
import { PostResolver } from './post-resolver.service';

let activatedRoute: ActivatedRouteStub;
let postResolver: PostResolver;
let metaService: MetaService;
let apiService: ApiService;
let router: Router;

describe('PostResolver', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      providers: [
        PostResolver,
        { provide: Router, useClass: RouterStub },
        { provide: MetaService, useClass: MockMetaService },
        { provide: ApiService, useClass: MockApiService }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => createService()));

  it('should create service', () => {
    expect(apiService).toBeTruthy();
  });

  it('should call `ApiService` `getPost`', () => {
    activatedRoute.testParamMap = { type: 'service', id: 'service-1' };
    postResolver.resolve(activatedRoute.snapshot as any);

    expect(apiService.getPost).toHaveBeenCalled();
  });

  describe('`type`', () => {
    describe('has `ActivatedRouteSnapshot` `paramMap.type`', () => {
      it('should call `ApiService` `getPost` with `type` arg as `ActivatedRouteSnapshot` `paramMap.type`', () => {
        activatedRoute.testParamMap = { type: 'service' };
        postResolver.resolve(activatedRoute.snapshot as any);

        expect(apiService.getPost).toHaveBeenCalledWith(
          'service',
          jasmine.anything()
        );
      });
    });

    describe('no `ActivatedRouteSnapshot` `paramMap.type`', () => {
      it('should call `ApiService` `getPost` with `type` arg as `ActivatedRouteSnapshot` `parent.routeConfig.path`', () => {
        activatedRoute.testParamMap = {};
        activatedRoute.parent.routeConfig.path = 'parent-path';
        postResolver.resolve(activatedRoute.snapshot as any);

        expect(apiService.getPost).toHaveBeenCalledWith(
          'parent-path',
          jasmine.anything()
        );
      });
    });

    describe('no `ActivatedRouteSnapshot` `paramMap.type` or `parent.routeConfig.path`', () => {
      it('should call `ApiService` `getPost` with `type` arg as ``', () => {
        activatedRoute.testParamMap = {};
        activatedRoute.parent.routeConfig.path = undefined as any;
        postResolver.resolve(activatedRoute.snapshot as any);

        expect(apiService.getPost).toHaveBeenCalledWith('', jasmine.anything());
      });
    });
  });

  describe('`id`', () => {
    it('should call `ApiService` `getPost` with `id` arg if `id`', () => {
      activatedRoute.testParamMap = { id: 'service-1' };
      postResolver.resolve(activatedRoute.snapshot as any);

      expect(apiService.getPost).toHaveBeenCalledWith(
        jasmine.anything(),
        'service-1'
      );
    });

    it('should call `ApiService` `getPost` with `` arg if no `id`', () => {
      activatedRoute.testParamMap = {};
      postResolver.resolve(activatedRoute.snapshot as any);

      expect(apiService.getPost).toHaveBeenCalledWith(jasmine.anything(), '');
    });
  });

  describe('Has `post`', () => {
    beforeEach(
      () => (activatedRoute.testParamMap = { type: 'service', id: 'service-1' })
    );

    it('should call `MetaService` `setMetaTags`', () => {
      (postResolver.resolve(activatedRoute.snapshot as any) as Observable<Post>)
        .pipe(timeout(100))
        .subscribe(_ => expect(metaService.setMetaTags).toHaveBeenCalled());
    });

    it('should call `MetaService` `setMetaTags` with args', () => {
      (postResolver.resolve(activatedRoute.snapshot as any) as Observable<Post>)
        .pipe(timeout(100))
        .subscribe(_ =>
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

    it('should not call `Router` `navigate`', () => {
      (postResolver.resolve(activatedRoute.snapshot as any) as Observable<Post>)
        .pipe(timeout(100))
        .subscribe(_ => expect(router.navigate).not.toHaveBeenCalled());
    });

    it('should return `post`', () => {
      (postResolver.resolve(activatedRoute.snapshot as any) as Observable<Post>)
        .pipe(timeout(100))
        .subscribe(res =>
          expect(res).toEqual(Data.Api.getServices('Service 1'))
        );
    });
  });

  describe('No `post`', () => {
    beforeEach(
      () => (activatedRoute.testParamMap = { type: 'test', id: 'test' })
    );

    it('should not call `MetaService` `setMetaTags`', fakeAsync(() => {
      (postResolver.resolve(activatedRoute.snapshot as any) as Observable<Post>)
        .pipe(timeout(100))
        .subscribe();

      tick(100);
      expect(metaService.setMetaTags).not.toHaveBeenCalled();
    }));

    it('should call `Router` `navigate` with `/` arg', fakeAsync(() => {
      (postResolver.resolve(activatedRoute.snapshot as any) as Observable<Post>)
        .pipe(timeout(100))
        .subscribe();

      tick(100);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    }));
  });
});

function createService() {
  postResolver = TestBed.get(PostResolver);
  metaService = TestBed.get(MetaService);
  apiService = TestBed.get(ApiService);
  router = TestBed.get(Router);
}
