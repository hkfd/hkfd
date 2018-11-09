import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  MockMetaService,
  MockPrismicService,
  MockPrismicPipe,
  StubImageComponent,
  Data
} from 'testing';
import { of } from 'rxjs';

import { MetaService, PrismicService } from 'shared';
import { NewsComponent } from './news.component';

let comp: NewsComponent;
let fixture: ComponentFixture<NewsComponent>;
let metaService: MetaService;
let prismicService: PrismicService;
let prismicPipe: jasmine.Spy;
let richText: RichTextStub;
let page: Page;

describe('NewsComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [NewsComponent, StubImageComponent, MockPrismicPipe],
      providers: [
        { provide: MetaService, useClass: MockMetaService },
        { provide: PrismicService, useClass: MockPrismicService }
      ]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`ngOnInit`', () => {
    it('should call `MetaService` `setMetaTags` with `title` and `url` args', () => {
      expect(metaService.setMetaTags).toHaveBeenCalledWith({
        title: 'News',
        url: 'news'
      });
    });

    it('should call `getPosts` with `true` arg', () => {
      expect(page.getPosts).toHaveBeenCalledWith(true);
    });
  });

  describe('`getPosts`', () => {
    it('should call PrismicService `getPosts` with `onInit` arg', () => {
      comp.getPosts(false);

      expect(prismicService.getPosts).toHaveBeenCalledWith(false);
    });

    it('should set `posts`', () => {
      comp.posts = [];
      comp.getPosts();

      expect(comp.posts).toEqual(Data.Prismic.getPostsResponse().results);
    });

    it('should not overwrite existing `posts`', () => {
      (comp.posts as any) = ['post'];
      comp.getPosts();

      expect(comp.posts).toEqual([
        'post',
        ...Data.Prismic.getPostsResponse().results
      ] as any);
    });

    it('should set `hasNextPage` as true if `next_page`', () => {
      (prismicService.getPosts as jasmine.Spy).and.returnValue(
        of({ results: null, next_page: 'page2' })
      );

      comp.getPosts();
      expect(comp.hasNextPage).toBe(true);
    });

    it('should set `hasNextPage` as false if no `next_page`', () => {
      (prismicService.getPosts as jasmine.Spy).and.returnValue(
        of({ results: null, next_page: null })
      );

      comp.getPosts();
      expect(comp.hasNextPage).toBe(false);
    });
  });

  describe('Template', () => {
    it('should display title', () => {
      expect(page.title.textContent).toBeTruthy();
    });

    describe('Posts', () => {
      it('should be displayed', () => {
        expect(page.posts.length).toBe(
          Data.Prismic.getPostsResponse().results.length
        );
      });

      describe('Post', () => {
        describe('Thumbnail', () => {
          describe('has `image.proxy.url`', () => {
            beforeEach(() => {
              comp.posts = Data.Prismic.getPosts<void>();
              fixture.detectChanges();
            });

            it('should be displayed`', () => {
              expect(page.postThumbnail).toBeTruthy();
            });

            it('should set `ImageComponent` `image` as `data`', () => {
              expect(page.imageComponent.image).toEqual(Data.Prismic.getPosts(
                'post-1'
              ).data as any);
            });

            it('should set `ImageComponent` `full-height` attribute', () => {
              expect(
                page.postThumbnail.hasAttribute('full-height')
              ).toBeTruthy();
            });

            it('should call `PrismicPipe` with `data`', () => {
              expect(prismicPipe).toHaveBeenCalledWith(
                Data.Prismic.getPosts('post-1').data
              );
            });
          });

          describe('no `image.proxy.url`', () => {
            beforeEach(() => {
              (comp.posts[0].data.image.proxy.url as any) = undefined;
              fixture.detectChanges();
            });

            it('should not be displayed', () => {
              expect(page.postThumbnail).toBeFalsy();
            });
          });
        });

        it('should display date', () => {
          expect((page.postDate.textContent as string).trim()).toBe('01/01');
        });

        it('should display title', () => {
          expect(page.postTitle.innerHTML).toBe('Post 1');
        });

        it('should call RichText `asText` with `title`', () => {
          expect(richText.asText).toHaveBeenCalledWith(
            Data.Prismic.getPosts('post-1').data.title
          );
        });

        it('should set href', () => {
          expect(page.posts[0].href).toBe(
            `http://localhost:9876/news/${Data.Prismic.getPosts('post-1').uid}`
          );
        });
      });
    });
  });

  describe('Load more', () => {
    describe('`hasNextPage` is `true`', () => {
      beforeEach(() => {
        comp.hasNextPage = true;
        fixture.detectChanges();
      });

      it('should be displayed', () => {
        expect(page.loadMore).toBeTruthy();
      });

      it('should call `getPosts` on click', () => {
        page.loadMore.click();

        expect(page.getPosts).toHaveBeenCalled();
      });
    });

    describe('`hasNextPage` is `false`', () => {
      beforeEach(() => {
        comp.hasNextPage = false;
        fixture.detectChanges();
      });

      it('should not be displayed', () => {
        expect(page.loadMore).toBeFalsy();
      });
    });
  });
});

class RichTextStub {
  asText: jasmine.Spy;

  constructor() {
    this.asText = spyOn(comp.richText, 'asText').and.callThrough();
  }
}

class Page {
  getPosts: jasmine.Spy;

  get title() {
    return this.query<HTMLHeadingElement>('h1');
  }
  get posts() {
    return this.queryAll<HTMLAnchorElement>('.post');
  }
  get postThumbnail() {
    return this.query<HTMLElement>('.post:first-of-type image-component');
  }
  get postDate() {
    return this.query<HTMLSpanElement>('.post:first-of-type .post-date');
  }
  get postTitle() {
    return this.query<HTMLHeadingElement>('.post:first-of-type h2');
  }
  get loadMore() {
    return this.query<HTMLButtonElement>('#load-more');
  }

  get imageComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubImageComponent)
    );
    return directiveEl.injector.get<StubImageComponent>(StubImageComponent);
  }

  constructor() {
    this.getPosts = spyOn(comp, 'getPosts').and.callThrough();
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(NewsComponent);
  comp = fixture.componentInstance;
  metaService = fixture.debugElement.injector.get<MetaService>(MetaService);
  prismicService = fixture.debugElement.injector.get<PrismicService>(
    PrismicService
  );
  prismicPipe = spyOn(MockPrismicPipe.prototype, 'transform').and.callThrough();
  richText = new RichTextStub();
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
