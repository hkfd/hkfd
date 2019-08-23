import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import {
  RouterTestingModule,
  MockPrismicService,
  MockPrismicPipe,
  StubImageComponent,
  Data,
  ActivatedRoute,
  ActivatedRouteStub,
  MockPrismicTextPipe
} from 'testing';
import { of } from 'rxjs';

import { PrismicService } from 'shared';
import { PostsResponse, NewsPost } from 'prismic';
import { NewsComponent } from './news.component';

let activatedRoute: ActivatedRouteStub;
let comp: NewsComponent;
let fixture: ComponentFixture<NewsComponent>;
let prismicService: PrismicService;
let page: Page;

@Component({
  selector: 'app-host',
  template: '<app-news>{{ data }}</app-news>'
})
class TestHostComponent {
  data: any;
}

jest.mock('./news.helpers', () => ({
  getPaginationUrl: jest
    .fn()
    .mockImplementation(
      (_, direction) => `/getPaginationUrlReturn/${direction}`
    )
}));

beforeEach(jest.clearAllMocks);

describe('NewsComponent', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParamMap = { page: 'page' };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [
        TestHostComponent,
        NewsComponent,
        StubImageComponent,
        MockPrismicPipe,
        MockPrismicTextPipe
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: PrismicService, useClass: MockPrismicService }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `getPaginationUrl`', () => {
    expect(comp.getPaginationUrl).toBeDefined();
  });

  describe('`ngOnInit`', () => {
    describe('`posts$`', () => {
      it('should be set', () => {
        expect(comp.posts$).toBeDefined();
      });

      describe('Has `page` param', () => {
        it('should call `PrismicService` `getPosts` with `news` and `page` param', () => {
          activatedRoute.testParamMap = { page: 'page' };

          expect(prismicService.getPosts).toHaveBeenCalledWith('news', {
            page: 'page'
          });
        });

        it('should call `PrismicService` `getPosts` with `news` and `page` param again on param change', () => {
          activatedRoute.testParamMap = { page: 'page1' };
          expect(prismicService.getPosts).toHaveBeenCalledWith('news', {
            page: 'page1'
          });
          activatedRoute.testParamMap = { page: 'page2' };
          expect(prismicService.getPosts).toHaveBeenCalledWith('news', {
            page: 'page2'
          });
        });
      });

      describe('No `page` param', () => {
        it('should call `PrismicService` `getPosts` with `news` and `1` param', () => {
          activatedRoute.testParamMap = { page: null };

          expect(prismicService.getPosts).toHaveBeenCalledWith('news', {
            page: '1'
          });
        });
      });
    });
  });

  describe('`postTrackBy`', () => {
    it('should return `id`', () => {
      const res = comp.postTrackBy(0, { id: 'id' } as NewsPost);

      expect(res).toBe('id');
    });
  });

  describe('Template', () => {
    it('should display title', () => {
      expect(page.title.textContent).toBeTruthy();
    });

    describe('News', () => {
      describe('Has `posts$`', () => {
        beforeEach(() => {
          comp.posts$ = of('') as any;
          fixture.detectChanges();
        });

        it('should be displayed', () => {
          expect(page.news).toBeTruthy();
        });

        describe('Prev button', () => {
          describe('Has `posts.prev_page`', () => {
            beforeEach(() => {
              comp.posts$ = of(({ prev_page: 'true' } as Partial<
                PostsResponse<NewsPost>
              >) as PostsResponse<NewsPost>);
              activatedRoute.testParamMap = { page: null };
              fixture.detectChanges();
            });

            it('should be displayed', () => {
              expect(page.prevButton).toBeTruthy();
            });

            it('should call `getPaginationUrl` with `posts` and prev args', () => {
              expect(comp.getPaginationUrl).toHaveBeenCalledWith(
                { prev_page: 'true' },
                'prev'
              );
            });

            it('should set href as `getPaginationUrl` return', () => {
              fixture.detectChanges();

              expect(
                page.prevButton.getAttribute('ng-reflect-router-link')
              ).toBe('/getPaginationUrlReturn/prev');
            });
          });

          describe('No `posts.prev_page`', () => {
            beforeEach(() => {
              comp.posts$ = of(({ prev_page: undefined } as Partial<
                PostsResponse<NewsPost>
              >) as PostsResponse<NewsPost>);
              activatedRoute.testParamMap = { page: null };
              fixture.detectChanges();
            });

            it('should not be displayed', () => {
              expect(page.prevButton).toBeFalsy();
            });
          });
        });

        describe('Posts', () => {
          it('should be displayed', () => {
            expect(page.posts.length).toBe(
              Data.Prismic.getNewsPostsResponse().results.length
            );
          });

          describe('Post', () => {
            it('should set href', () => {
              expect(page.posts[0].href).toBe(
                `http://localhost/news/${
                  Data.Prismic.getNewsPosts('post-1').uid
                }`
              );
            });

            describe('Thumbnail', () => {
              describe('has `image.proxy.url`', () => {
                beforeEach(() => {
                  comp.posts$ = of(({
                    results: [Data.Prismic.getNewsPosts('post-1')]
                  } as Partial<PostsResponse<NewsPost>>) as PostsResponse<NewsPost>);
                  activatedRoute.testParamMap = { page: null };
                  fixture.detectChanges();
                });

                it('should be displayed`', () => {
                  expect(page.postThumbnail).toBeTruthy();
                });

                it('should set `ImageComponent` `image` as transformed `data`', () => {
                  expect(page.imageComponent.image).toEqual({
                    'mock-prismic-pipe': Data.Prismic.getNewsPosts('post-1')
                      .data
                  } as any);
                });

                it('should set `ImageComponent` `full-height` attribute', () => {
                  expect(
                    page.postThumbnail.hasAttribute('full-height')
                  ).toBeTruthy();
                });

                it('should call `PrismicPipe` with `data`', () => {
                  expect(
                    MockPrismicPipe.prototype.transform
                  ).toHaveBeenCalledWith(
                    Data.Prismic.getNewsPosts('post-1').data
                  );
                });
              });

              describe('no `image.proxy.url`', () => {
                beforeEach(() => {
                  comp.posts$ = of(({
                    results: [
                      {
                        ...Data.Prismic.getNewsPosts('post-1'),
                        data: {
                          ...Data.Prismic.getNewsPosts('post-1').data,
                          image: {
                            ...Data.Prismic.getNewsPosts('post-1').data.image,
                            proxy: {
                              ...Data.Prismic.getNewsPosts('post-1').data.image
                                .proxy,
                              url: ''
                            }
                          }
                        }
                      }
                    ]
                  } as Partial<PostsResponse<NewsPost>>) as PostsResponse<NewsPost>);
                  activatedRoute.testParamMap = { page: null };
                  fixture.detectChanges();
                });

                it('should not be displayed', () => {
                  expect(page.postThumbnail).toBeFalsy();
                });
              });
            });

            it('should display date', () => {
              expect((page.postDate.textContent as string).trim()).toBe(
                '01/01'
              );
            });

            it('should display title', () => {
              expect(page.postTitle.innerHTML).toBeTruthy();
            });

            it('should call `PrismicTextPipe` with `title`', () => {
              expect(
                MockPrismicTextPipe.prototype.transform
              ).toHaveBeenCalledWith(
                Data.Prismic.getNewsPosts('post-1').data.title,
                'asText'
              );
            });
          });
        });

        describe('Next button', () => {
          describe('Has `posts.next_page`', () => {
            beforeEach(() => {
              comp.posts$ = of(({ next_page: 'true' } as Partial<
                PostsResponse<NewsPost>
              >) as PostsResponse<NewsPost>);
              activatedRoute.testParamMap = { page: null };
              fixture.detectChanges();
            });

            it('should be displayed', () => {
              expect(page.nextButton).toBeTruthy();
            });

            it('should call `getPaginationUrl` with `posts` and next args', () => {
              expect(comp.getPaginationUrl).toHaveBeenCalledWith(
                { next_page: 'true' },
                'next'
              );
            });

            it('should set href as `getPaginationUrl` return', () => {
              expect(
                page.nextButton.getAttribute('ng-reflect-router-link')
              ).toBe('/getPaginationUrlReturn/next');
            });
          });

          describe('No `posts.next_page`', () => {
            beforeEach(() => {
              comp.posts$ = of(({ next_page: undefined } as Partial<
                PostsResponse<NewsPost>
              >) as PostsResponse<NewsPost>);
              activatedRoute.testParamMap = { page: null };
              fixture.detectChanges();
            });

            it('should not be displayed', () => {
              expect(page.nextButton).toBeFalsy();
            });
          });
        });
      });

      describe('No `posts$`', () => {
        beforeEach(() => {
          comp.posts$ = undefined;
          activatedRoute.testParamMap = { page: null };
          fixture.detectChanges();
        });

        it('should be displayed', () => {
          expect(page.news).toBeFalsy();
        });
      });
    });
  });
});

class Page {
  get title() {
    return this.query<HTMLHeadingElement>('h1');
  }
  get prevButton() {
    return this.query<HTMLButtonElement>('#prev');
  }
  get news() {
    return this.query<HTMLElement>('#news');
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
  get nextButton() {
    return this.query<HTMLButtonElement>('#next');
  }

  get imageComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubImageComponent)
    );
    return directiveEl.injector.get<StubImageComponent>(StubImageComponent);
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
  prismicService = fixture.debugElement.injector.get<PrismicService>(
    PrismicService
  );
  jest.spyOn(MockPrismicPipe.prototype, 'transform');
  jest.spyOn(MockPrismicTextPipe.prototype, 'transform');
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
