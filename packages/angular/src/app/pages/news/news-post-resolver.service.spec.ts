import { TestBed, async } from '@angular/core/testing';

import {
  RouterTestingModule,
  MockMetaService,
  MockPrismicService,
  ActivatedRouteStub
} from 'testing';
import { MetaService, PrismicService } from 'shared';
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

    newsPostResolver
      .resolve(<any>activatedRoute.snapshot)
      .subscribe(_ =>
        expect(metaService.setMetaTags).toHaveBeenCalledWith({
          type: 'article',
          title: 'Post 1',
          url: 'news/post-1',
          image: 'post-1'
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
