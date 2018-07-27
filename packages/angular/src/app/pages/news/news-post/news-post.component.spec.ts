import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  ActivatedRoute,
  ActivatedRouteStub,
  MockTitleService,
  MockPrismicService,
  MockPrismicPipe,
  Data
} from 'testing';

import { TitleService, PrismicService, LoggerService } from 'shared';
import { NewsPostComponent } from './news-post.component';

let activatedRoute: ActivatedRouteStub;
let comp: NewsPostComponent;
let fixture: ComponentFixture<NewsPostComponent>;
let titleService: TitleService;
let prismicPipe: jasmine.Spy;
let richText: RichTextStub;
let page: Page;

describe('NewsPostComponent', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testData = { post: Data.Prismic.posts[0] };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NewsPostComponent, MockPrismicPipe],
      providers: [
        { provide: TitleService, useClass: MockTitleService },
        { provide: PrismicService, useClass: MockPrismicService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        LoggerService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should set post', () => {
    expect(comp.post).toEqual(Data.Prismic.posts[0]);
  });

  it('should call TitleService setTitle', () => {
    expect(titleService.setTitle).toHaveBeenCalled();
  });

  it('should call RichText asText with post title arg', () => {
    expect(richText.asText).toHaveBeenCalledWith(
      Data.Prismic.posts[0].data.title
    );
  });

  it('should call TitleService setTitle with post title arg', () => {
    expect(titleService.setTitle).toHaveBeenCalledWith('Post 1');
  });

  it('should call PrismicPipe', () => {
    expect(prismicPipe).toHaveBeenCalled();
  });

  it('should call PrismicPipe with post thumbnail', () => {
    expect(prismicPipe).toHaveBeenCalledWith(comp.post.data);
  });

  describe('Content', () => {
    describe('Text', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Prismic.posts[1] };
        prismicPipe.calls.reset();
        fixture.detectChanges();
        page.addElements();
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
        activatedRoute.testData = { post: Data.Prismic.posts[2] };
        prismicPipe.calls.reset();
        fixture.detectChanges();
        page.addElements();
      });

      it('should display ImageBlockComponent', () => {
        expect(page.imageBlock).toBeTruthy();
      });

      it('should call PrismicPipe', () => {
        expect(prismicPipe).toHaveBeenCalledTimes(1);
      });

      it('should call PrismicPipe with slice primary', () => {
        expect(prismicPipe).toHaveBeenCalledWith(
          comp.post.data.body[0].primary
        );
      });
    });

    describe('Duo', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Prismic.posts[3] };
        prismicPipe.calls.reset();
        fixture.detectChanges();
        page.addElements();
      });

      it('should display DuoBlockComponent', () => {
        expect(page.duoBlock).toBeTruthy();
      });

      it('should call PrismicPipe', () => {
        expect(prismicPipe).toHaveBeenCalledTimes(1);
      });

      it('should call PrismicPipe with slice items', () => {
        expect(prismicPipe).toHaveBeenCalledWith(comp.post.data.body[0].items);
      });
    });

    describe('Gallery', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Prismic.posts[4] };
        prismicPipe.calls.reset();
        fixture.detectChanges();
        page.addElements();
      });

      it('should display GalleryBlockComponent', () => {
        expect(page.galleryBlock).toBeTruthy();
      });

      it('should call PrismicPipe', () => {
        expect(prismicPipe).toHaveBeenCalledTimes(1);
      });

      it('should call PrismicPipe with slice items', () => {
        expect(prismicPipe).toHaveBeenCalledWith(comp.post.data.body[0].items);
      });
    });

    describe('Video', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Prismic.posts[5] };
        prismicPipe.calls.reset();
        fixture.detectChanges();
        page.addElements();
      });

      it('should display VideoBlockComponent', () => {
        expect(page.videoBlock).toBeTruthy();
      });

      it('should call PrismicPipe', () => {
        expect(prismicPipe).toHaveBeenCalledTimes(1);
      });

      it('should call PrismicPipe with slice primary', () => {
        expect(prismicPipe).toHaveBeenCalledWith(
          comp.post.data.body[0].primary
        );
      });
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(NewsPostComponent);
  comp = fixture.componentInstance;
  titleService = fixture.debugElement.injector.get(TitleService);
  prismicPipe = spyOn(MockPrismicPipe.prototype, 'transform').and.callThrough();
  richText = new RichTextStub();
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class RichTextStub {
  asText: jasmine.Spy;

  constructor() {
    this.asText = spyOn(comp.richText, 'asText').and.callThrough();
  }
}

class Page {
  textBlock: DebugElement;
  imageBlock: DebugElement;
  galleryBlock: DebugElement;
  duoBlock: DebugElement;
  videoBlock: DebugElement;

  addElements() {
    this.textBlock = fixture.debugElement.query(By.css('prismic-text-block'));
    this.imageBlock = fixture.debugElement.query(By.css('image-block'));
    this.duoBlock = fixture.debugElement.query(By.css('duo-block'));
    this.galleryBlock = fixture.debugElement.query(By.css('gallery-block'));
    this.videoBlock = fixture.debugElement.query(By.css('video-block'));
  }
}
