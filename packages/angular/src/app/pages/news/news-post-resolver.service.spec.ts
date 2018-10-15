import { TestBed, async } from '@angular/core/testing';
import {
  RouterTestingModule,
  MockMetaService,
  MockPrismicService,
  ActivatedRouteStub,
  Data
} from 'testing';

import { Observable, of } from 'rxjs';

import { MetaService, PrismicService, Prismic } from 'shared';
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

  it('should call PrismicService getPost', () => {
    activatedRoute.testParamMap = { uid: 'post-1' };
    activatedRoute.testQueryParamMap = {};
    newsPostResolver.resolve(<any>activatedRoute.snapshot);

    expect(prismicService.getPost).toHaveBeenCalled();
  });

  it('should call PrismicService getPost with `uid` arg', () => {
    activatedRoute.testParamMap = { uid: 'post-1' };
    activatedRoute.testQueryParamMap = {};

    newsPostResolver.resolve(<any>activatedRoute.snapshot);

    expect(prismicService.getPost).toHaveBeenCalledWith('post-1');
  });

  it('should call MetaService setMetaTags with post args', () => {
    activatedRoute.testParamMap = { uid: 'post-1' };
    activatedRoute.testQueryParamMap = {};

    (newsPostResolver.resolve(<any>activatedRoute.snapshot) as Observable<
      Prismic.Post
    >).subscribe(_ =>
      expect(metaService.setMetaTags).toHaveBeenCalledWith({
        type: 'article',
        title: 'Post 1',
        description: 'Post 1 description',
        url: 'news/post-1',
        image: 'post-1'
      })
    );
  });

  it('should not call MetaService setMetaTags with `meta.title` arg if no title', () => {
    activatedRoute.testParamMap = { uid: 'post-1' };
    activatedRoute.testQueryParamMap = {};

    const post: Prismic.Post = {
      ...Data.Prismic.post,
      data: { ...Data.Prismic.post.data, title: null as any }
    };
    (prismicService.getPost as jasmine.Spy).and.returnValue(of(post));

    (newsPostResolver.resolve(<any>activatedRoute.snapshot) as Observable<
      Prismic.Post
    >).subscribe(_ =>
      expect(metaService.setMetaTags).toHaveBeenCalledWith({
        type: 'article',
        description: 'Post 1 description',
        url: 'news/post-1',
        image: 'post-1'
      })
    );
  });

  it('should not call MetaService setMetaTags with `meta.description` arg if no description', () => {
    activatedRoute.testParamMap = { uid: 'post-1' };
    activatedRoute.testQueryParamMap = {};

    const post: Prismic.Post = {
      ...Data.Prismic.post,
      data: { ...Data.Prismic.post.data, description: null as any }
    };
    (prismicService.getPost as jasmine.Spy).and.returnValue(of(post));

    (newsPostResolver.resolve(<any>activatedRoute.snapshot) as Observable<
      Prismic.Post
    >).subscribe(_ =>
      expect(metaService.setMetaTags).toHaveBeenCalledWith({
        type: 'article',
        title: 'Post 1',
        url: 'news/post-1',
        image: 'post-1'
      })
    );
  });

  it('should not call MetaService setMetaTags with `meta.image` arg if no image', () => {
    activatedRoute.testParamMap = { uid: 'post-1' };
    activatedRoute.testQueryParamMap = {};

    const post: Prismic.Post = {
      ...Data.Prismic.post,
      data: { ...Data.Prismic.post.data, image: null as any }
    };
    (prismicService.getPost as jasmine.Spy).and.returnValue(of(post));

    (newsPostResolver.resolve(<any>activatedRoute.snapshot) as Observable<
      Prismic.Post
    >).subscribe(_ =>
      expect(metaService.setMetaTags).toHaveBeenCalledWith({
        type: 'article',
        title: 'Post 1',
        description: 'Post 1 description',
        url: 'news/post-1'
      })
    );
  });
});

function createService() {
  newsPostResolver = TestBed.get(NewsPostResolver);
  metaService = TestBed.get(MetaService);
  prismicService = TestBed.get(PrismicService);
}
