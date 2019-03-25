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
import { MetaService, ApiService, Post } from 'shared';
import { isKnownPostType, createMetaTags } from './post-resolver.helpers';
import { PostResolver } from './post-resolver.service';

let activatedRoute: ActivatedRouteStub;
let postResolver: PostResolver;
let metaService: MetaService;
let apiService: ApiService;
let router: Router;

jest.mock('./post-resolver.helpers', () => ({
  isKnownPostType: jest.fn().mockReturnValue(true),
  createMetaTags: jest.fn().mockReturnValue('createMetaTagsReturn')
}));

beforeEach(jest.clearAllMocks);

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

  it('should call `isKnownPostType` with `type` arg', () => {
    activatedRoute.testParamMap = { type: 'service', id: 'service-1' };
    postResolver.resolve(activatedRoute.snapshot as any);

    expect(isKnownPostType).toHaveBeenCalledWith('service');
  });

  it('should call `ApiService` `getPost`', () => {
    activatedRoute.testParamMap = { type: 'service', id: 'service-1' };
    postResolver.resolve(activatedRoute.snapshot as any);

    expect(apiService.getPost).toHaveBeenCalled();
  });

  describe('`type`', () => {
    describe('Exists', () => {
      describe('Is `PostType`', () => {
        beforeEach(() =>
          ((isKnownPostType as any) as jest.Mock).mockReturnValue(true)
        );

        describe('has `ActivatedRouteSnapshot` `paramMap.type`', () => {
          it('should call `ApiService` `getPost` with `type` arg as `ActivatedRouteSnapshot` `paramMap.type`', () => {
            activatedRoute.testParamMap = {
              id: 'id',
              type: 'service'
            };
            postResolver.resolve(activatedRoute.snapshot as any);

            expect(apiService.getPost).toHaveBeenCalledWith(
              'service',
              jasmine.anything()
            );
          });
        });

        describe('no `ActivatedRouteSnapshot` `paramMap.type`', () => {
          it('should call `ApiService` `getPost` with `type` arg as `ActivatedRouteSnapshot` `parent.routeConfig.path`', () => {
            activatedRoute.testParamMap = { id: 'id' };
            activatedRoute.parent.routeConfig.path = 'parent-path';
            postResolver.resolve(activatedRoute.snapshot as any);

            expect(apiService.getPost).toHaveBeenCalledWith(
              'parent-path',
              jasmine.anything()
            );
          });
        });
      });

      describe('Is not `PostType`', () => {
        beforeEach(() =>
          ((isKnownPostType as any) as jest.Mock).mockReturnValue(false)
        );

        it('should call `Router` `navigate` with route arg', fakeAsync(() => {
          activatedRoute.testParamMap = {
            id: 'id',
            type: 'service'
          };
          (postResolver.resolve(activatedRoute.snapshot as any) as Observable<
            Post
          >)
            .pipe(timeout(100))
            .subscribe();

          tick(100);
          expect(router.navigate).toHaveBeenCalledWith(['/']);
        }));
      });
    });

    describe('Does not exist', () => {
      it('should call `Router` `navigate` with root arg', fakeAsync(() => {
        activatedRoute.testParamMap = {
          id: 'id',
          type: undefined
        };
        (postResolver.resolve(activatedRoute.snapshot as any) as Observable<
          Post
        >)
          .pipe(timeout(100))
          .subscribe();

        tick(100);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      }));
    });
  });

  describe('`id`', () => {
    beforeEach(() =>
      ((isKnownPostType as any) as jest.Mock).mockReturnValue(true)
    );

    it('should call `ApiService` `getPost` with `id` arg if `id`', () => {
      activatedRoute.testParamMap = { id: 'service-1', type: 'service' };
      postResolver.resolve(activatedRoute.snapshot as any);

      expect(apiService.getPost).toHaveBeenCalledWith(
        jasmine.anything(),
        'service-1'
      );
    });

    it('should call `Router` `navigate` with root arg if no `id`', fakeAsync(() => {
      activatedRoute.testParamMap = {
        id: undefined,
        type: 'service'
      };
      (postResolver.resolve(activatedRoute.snapshot as any) as Observable<Post>)
        .pipe(timeout(100))
        .subscribe();

      tick(100);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    }));
  });

  describe('Has `post`', () => {
    beforeEach(
      () => (activatedRoute.testParamMap = { type: 'service', id: 'service-1' })
    );

    it('should call `createMetaTags` with `type`, `id`, and `post` args', () => {
      (postResolver.resolve(activatedRoute.snapshot as any) as Observable<Post>)
        .pipe(timeout(100))
        .subscribe(_ =>
          expect(createMetaTags).toHaveBeenCalledWith(
            'service',
            'service-1',
            Data.Api.getServices('Service 1')
          )
        );
    });

    it('should call `MetaService` `setMetaTags` with `createMetaTags` return arg', () => {
      (postResolver.resolve(activatedRoute.snapshot as any) as Observable<Post>)
        .pipe(timeout(100))
        .subscribe(_ =>
          expect(metaService.setMetaTags).toHaveBeenCalledWith(
            'createMetaTagsReturn'
          )
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

    it('should not call `createMetaTags`', fakeAsync(() => {
      (postResolver.resolve(activatedRoute.snapshot as any) as Observable<Post>)
        .pipe(timeout(100))
        .subscribe();

      tick(100);
      expect(createMetaTags).not.toHaveBeenCalled();
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
