import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  ActivatedRoute,
  ActivatedRouteStub,
  MockPrismicService,
  MockPrismicPipe,
  StubPrismicTextBlockComponent,
  StubImageBlockComponent,
  StubDuoBlockComponent,
  StubGalleryBlockComponent,
  StubVideoBlockComponent,
  StubImageComponent,
  StubErrorComponent,
  Data,
  MockPrismicTextPipe
} from 'testing';
import { of } from 'rxjs';

import { PrismicService } from 'shared';
import { NewsPostComponent } from './news-post.component';

let activatedRoute: ActivatedRouteStub;
let comp: NewsPostComponent;
let fixture: ComponentFixture<NewsPostComponent>;
let prismicService: PrismicService;
let page: Page;

beforeEach(jest.clearAllMocks);

describe('NewsPostComponent', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParamMap = { uid: 'post-1' };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        NewsPostComponent,
        MockPrismicPipe,
        StubPrismicTextBlockComponent,
        StubImageBlockComponent,
        StubDuoBlockComponent,
        StubGalleryBlockComponent,
        StubVideoBlockComponent,
        StubImageComponent,
        StubErrorComponent,
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

  describe('`ngOnInit`', () => {
    it('should set `news$`', () => {
      expect(comp.news$).toBeDefined();
    });

    it('should call `PrismicService` `getPost` with `news` and `uid` param arg if `uid` param exists', () => {
      jest.clearAllMocks();
      activatedRoute.testParamMap = { uid: 'uid' };

      expect(prismicService.getPost).toHaveBeenCalledWith('news', 'uid');
    });

    it('should not call `PrismicService` `getPost` if `uid` param does not exist', () => {
      jest.clearAllMocks();
      activatedRoute.testParamMap = { uid: undefined };

      expect(prismicService.getPost).not.toHaveBeenCalled();
    });
  });

  describe('Template', () => {
    describe('`news.post` is `null`', () => {
      beforeEach(() => {
        (prismicService.getPost as jest.Mock).mockReturnValue(
          of({ post: null })
        );
        activatedRoute.testParamMap = { uid: 'uid' };
        fixture.detectChanges();
      });

      it('should display `ErrorComponent`', () => {
        expect(page.error).toBeTruthy();
      });

      describe('Intro', () => {
        it('should not display date', () => {
          expect(page.date).toBeFalsy();
        });
      });
    });

    describe('Has `news.post`', () => {
      beforeEach(() => {
        (prismicService.getPost as jest.Mock).mockReturnValue(
          of({ post: Data.Prismic.getNewsPosts('post-1') })
        );
        activatedRoute.testParamMap = { uid: 'uid' };
        fixture.detectChanges();
      });

      it('should not display `ErrorComponent`', () => {
        expect(page.error).toBeFalsy();
      });

      describe('Intro', () => {
        it('should display date', () => {
          expect((page.date.textContent as string).trim()).toBe('01 January');
        });

        describe('Title', () => {
          describe('has `title`', () => {
            beforeEach(() => {
              (prismicService.getPost as jest.Mock).mockReturnValue(
                of({ post: Data.Prismic.getNewsPost() })
              );
              activatedRoute.testParamMap = { uid: 'uid' };
              fixture.detectChanges();
            });

            it('should be displayed', () => {
              expect(page.title.innerHTML).toBeTruthy();
            });

            it('should call `PrismicTextPipe` with `title`', () => {
              expect(
                MockPrismicTextPipe.prototype.transform
              ).toHaveBeenCalledWith(
                Data.Prismic.getNewsPost().data.title,
                'asText'
              );
            });
          });

          describe('no `title`', () => {
            beforeEach(() => {
              (prismicService.getPost as jest.Mock).mockReturnValue(
                of({
                  post: {
                    ...Data.Prismic.getNewsPost(),
                    data: {
                      ...Data.Prismic.getNewsPost().data,
                      title: undefined
                    }
                  } as any
                })
              );
              activatedRoute.testParamMap = { uid: 'uid' };
              fixture.detectChanges();
            });

            it('should not be displayed', () => {
              expect(page.title).toBeFalsy();
            });
          });
        });

        describe('Thumbnail', () => {
          describe('has `image.proxy.url`', () => {
            beforeEach(() => {
              (prismicService.getPost as jest.Mock).mockReturnValue(
                of({
                  post: {
                    ...Data.Prismic.getNewsPost(),
                    data: {
                      ...Data.Prismic.getNewsPost().data,
                      image: {
                        ...Data.Prismic.getNewsPost().data.image,
                        proxy: {
                          ...Data.Prismic.getNewsPost().data.image.proxy,
                          url: 'test.jpg'
                        }
                      }
                    }
                  } as any
                })
              );
              activatedRoute.testParamMap = { uid: 'uid' };
              fixture.detectChanges();
            });

            it('should be displayed', () => {
              expect(page.thumbnail).toBeTruthy();
            });

            it('should call `PrismicPipe` with `data`', () => {
              expect(MockPrismicPipe.prototype.transform).toHaveBeenCalledWith({
                ...Data.Prismic.getNewsPost().data,
                image: {
                  ...Data.Prismic.getNewsPost().data.image,
                  proxy: {
                    ...Data.Prismic.getNewsPost().data.image.proxy,
                    url: 'test.jpg'
                  }
                }
              });
            });

            it('should set `ImageComponent` `image` as transformed `data`', () => {
              expect(page.imageComponent.image).toEqual({
                'mock-prismic-pipe': {
                  ...Data.Prismic.getNewsPost().data,
                  image: {
                    ...Data.Prismic.getNewsPost().data.image,
                    proxy: {
                      ...Data.Prismic.getNewsPost().data.image.proxy,
                      url: 'test.jpg'
                    }
                  }
                } as any
              });
            });

            it('should set `ImageComponent` `full-height` attribute', () => {
              expect(page.thumbnail.hasAttribute('full-height')).toBeTruthy();
            });
          });

          describe('no `image.proxy.url`', () => {
            beforeEach(() => {
              (prismicService.getPost as jest.Mock).mockReturnValue(
                of({
                  post: {
                    ...Data.Prismic.getNewsPost(),
                    data: {
                      ...Data.Prismic.getNewsPost().data,
                      image: {
                        ...Data.Prismic.getNewsPost().data.image,
                        proxy: {
                          ...Data.Prismic.getNewsPost().data.image.proxy,
                          url: undefined
                        }
                      }
                    }
                  } as any
                })
              );
              activatedRoute.testParamMap = { uid: 'uid' };
              fixture.detectChanges();
            });

            it('should not be displayed', () => {
              expect(page.thumbnail).toBeFalsy();
            });
          });
        });
      });

      describe('Content', () => {
        describe('Text', () => {
          beforeEach(() => {
            (prismicService.getPost as jest.Mock).mockReturnValue(
              of({ post: Data.Prismic.getNewsPosts('post-2') })
            );
            activatedRoute.testParamMap = { uid: 'uid' };
            fixture.detectChanges();
          });

          it('should display Prismic `TextBlockComponent`', () => {
            expect(page.textBlock).toBeTruthy();
          });

          it('should not call `PrismicPipe` with `primary`', () => {
            expect(
              MockPrismicPipe.prototype.transform
            ).not.toHaveBeenCalledWith(
              Data.Prismic.getNewsPosts('post-2').data.body[0].primary
            );
          });

          it('should set `TextBlockComponent` `data` as `primary.text`', () => {
            expect(page.textBlockComponent.data).toEqual(
              Data.Prismic.getNewsPosts('post-2').data.body[0].primary.text
            );
          });
        });

        describe('Image', () => {
          beforeEach(() => {
            (prismicService.getPost as jest.Mock).mockReturnValue(
              of({ post: Data.Prismic.getNewsPosts('post-3') })
            );
            activatedRoute.testParamMap = { uid: 'uid' };
            fixture.detectChanges();
          });

          it('should display `ImageBlockComponent`', () => {
            expect(page.imageBlock).toBeTruthy();
          });

          it('should call `PrismicPipe` with `primary`', () => {
            expect(MockPrismicPipe.prototype.transform).toHaveBeenCalledWith(
              Data.Prismic.getNewsPosts('post-3').data.body[0].primary
            );
          });

          it('should set `ImageBlockComponent` `data` as transformed`primary`', () => {
            expect(page.imageBlockComponent.data).toEqual({
              'mock-prismic-pipe': Data.Prismic.getNewsPosts('post-3').data
                .body[0].primary
            });
          });
        });

        describe('Duo', () => {
          beforeEach(() => {
            (prismicService.getPost as jest.Mock).mockReturnValue(
              of({ post: Data.Prismic.getNewsPosts('post-4') })
            );
            activatedRoute.testParamMap = { uid: 'uid' };
            fixture.detectChanges();
          });

          it('should display `DuoBlockComponent`', () => {
            expect(page.duoBlock).toBeTruthy();
          });

          it('should call `PrismicPipe` with `items`', () => {
            expect(MockPrismicPipe.prototype.transform).toHaveBeenCalledWith(
              Data.Prismic.getNewsPosts('post-4').data.body[0].items
            );
          });

          it('should set `DuoBlockComponent` `data` as transformed `items`', () => {
            expect(page.duoBlockComponent.data).toEqual({
              'mock-prismic-pipe': Data.Prismic.getNewsPosts('post-4').data
                .body[0].items
            } as any);
          });
        });

        describe('Gallery', () => {
          beforeEach(() => {
            (prismicService.getPost as jest.Mock).mockReturnValue(
              of({ post: Data.Prismic.getNewsPosts('post-5') })
            );
            activatedRoute.testParamMap = { uid: 'uid' };
            fixture.detectChanges();
          });

          it('should display `GalleryBlockComponent`', () => {
            expect(page.galleryBlock).toBeTruthy();
          });

          it('should call `PrismicPipe` with `items`', () => {
            expect(MockPrismicPipe.prototype.transform).toHaveBeenCalledWith(
              Data.Prismic.getNewsPosts('post-5').data.body[0].items
            );
          });

          it('should set `GalleryBlockComponent` `data` as transformed `items`', () => {
            expect(page.galleryBlockComponent.data).toEqual({
              'mock-prismic-pipe': Data.Prismic.getNewsPosts('post-5').data
                .body[0].items
            } as any);
          });
        });

        describe('Video', () => {
          beforeEach(() => {
            (prismicService.getPost as jest.Mock).mockReturnValue(
              of({ post: Data.Prismic.getNewsPosts('post-6') })
            );
            activatedRoute.testParamMap = { uid: 'uid' };
            fixture.detectChanges();
          });

          it('should display `VideoBlockComponent`', () => {
            expect(page.videoBlock).toBeTruthy();
          });

          it('should call `PrismicPipe` with `primary`', () => {
            expect(MockPrismicPipe.prototype.transform).toHaveBeenCalledWith(
              Data.Prismic.getNewsPosts('post-6').data.body[0].primary
            );
          });

          it('should set `VideoBlockComponent` `data` as transformed `primary`', () => {
            expect(page.videoBlockComponent.data).toEqual({
              'mock-prismic-pipe': Data.Prismic.getNewsPosts('post-6').data
                .body[0].primary
            } as any);
          });
        });
      });
    });
  });
});

