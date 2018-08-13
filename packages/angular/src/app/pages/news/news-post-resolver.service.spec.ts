import { TestBed, async } from '@angular/core/testing';
import {
  RouterTestingModule,
  MockMetaService,
  MockPrismicService,
  ActivatedRouteStub
} from 'testing';

import { of } from 'rxjs';

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
    activatedRoute.testParamMap = { id: 'post-1' };
    activatedRoute.testQueryParamMap = {};
    newsPostResolver.resolve(<any>activatedRoute.snapshot);

    expect(prismicService.getPost).toHaveBeenCalled();
  });

  it(`should call PrismicService getPost with 'uid' and id args`, () => {
    activatedRoute.testParamMap = { id: 'post-1' };
    activatedRoute.testQueryParamMap = {};

    newsPostResolver.resolve(<any>activatedRoute.snapshot);

    expect(prismicService.getPost).toHaveBeenCalledWith('uid', 'post-1');
  });

  it('should call MetaService setMetaTags with post args', () => {
    activatedRoute.testParamMap = { id: 'post-1' };
    activatedRoute.testQueryParamMap = {};

    newsPostResolver.resolve(<any>activatedRoute.snapshot).subscribe(_ =>
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
    activatedRoute.testParamMap = { id: 'post-1' };
    activatedRoute.testQueryParamMap = {};

    const post: Prismic.Post = {
      alternate_languages: null,
      data: {
        title: null,
        description: 'Post 1 description',
        image: {
          dimensions: null,
          url: 'post-1',
          lg: {
            dimensions: null,
            url: 'post-1'
          },
          md: {
            dimensions: null,
            url: 'post-1'
          },
          sm: {
            dimensions: null,
            url: 'post-1'
          },
          xs: {
            dimensions: null,
            url: 'post-1'
          },
          proxy: {
            dimensions: null,
            url: 'post-1'
          }
        },
        body: null
      },
      first_publication_date: null,
      href: null,
      id: null,
      last_publication_date: null,
      slugs: null,
      tags: null,
      type: null,
      uid: 'post-1'
    };
    (prismicService.getPost as jasmine.Spy).and.returnValue(of(post));

    newsPostResolver.resolve(<any>activatedRoute.snapshot).subscribe(_ =>
      expect(metaService.setMetaTags).toHaveBeenCalledWith({
        type: 'article',
        description: 'Post 1 description',
        url: 'news/post-1',
        image: 'post-1'
      })
    );
  });

  it('should not call MetaService setMetaTags with `meta.description` arg if no description', () => {
    activatedRoute.testParamMap = { id: 'post-1' };
    activatedRoute.testQueryParamMap = {};

    const post: Prismic.Post = {
      alternate_languages: null,
      data: {
        title: [{ spans: null, text: 'Post 1', type: 'h1' }],
        description: null,
        image: {
          dimensions: null,
          url: 'post-1',
          lg: {
            dimensions: null,
            url: 'post-1'
          },
          md: {
            dimensions: null,
            url: 'post-1'
          },
          sm: {
            dimensions: null,
            url: 'post-1'
          },
          xs: {
            dimensions: null,
            url: 'post-1'
          },
          proxy: {
            dimensions: null,
            url: 'post-1'
          }
        },
        body: null
      },
      first_publication_date: null,
      href: null,
      id: null,
      last_publication_date: null,
      slugs: null,
      tags: null,
      type: null,
      uid: 'post-1'
    };
    (prismicService.getPost as jasmine.Spy).and.returnValue(of(post));

    newsPostResolver.resolve(<any>activatedRoute.snapshot).subscribe(_ =>
      expect(metaService.setMetaTags).toHaveBeenCalledWith({
        type: 'article',
        title: 'Post 1',
        url: 'news/post-1',
        image: 'post-1'
      })
    );
  });

  it('should not call MetaService setMetaTags with `meta.image` arg if no image', () => {
    activatedRoute.testParamMap = { id: 'post-1' };
    activatedRoute.testQueryParamMap = {};

    const post: Prismic.Post = {
      alternate_languages: null,
      data: {
        title: [{ spans: null, text: 'Post 1', type: 'h1' }],
        description: 'Post 1 description',
        image: null,
        body: null
      },
      first_publication_date: null,
      href: null,
      id: null,
      last_publication_date: null,
      slugs: null,
      tags: null,
      type: null,
      uid: 'post-1'
    };
    (prismicService.getPost as jasmine.Spy).and.returnValue(of(post));

    newsPostResolver.resolve(<any>activatedRoute.snapshot).subscribe(_ =>
      expect(metaService.setMetaTags).toHaveBeenCalledWith({
        type: 'article',
        title: 'Post 1',
        description: 'Post 1 description',
        url: 'news/post-1'
      })
    );
  });

  it(`should call PrismicService getPost with 'id' and documentId args if id is 'preview' and has token and documentId`, () => {
    activatedRoute.testParamMap = { id: 'preview' };
    activatedRoute.testQueryParamMap = { token: 'abc', documentId: '123' };

    newsPostResolver.resolve(<any>activatedRoute.snapshot);

    expect(prismicService.getPost).toHaveBeenCalledWith('id', '123');
  });
});

function createService() {
  newsPostResolver = TestBed.get(NewsPostResolver);
  metaService = TestBed.get(MetaService);
  prismicService = TestBed.get(PrismicService);
}
