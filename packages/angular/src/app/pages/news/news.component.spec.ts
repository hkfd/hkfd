import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  MockMetaService,
  MockPrismicService,
  MockPrismicPipe,
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [NewsComponent, MockPrismicPipe],
      providers: [
        { provide: MetaService, useClass: MockMetaService },
        { provide: PrismicService, useClass: MockPrismicService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should call MetaService setMetaTags', () => {
    expect(metaService.setMetaTags).toHaveBeenCalled();
  });

  it('should call MetaService setMetaTags with title and url args', () => {
    expect(metaService.setMetaTags).toHaveBeenCalledWith({
      title: jasmine.any(String),
      url: jasmine.any(String)
    });
  });

  it('should call getPosts', () => {
    expect(page.getPosts).toHaveBeenCalled();
  });

  it(`should call getPosts with 'true' onInit arg`, () => {
    expect(page.getPosts).toHaveBeenCalledWith(true);
  });

  it('should call PrismicService getPosts', () => {
    expect(prismicService.getPosts).toHaveBeenCalled();
  });

  it(`should call PrismicService getPosts with 'true' firstLoad arg`, () => {
    expect(prismicService.getPosts).toHaveBeenCalledWith(true);
  });

  it('should set posts', () => {
    expect(comp.posts.length).toBe(3);
  });

  it('should set posts as concat of existing posts', () => {
    comp.getPosts();
    return fixture.whenStable().then(_ => expect(comp.posts.length).toBe(6));
  });

  it(`should set hasNextPage as 'true' if 'next_page' is string`, () => {
    (prismicService.getPosts as jasmine.Spy).and.returnValue(
      of({ results: null, next_page: 'page2' })
    );

    comp.getPosts();
    return fixture
      .whenStable()
      .then(_ => expect(comp.hasNextPage).toBeTruthy());
  });

  it(`should set hasNextPage as 'false' if 'next_page' is empty`, () => {
    (prismicService.getPosts as jasmine.Spy).and.returnValue(
      of({ results: null, next_page: null })
    );

    comp.getPosts();
    return fixture.whenStable().then(_ => expect(comp.hasNextPage).toBeFalsy());
  });

  it('should call PrismicPipe', () => {
    expect(prismicPipe).toHaveBeenCalled();
  });

  it('should call PrismicPipe with post thumbnails', () => {
    Data.Prismic.postsResponse.results.forEach(post =>
      expect(prismicPipe).toHaveBeenCalledWith(post.data)
    );
  });

  it('should call RichText asText', () => {
    expect(richText.asText).toHaveBeenCalled();
  });

  it('should call RichText asText with post titles', () => {
    Data.Prismic.postsResponse.results.forEach(post =>
      expect(richText.asText).toHaveBeenCalledWith(post.data.title)
    );
  });

  describe('load more', () => {
    it('should call getPosts', () => {
      comp.hasNextPage = true;
      fixture.detectChanges();
      page.addElements();
      page.loadMore.triggerEventHandler('click', {});

      expect(page.getPosts).toHaveBeenCalled();
    });

    it(`should call getPosts with no onInit arg`, () => {
      comp.hasNextPage = true;
      fixture.detectChanges();
      page.addElements();
      page.loadMore.triggerEventHandler('click', {});

      expect(page.getPosts).toHaveBeenCalledWith();
    });

    it(`should display load more button if hasNextPage is 'true'`, () => {
      comp.hasNextPage = true;
      fixture.detectChanges();
      page.addElements();

      expect(page.loadMore).toBeTruthy();
    });

    it(`should not display load more button if hasNextPage is 'false'`, () => {
      comp.hasNextPage = false;
      fixture.detectChanges();
      page.addElements();

      expect(page.loadMore).toBeFalsy();
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(NewsComponent);
  comp = fixture.componentInstance;
  metaService = fixture.debugElement.injector.get(MetaService);
  prismicService = fixture.debugElement.injector.get(PrismicService);
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
  getPosts: jasmine.Spy;

  loadMore: DebugElement;

  constructor() {
    this.getPosts = spyOn(comp, 'getPosts').and.callThrough();
  }

  addElements() {
    this.loadMore = fixture.debugElement.query(By.css('#load-more'));
  }
}