class Page {
  get date() {
    return this.query<HTMLSpanElement>('#intro #info-date');
  }
  get title() {
    return this.query<HTMLHeadingElement>('#intro h1');
  }
  get thumbnail() {
    return this.query<HTMLImageElement>('#intro image-component');
  }
  get textBlock() {
    return this.query<HTMLElement>('prismic-text-block');
  }
  get imageBlock() {
    return this.query<HTMLElement>('image-block');
  }
  get duoBlock() {
    return this.query<HTMLElement>('duo-block');
  }
  get galleryBlock() {
    return this.query<HTMLElement>('gallery-block');
  }
  get videoBlock() {
    return this.query<HTMLElement>('video-block');
  }
  get error() {
    return this.query<HTMLElement>('error');
  }

  get imageComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubImageComponent)
    );
    return directiveEl.injector.get<StubImageComponent>(StubImageComponent);
  }
  get textBlockComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubPrismicTextBlockComponent)
    );
    return directiveEl.injector.get<StubPrismicTextBlockComponent>(
      StubPrismicTextBlockComponent
    );
  }
  get imageBlockComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubImageBlockComponent)
    );
    return directiveEl.injector.get<StubImageBlockComponent>(
      StubImageBlockComponent
    );
  }
  get duoBlockComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubDuoBlockComponent)
    );
    return directiveEl.injector.get<StubDuoBlockComponent>(
      StubDuoBlockComponent
    );
  }
  get galleryBlockComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubGalleryBlockComponent)
    );
    return directiveEl.injector.get<StubGalleryBlockComponent>(
      StubGalleryBlockComponent
    );
  }
  get videoBlockComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubVideoBlockComponent)
    );
    return directiveEl.injector.get<StubVideoBlockComponent>(
      StubVideoBlockComponent
    );
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(NewsPostComponent);
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
