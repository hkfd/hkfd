import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  ActivatedRoute,
  ActivatedRouteStub,
  MockPrismicPipe,
  StubPrismicTextBlockComponent,
  StubImageBlockComponent,
  StubDuoBlockComponent,
  StubGalleryBlockComponent,
  StubVideoBlockComponent,
  StubImageComponent,
  Data
} from 'testing';
import { RichText } from 'prismic-dom';

import { Post } from 'prismic';
import { NewsPostComponent } from './news-post.component';

let activatedRoute: ActivatedRouteStub;
let comp: NewsPostComponent;
let fixture: ComponentFixture<NewsPostComponent>;
let page: Page;

describe('NewsPostComponent', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testData = { post: Data.Prismic.getPosts('post-1') };

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
        StubImageComponent
      ],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`ngOnInit`', () => {
    it('should set `post$`', () => {
      expect(comp.post$).toBeDefined();
    });

    it('should subscribe to `ActivatedRoute` `data`', () => {
      expect(activatedRoute.data.subscribe).toHaveBeenCalled();
    });

    it('should set `post`', () => {
      expect(comp.post).toEqual(Data.Prismic.getPosts('post-1'));
    });
  });

  describe('`ngOnDestroy`', () => {
    it('should call `post$` `unsubscribe`', () => {
      jest.spyOn(comp.post$, 'unsubscribe');
      comp.ngOnDestroy();

      expect(comp.post$.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('Template', () => {
    describe('Intro', () => {
      it('should display date', () => {
        expect((page.date.textContent as string).trim()).toBe('01 January');
      });

      describe('Title', () => {
        describe('has `title`', () => {
          beforeEach(() => {
            comp.post = Data.Prismic.getPost();
            fixture.detectChanges();
          });

          it('should be displayed', () => {
            expect(page.title.innerHTML).toBe('Post 1');
          });

          it('should call `RichText` `asText` with `title`', () => {
            expect(RichText.asText).toHaveBeenCalledWith(
              Data.Prismic.getPost().data.title
            );
          });
        });

        describe('no `title`', () => {
          beforeEach(() => {
            ((comp.post as Post).data.title as any) = undefined;
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
            (comp.post as Post).data.image.proxy.url = 'test.jpg';
            fixture.detectChanges();
          });

          it('should be displayed', () => {
            expect(page.thumbnail).toBeTruthy();
          });

          it('should call `PrismicPipe` with `data`', () => {
            expect(MockPrismicPipe.prototype.transform).toHaveBeenCalledWith(
              (comp.post as Post).data
            );
          });

          it('should set `ImageComponent` `image` as transformed `data`', () => {
            expect(page.imageComponent.image).toEqual({
              'mock-prismic-pipe': (comp.post as Post).data as any
            });
          });

          it('should set `ImageComponent` `full-height` attribute', () => {
            expect(page.thumbnail.hasAttribute('full-height')).toBeTruthy();
          });
        });

        describe('no `image.proxy.url`', () => {
          beforeEach(() => {
            ((comp.post as Post).data.image.proxy.url as any) = undefined;
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
          fixture.detectChanges();
        });

        it('should display Prismic `TextBlockComponent`', () => {
          expect(page.textBlock).toBeTruthy();
        });

        it('should not call `PrismicPipe` with `primary`', () => {
          expect(MockPrismicPipe.prototype.transform).not.toHaveBeenCalledWith(
            (comp.post as Post).data.body[0].primary
          );
        });

        it('should set `TextBlockComponent` `data` as `primary.text`', () => {
          expect(page.textBlockComponent.data).toEqual(
            (comp.post as Post).data.body[0].primary.text
          );
        });
      });

      describe('Image', () => {
        beforeEach(() => {
          comp.post = Data.Prismic.getPosts('post-3');
          fixture.detectChanges();
        });

        it('should display `ImageBlockComponent`', () => {
          expect(page.imageBlock).toBeTruthy();
        });

        it('should call `PrismicPipe` with `primary`', () => {
          expect(MockPrismicPipe.prototype.transform).toHaveBeenCalledWith(
            (comp.post as Post).data.body[0].primary
          );
        });

        it('should set `ImageBlockComponent` `data` as transformed`primary`', () => {
          expect(page.imageBlockComponent.data).toEqual({
            'mock-prismic-pipe': (comp.post as Post).data.body[0].primary
          });
        });
      });

      describe('Duo', () => {
        beforeEach(() => {
          comp.post = Data.Prismic.getPosts('post-4');
          fixture.detectChanges();
        });

        it('should display `DuoBlockComponent`', () => {
          expect(page.duoBlock).toBeTruthy();
        });

        it('should call `PrismicPipe` with `items`', () => {
          expect(MockPrismicPipe.prototype.transform).toHaveBeenCalledWith(
            (comp.post as Post).data.body[0].items
          );
        });

        it('should set `DuoBlockComponent` `data` as transformed `items`', () => {
          expect(page.duoBlockComponent.data).toEqual({
            'mock-prismic-pipe': (comp.post as Post).data.body[0].items
          } as any);
        });
      });

      describe('Gallery', () => {
        beforeEach(() => {
          comp.post = Data.Prismic.getPosts('post-5');
          fixture.detectChanges();
        });

        it('should display `GalleryBlockComponent`', () => {
          expect(page.galleryBlock).toBeTruthy();
        });

        it('should call `PrismicPipe` with `items`', () => {
          expect(MockPrismicPipe.prototype.transform).toHaveBeenCalledWith(
            (comp.post as Post).data.body[0].items
          );
        });

        it('should set `GalleryBlockComponent` `data` as transformed `items`', () => {
          expect(page.galleryBlockComponent.data).toEqual({
            'mock-prismic-pipe': (comp.post as Post).data.body[0].items
          } as any);
        });
      });

      describe('Video', () => {
        beforeEach(() => {
          comp.post = Data.Prismic.getPosts('post-6');
          fixture.detectChanges();
        });

        it('should display `VideoBlockComponent`', () => {
          expect(page.videoBlock).toBeTruthy();
        });

        it('should call `PrismicPipe` with `primary`', () => {
          expect(MockPrismicPipe.prototype.transform).toHaveBeenCalledWith(
            (comp.post as Post).data.body[0].primary
          );
        });

        it('should set `VideoBlockComponent` `data` as transformed `primary`', () => {
          expect(page.videoBlockComponent.data).toEqual({
            'mock-prismic-pipe': (comp.post as Post).data.body[0].primary
          } as any);
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
  jest.spyOn(MockPrismicPipe.prototype, 'transform');
  jest.spyOn(RichText, 'asText');
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
