import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

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
  Data
} from 'testing';
import { RichText } from 'prismic-dom';

import { PrismicService } from 'shared';
import { NewsPostComponent } from './news-post.component';

let activatedRoute: ActivatedRouteStub;
let comp: NewsPostComponent;
let fixture: ComponentFixture<NewsPostComponent>;
let changeDetectorRef: ChangeDetectorRef;
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
        StubErrorComponent
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
    it('should set `postSub`', () => {
      expect(comp.postSub).toBeDefined();
    });

    it('should call `PrismicService` `getPost` with `uid` param arg if `uid` param exists', () => {
      jest.clearAllMocks();
      activatedRoute.testParamMap = { uid: 'uid' };

      expect(prismicService.getPost).toHaveBeenCalledWith('uid');
    });

    it('should not call `PrismicService` `getPost` if `uid` param does not exist', () => {
      jest.clearAllMocks();
      activatedRoute.testParamMap = { uid: undefined };

      expect(prismicService.getPost).not.toHaveBeenCalled();
    });

    it('should set `post`', () => {
      expect(comp.post).toEqual(Data.Prismic.getPosts('post-1'));
    });

    it('should call `ChangeDetectorRef` `markForCheck`', () => {
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });
  });

  describe('`ngOnDestroy`', () => {
    it('should call `postSub` `unsubscribe` if has `postSub', () => {
      comp.postSub = { unsubscribe: jest.fn() } as any;
      comp.ngOnDestroy();

      expect((comp.postSub as any).unsubscribe).toHaveBeenCalled();
    });

    it('should not throw if no `postSub`', () => {
      comp.postSub = undefined;

      expect(() => comp.ngOnDestroy()).not.toThrow();
    });
  });

  describe('Template', () => {
    describe('`post` is `undefined`', () => {
      beforeEach(() => {
        comp.post = undefined;
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
      });

      it('should not display `ErrorComponent`', () => {
        expect(page.error).toBeFalsy();
      });

      describe('Intro', () => {
        it('should not display date', () => {
          expect(page.date).toBeFalsy();
        });
      });
    });

    describe('`post` is `null`', () => {
      beforeEach(() => {
        comp.post = null;
        changeDetectorRef.markForCheck();
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

    describe('Has `post`', () => {
      beforeEach(() => {
        comp.post = Data.Prismic.getPosts('post-1');
        changeDetectorRef.markForCheck();
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
              comp.post = Data.Prismic.getPost();
              changeDetectorRef.markForCheck();
              fixture.detectChanges();
            });

            it('should be displayed', () => {
              expect(page.title.innerHTML.trim()).toBe('Post 1');
            });

            it('should call `RichText` `asText` with `title`', () => {
              expect(RichText.asText).toHaveBeenCalledWith(
                Data.Prismic.getPost().data.title
              );
            });
          });

          describe('no `title`', () => {
            beforeEach(() => {
              comp.post = {
                ...Data.Prismic.getPost(),
                data: { ...Data.Prismic.getPost().data, title: undefined }
              } as any;
              changeDetectorRef.markForCheck();
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
              comp.post = {
                ...Data.Prismic.getPost(),
                data: {
                  ...Data.Prismic.getPost().data,
                  image: {
                    ...Data.Prismic.getPost().data.image,
                    proxy: {
                      ...Data.Prismic.getPost().data.image.proxy,
                      url: 'test.jpg'
                    }
                  }
                }
              } as any;
              changeDetectorRef.markForCheck();
              fixture.detectChanges();
            });

            it('should be displayed', () => {
              expect(page.thumbnail).toBeTruthy();
            });

            it('should call `PrismicPipe` with `data`', () => {
              expect(MockPrismicPipe.prototype.transform).toHaveBeenCalledWith({
                ...Data.Prismic.getPost().data,
                image: {
                  ...Data.Prismic.getPost().data.image,
                  proxy: {
                    ...Data.Prismic.getPost().data.image.proxy,
                    url: 'test.jpg'
                  }
                }
              });
            });

            it('should set `ImageComponent` `image` as transformed `data`', () => {
              expect(page.imageComponent.image).toEqual({
                'mock-prismic-pipe': {
                  ...Data.Prismic.getPost().data,
                  image: {
                    ...Data.Prismic.getPost().data.image,
                    proxy: {
                      ...Data.Prismic.getPost().data.image.proxy,
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
              comp.post = {
                ...Data.Prismic.getPost(),
                data: {
                  ...Data.Prismic.getPost().data,
                  image: {
                    ...Data.Prismic.getPost().data.image,
                    proxy: {
                      ...Data.Prismic.getPost().data.image.proxy,
                      url: undefined
                    }
                  }
                }
              } as any;
              changeDetectorRef.markForCheck();
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
            comp.post = Data.Prismic.getPosts('post-2');
            changeDetectorRef.markForCheck();
            fixture.detectChanges();
          });

          it('should display Prismic `TextBlockComponent`', () => {
            expect(page.textBlock).toBeTruthy();
          });

          it('should not call `PrismicPipe` with `primary`', () => {
            expect(
              MockPrismicPipe.prototype.transform
            ).not.toHaveBeenCalledWith(
              Data.Prismic.getPosts('post-2').data.body[0].primary
            );
          });

          it('should set `TextBlockComponent` `data` as `primary.text`', () => {
            expect(page.textBlockComponent.data).toEqual(
              Data.Prismic.getPosts('post-2').data.body[0].primary.text
            );
          });
        });

        describe('Image', () => {
          beforeEach(() => {
            comp.post = Data.Prismic.getPosts('post-3');
            changeDetectorRef.markForCheck();
            fixture.detectChanges();
          });

          it('should display `ImageBlockComponent`', () => {
            expect(page.imageBlock).toBeTruthy();
          });

          it('should call `PrismicPipe` with `primary`', () => {
            expect(MockPrismicPipe.prototype.transform).toHaveBeenCalledWith(
              Data.Prismic.getPosts('post-3').data.body[0].primary
            );
          });

          it('should set `ImageBlockComponent` `data` as transformed`primary`', () => {
            expect(page.imageBlockComponent.data).toEqual({
              'mock-prismic-pipe': Data.Prismic.getPosts('post-3').data.body[0]
                .primary
            });
          });
        });

        describe('Duo', () => {
          beforeEach(() => {
            comp.post = Data.Prismic.getPosts('post-4');
            changeDetectorRef.markForCheck();
            fixture.detectChanges();
          });

          it('should display `DuoBlockComponent`', () => {
            expect(page.duoBlock).toBeTruthy();
          });

          it('should call `PrismicPipe` with `items`', () => {
            expect(MockPrismicPipe.prototype.transform).toHaveBeenCalledWith(
              Data.Prismic.getPosts('post-4').data.body[0].items
            );
          });

          it('should set `DuoBlockComponent` `data` as transformed `items`', () => {
            expect(page.duoBlockComponent.data).toEqual({
              'mock-prismic-pipe': Data.Prismic.getPosts('post-4').data.body[0]
                .items
            } as any);
          });
        });

        describe('Gallery', () => {
          beforeEach(() => {
            comp.post = Data.Prismic.getPosts('post-5');
            changeDetectorRef.markForCheck();
            fixture.detectChanges();
          });

          it('should display `GalleryBlockComponent`', () => {
            expect(page.galleryBlock).toBeTruthy();
          });

          it('should call `PrismicPipe` with `items`', () => {
            expect(MockPrismicPipe.prototype.transform).toHaveBeenCalledWith(
              Data.Prismic.getPosts('post-5').data.body[0].items
            );
          });

          it('should set `GalleryBlockComponent` `data` as transformed `items`', () => {
            expect(page.galleryBlockComponent.data).toEqual({
              'mock-prismic-pipe': Data.Prismic.getPosts('post-5').data.body[0]
                .items
            } as any);
          });
        });

        describe('Video', () => {
          beforeEach(() => {
            comp.post = Data.Prismic.getPosts('post-6');
            changeDetectorRef.markForCheck();
            fixture.detectChanges();
          });

          it('should display `VideoBlockComponent`', () => {
            expect(page.videoBlock).toBeTruthy();
          });

          it('should call `PrismicPipe` with `primary`', () => {
            expect(MockPrismicPipe.prototype.transform).toHaveBeenCalledWith(
              Data.Prismic.getPosts('post-6').data.body[0].primary
            );
          });

          it('should set `VideoBlockComponent` `data` as transformed `primary`', () => {
            expect(page.videoBlockComponent.data).toEqual({
              'mock-prismic-pipe': Data.Prismic.getPosts('post-6').data.body[0]
                .primary
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
  changeDetectorRef = (comp as any).changeDetectorRef;
  prismicService = fixture.debugElement.injector.get<PrismicService>(
    PrismicService
  );
  jest.spyOn(changeDetectorRef, 'markForCheck');
  jest.spyOn(MockPrismicPipe.prototype, 'transform');
  jest.spyOn(RichText, 'asText');
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
