import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
  RouterTestingModule,
  ActivatedRoute,
  ActivatedRouteStub,
  MockPrismicPipe,
  Data
} from 'testing';

import { Prismic } from 'shared';
import { NewsPostComponent } from './news-post.component';

let activatedRoute: ActivatedRouteStub;
let comp: NewsPostComponent;
let fixture: ComponentFixture<NewsPostComponent>;
let prismicPipe: jasmine.Spy;
let page: Page;

describe('NewsPostComponent', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testData = { post: Data.Prismic.getPosts('post-1') };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NewsPostComponent, MockPrismicPipe],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should set post', () => {
    expect(comp.post).toEqual(Data.Prismic.getPosts('post-1'));
  });

  it('should call PrismicPipe', () => {
    expect(prismicPipe).toHaveBeenCalled();
  });

  it('should call PrismicPipe with post thumbnail', () => {
    expect(prismicPipe).toHaveBeenCalledWith((comp.post as Prismic.Post).data);
  });

  describe('Content', () => {
    describe('Text', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Prismic.getPosts('post-2') };
        prismicPipe.calls.reset();
        fixture.detectChanges();
      });

      it('should display Prismic TextBlockComponent', () => {
        expect(page.textBlock).toBeTruthy();
      });

      it('should not call ApiPipe', () => {
        expect(prismicPipe).not.toHaveBeenCalled();
      });
    });

    describe('Image', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Prismic.getPosts('post-3') };
        prismicPipe.calls.reset();
        fixture.detectChanges();
      });

      it('should display ImageBlockComponent', () => {
        expect(page.imageBlock).toBeTruthy();
      });

      it('should call PrismicPipe', () => {
        expect(prismicPipe).toHaveBeenCalledTimes(1);
      });

      it('should call PrismicPipe with slice primary', () => {
        expect(prismicPipe).toHaveBeenCalledWith(
          (comp.post as Prismic.Post).data.body[0].primary
        );
      });
    });

    describe('Duo', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Prismic.getPosts('post-4') };
        prismicPipe.calls.reset();
        fixture.detectChanges();
      });

      it('should display DuoBlockComponent', () => {
        expect(page.duoBlock).toBeTruthy();
      });

      it('should call PrismicPipe', () => {
        expect(prismicPipe).toHaveBeenCalledTimes(1);
      });

      it('should call PrismicPipe with slice items', () => {
        expect(prismicPipe).toHaveBeenCalledWith(
          (comp.post as Prismic.Post).data.body[0].items
        );
      });
    });

    describe('Gallery', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Prismic.getPosts('post-5') };
        prismicPipe.calls.reset();
        fixture.detectChanges();
      });

      it('should display GalleryBlockComponent', () => {
        expect(page.galleryBlock).toBeTruthy();
      });

      it('should call PrismicPipe', () => {
        expect(prismicPipe).toHaveBeenCalledTimes(1);
      });

      it('should call PrismicPipe with slice items', () => {
        expect(prismicPipe).toHaveBeenCalledWith(
          (comp.post as Prismic.Post).data.body[0].items
        );
      });
    });

    describe('Video', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Prismic.getPosts('post-6') };
        prismicPipe.calls.reset();
        fixture.detectChanges();
      });

      it('should display VideoBlockComponent', () => {
        expect(page.videoBlock).toBeTruthy();
      });

      it('should call PrismicPipe', () => {
        expect(prismicPipe).toHaveBeenCalledTimes(1);
      });

      it('should call PrismicPipe with slice primary', () => {
        expect(prismicPipe).toHaveBeenCalledWith(
          (comp.post as Prismic.Post).data.body[0].primary
        );
      });
    });
  });
});

class Page {
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

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(NewsPostComponent);
  comp = fixture.componentInstance;
  prismicPipe = spyOn(MockPrismicPipe.prototype, 'transform').and.callThrough();
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
