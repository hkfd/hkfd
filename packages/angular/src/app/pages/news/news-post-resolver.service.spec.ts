import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import {
  RouterTestingModule,
  MockMetaService,
  MockPrismicService,
  ActivatedRouteStub,
  Data
} from 'testing';

import { Observable, of } from 'rxjs';
import { timeout } from 'rxjs/operators';

import { MetaService, PrismicService } from 'shared';
import { Post } from 'prismic';
import { NewsPostResolver } from './news-post-resolver.service';

let activatedRoute: ActivatedRouteStub;
let newsPostResolver: NewsPostResolver;
let metaService: MetaService;
let prismicService: PrismicService;

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

    it('should call `MetaService` `setMetaTags` with post args', () => {
      (newsPostResolver.resolve(activatedRoute.snapshot as any) as Observable<
        Post
      >)
        .pipe(timeout(100))
        .subscribe(_ =>
          expect(metaService.setMetaTags).toHaveBeenCalledWith({
            type: 'article',
            title: 'Post 1',
            description: 'Post 1 description',
            url: 'news/post-1',
            image: 'post-1'
          })
        );
    });

    it('should not call `MetaService` `setMetaTags` with `meta.title` arg if no `title`', () => {
      const post: Post = {
        ...Data.Prismic.getPost(),
        data: { ...Data.Prismic.getPost().data, title: null as any }
      };
      (prismicService.getPost as jest.Mock).mockReturnValue(of(post));

      (newsPostResolver.resolve(activatedRoute.snapshot as any) as Observable<
        Post
      >)
        .pipe(timeout(100))
        .subscribe(_ =>
          expect(metaService.setMetaTags).toHaveBeenCalledWith({
            type: 'article',
            description: 'Post 1 description',
            url: 'news/post-1',
            image: 'post-1'
          })
        );
    });

    it('should not call `MetaService` `setMetaTags` with `meta.description` arg if no `description`', () => {
      const post: Post = {
        ...Data.Prismic.getPost(),
        data: { ...Data.Prismic.getPost().data, description: null as any }
      };
      (prismicService.getPost as jest.Mock).mockReturnValue(of(post));

      (newsPostResolver.resolve(activatedRoute.snapshot as any) as Observable<
        Post
      >)
        .pipe(timeout(100))
        .subscribe(_ =>
          expect(metaService.setMetaTags).toHaveBeenCalledWith({
            type: 'article',
            title: 'Post 1',
            url: 'news/post-1',
            image: 'post-1'
          })
        );
    });

    it('should not call `MetaService` `setMetaTags` with `meta.image` arg if no `image`', () => {
      const post: Post = {
        ...Data.Prismic.getPost(),
        data: { ...Data.Prismic.getPost().data, image: null as any }
      };
      (prismicService.getPost as jest.Mock).mockReturnValue(of(post));

      (newsPostResolver.resolve(activatedRoute.snapshot as any) as Observable<
        Post
      >)
        .pipe(timeout(100))
        .subscribe(_ =>
          expect(metaService.setMetaTags).toHaveBeenCalledWith({
            type: 'article',
            title: 'Post 1',
            description: 'Post 1 description',
            url: 'news/post-1'
          })
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
