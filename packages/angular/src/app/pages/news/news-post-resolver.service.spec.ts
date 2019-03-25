import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import {
  RouterTestingModule,
  MockMetaService,
  MockPrismicService,
  ActivatedRouteStub,
  Data
} from 'testing';

import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

import { MetaService, PrismicService } from 'shared';
import { Post } from 'prismic';
import { createMetaTags } from './news-post-resolver.helpers';
import { NewsPostResolver } from './news-post-resolver.service';

let activatedRoute: ActivatedRouteStub;
let newsPostResolver: NewsPostResolver;
let metaService: MetaService;
let prismicService: PrismicService;

jest.mock('./news-post-resolver.helpers', () => ({
  createMetaTags: jest.fn().mockReturnValue('createMetaTagsReturn')
}));

beforeEach(jest.clearAllMocks);

describe('NewsPostResolver', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        NewsPostResolver,
        { provide: MetaService, useClass: MockMetaService },
        { provide: PrismicService, useClass: MockPrismicService }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => createService()));

  it('should create service', () => {
    expect(prismicService).toBeTruthy();
  });

  it('should call `PrismicService` `getPost` with `uid` arg if `uid`', () => {
    activatedRoute.testParamMap = { uid: 'post-1' };
    newsPostResolver.resolve(activatedRoute.snapshot as any);

    expect(prismicService.getPost).toHaveBeenCalledWith('post-1');
  });

  it('should call `PrismicService` `getPost` with `` arg if no `uid`', () => {
    activatedRoute.testParamMap = {};
    newsPostResolver.resolve(activatedRoute.snapshot as any);

    expect(prismicService.getPost).toHaveBeenCalledWith('');
  });

  describe('has post', () => {
    beforeEach(() => (activatedRoute.testParamMap = { uid: 'post-1' }));

    it('should call `createMetaTags` with `post` arg', () => {
      (newsPostResolver.resolve(activatedRoute.snapshot as any) as Observable<
        Post
      >)
        .pipe(timeout(100))
        .subscribe(_ =>
          expect(createMetaTags).toHaveBeenCalledWith(
            Data.Prismic.getPosts('post-1')
          )
        );
    });

    it('should call `MetaService` `setMetaTags` with `createMetaTags` return arg', () => {
      (newsPostResolver.resolve(activatedRoute.snapshot as any) as Observable<
        Post
      >)
        .pipe(timeout(100))
        .subscribe(_ =>
          expect(metaService.setMetaTags).toHaveBeenCalledWith(
            'createMetaTagsReturn'
          )
        );
    });

    it('should return `post`', () => {
      (newsPostResolver.resolve(activatedRoute.snapshot as any) as Observable<
        Post
      >)
        .pipe(timeout(100))
        .subscribe(post =>
          expect(post).toEqual(Data.Prismic.getPosts('post-1'))
        );
    });
  });

  describe('no post', () => {
    beforeEach(() => (activatedRoute.testParamMap = { uid: 'no-post' }));

    it('should not call `createMetaTags`', fakeAsync(() => {
      (newsPostResolver.resolve(activatedRoute.snapshot as any) as Observable<
        Post
      >)
        .pipe(timeout(100))
        .subscribe();

      tick(100);
      expect(createMetaTags).not.toHaveBeenCalled();
    }));

    it('should not call `MetaService` `setMetaTags`', fakeAsync(() => {
      (newsPostResolver.resolve(activatedRoute.snapshot as any) as Observable<
        Post
      >)
        .pipe(timeout(100))
        .subscribe();

      tick(100);
      expect(metaService.setMetaTags).not.toHaveBeenCalled();
    }));
  });
});

function createService() {
  newsPostResolver = TestBed.get(NewsPostResolver);
  metaService = TestBed.get(MetaService);
  prismicService = TestBed.get(PrismicService);
}
