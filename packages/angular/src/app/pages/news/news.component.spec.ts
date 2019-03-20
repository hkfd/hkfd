import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

import {
  RouterTestingModule,
  MockMetaService,
  MockPrismicService,
  MockNotificationService,
  MockPrismicPipe,
  StubImageComponent,
  Data
} from 'testing';
import { of, Subscription, throwError } from 'rxjs';
import { RichText } from 'prismic-dom';

import { MetaService, PrismicService, NotificationService } from 'shared';
import { NewsComponent } from './news.component';

let comp: NewsComponent;
let fixture: ComponentFixture<NewsComponent>;
let changeDetectorRef: ChangeDetectorRef;
let metaService: MetaService;
let prismicService: PrismicService;
let notificationService: NotificationService;
let page: Page;

beforeEach(jest.clearAllMocks);

describe('NewsComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [NewsComponent, StubImageComponent, MockPrismicPipe],
      providers: [
        { provide: MetaService, useClass: MockMetaService },
        { provide: PrismicService, useClass: MockPrismicService },
        { provide: NotificationService, useClass: MockNotificationService }
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
      expect(comp.getPosts).toHaveBeenCalledWith(true);
    });
  });

  describe('`ngOnDestroy`', () => {
    describe('Has `post$`', () => {
      beforeEach(() => (comp.post$ = new Subscription()));

      it('should call `post$` `unsubscribe`', () => {
        jest.spyOn(comp.post$ as any, 'unsubscribe');
        comp.ngOnDestroy();

        expect((comp.post$ as any).unsubscribe).toHaveBeenCalled();
      });
    });

    describe('`notificationSub`', () => {
      it('should call `notificationSub` `unsubscribe` if has `notificationSub`', () => {
        comp.notificationSub = { unsubscribe: jest.fn() } as any;
        comp.ngOnDestroy();

        expect((comp.notificationSub as any).unsubscribe).toHaveBeenCalled();
      });

      it('should not throw if no `notificationSub`', () => {
        comp.notificationSub = undefined;

        expect(() => comp.ngOnDestroy()).not.toThrow();
      });
    });
  });

  describe('`postTrackBy`', () => {
    it('should return `id`', () => {
      const res = comp.postTrackBy(0, Data.Prismic.getPost());

      expect(res).toBe(Data.Prismic.getPost().id);
    });
  });

  describe('`getPosts`', () => {
    it('should call PrismicService `getPosts` with `onInit` arg', () => {
      comp.getPosts(false);

      expect(prismicService.getPosts).toHaveBeenCalledWith(false);
    });

    it('should set `posts$`', () => {
      comp.post$ = undefined;
      comp.getPosts();

      expect(comp.post$).toBeDefined();
    });

    describe('Response', () => {
      beforeEach(() =>
        (prismicService.getPosts as jest.Mock).mockReturnValue(
          of(Data.Prismic.getPostsResponse())
        )
      );

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
        (prismicService.getPosts as jest.Mock).mockReturnValue(
          of({ results: null, next_page: 'page2' })
        );

        comp.getPosts();
        expect(comp.hasNextPage).toBe(true);
      });

      it('should set `hasNextPage` as false if no `next_page`', () => {
        (prismicService.getPosts as jest.Mock).mockReturnValue(
          of({ results: null, next_page: null })
        );

        comp.getPosts();
        expect(comp.hasNextPage).toBe(false);
      });

      it('should call `ChangeDetectorRef` `markForCheck`', () => {
        comp.getPosts();

        expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
      });
    });

    describe('Error', () => {
      beforeEach(() =>
        (prismicService.getPosts as jest.Mock).mockReturnValue(
          throwError('error')
        )
      );

      it('should set `notificationSub`', async(() => {
        comp.notificationSub = undefined;
        comp.getPosts();

        expect(comp.notificationSub).toBeDefined();
      }));

      it('should call `NotificationService` `displayMessage` with args', async(() => {
        comp.getPosts();

        expect(notificationService.displayMessage).toHaveBeenCalledWith(
          `Couldn't load more posts`,
          { action: 'Retry' }
        );
      }));

      it('should call `getPosts`', async(() => {
        (notificationService.displayMessage as jest.Mock).mockReturnValue(of());
        (notificationService.displayMessage as jest.Mock).mockReturnValueOnce(
          of(undefined)
        );
        comp.getPosts();

        expect(comp.getPosts).toHaveBeenCalledTimes(3);
      }));
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
              changeDetectorRef.markForCheck();
              fixture.detectChanges();
            });

            it('should be displayed`', () => {
              expect(page.postThumbnail).toBeTruthy();
            });

            it('should set `ImageComponent` `image` as transformed `data`', () => {
              expect(page.imageComponent.image).toEqual({
                'mock-prismic-pipe': Data.Prismic.getPosts('post-1').data
              } as any);
            });

            it('should set `ImageComponent` `full-height` attribute', () => {
              expect(
                page.postThumbnail.hasAttribute('full-height')
              ).toBeTruthy();
            });

            it('should call `PrismicPipe` with `data`', () => {
              expect(MockPrismicPipe.prototype.transform).toHaveBeenCalledWith(
                Data.Prismic.getPosts('post-1').data
              );
            });
          });

          describe('no `image.proxy.url`', () => {
            beforeEach(() => {
              (comp.posts[0].data.image.proxy.url as any) = undefined;
              changeDetectorRef.markForCheck();
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
          expect(RichText.asText).toHaveBeenCalledWith(
            Data.Prismic.getPosts('post-1').data.title
          );
        });

        it('should set href', () => {
          expect(page.posts[0].href).toBe(
            `http://localhost/news/${Data.Prismic.getPosts('post-1').uid}`
          );
        });
      });
    });
  });

  describe('Load more', () => {
    describe('`hasNextPage` is `true`', () => {
      beforeEach(() => {
        comp.hasNextPage = true;
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
      });

      it('should be displayed', () => {
        expect(page.loadMore).toBeTruthy();
      });

      it('should call `getPosts` on click', () => {
        page.loadMore.click();

        expect(comp.getPosts).toHaveBeenCalled();
      });
    });

    describe('`hasNextPage` is `false`', () => {
      beforeEach(() => {
        comp.hasNextPage = false;
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
      });

      it('should not be displayed', () => {
        expect(page.loadMore).toBeFalsy();
      });
    });
  });
});

class Page {
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
    jest.spyOn(comp, 'getPosts');
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
  changeDetectorRef = (comp as any).changeDetectorRef;
  metaService = fixture.debugElement.injector.get<MetaService>(MetaService);
  prismicService = fixture.debugElement.injector.get<PrismicService>(
    PrismicService
  );
  notificationService = fixture.debugElement.injector.get<NotificationService>(
    NotificationService
  );
  jest.spyOn(changeDetectorRef, 'markForCheck');
  jest.spyOn(MockPrismicPipe.prototype, 'transform');
  jest.spyOn(RichText, 'asText');
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
