import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  MockApiPipe,
  ActivatedRoute,
  ActivatedRouteStub,
  Data
} from 'testing';

import { Api } from 'shared';
import { PostComponent } from './post.component';

let comp: PostComponent;
let fixture: ComponentFixture<PostComponent>;
let page: Page;
let activatedRoute: ActivatedRouteStub;
let apiPipe: jasmine.Spy;

describe('PostComponent', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testData = { post: Data.Api.caseStudies[0] };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PostComponent, MockApiPipe],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('OnInit', () => {
    it('should set post', () => {
      expect(comp.post).toEqual(Data.Api.caseStudies[0]);
    });

    it('should set layout', () => {
      expect(comp.layout).toBeDefined();
    });

    it(`should set layout as 'layout-'`, () => {
      expect(comp.layout).toMatch(/layout-[1-3]/);
    });
  });

  describe('Content', () => {
    it('should display title', () => {
      activatedRoute.testData = { post: Data.Api.caseStudies[0] };
      comp.ngOnInit();
      fixture.detectChanges();
      page.addElements();

      expect(page.sectionTitle.nativeElement.textContent).toEqual(
        jasmine.any(String)
      );
    });

    it('should display intro', () => {
      activatedRoute.testData = { post: Data.Api.caseStudies[0] };
      comp.ngOnInit();
      fixture.detectChanges();
      page.addElements();

      expect(page.introText.nativeElement.textContent).toBe(
        'Case Study 1 intro'
      );
    });

    describe('Text', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Api.caseStudies[0] };
        comp.ngOnInit();
        page.addElements();
      });

      it('should display TextBlockComponent', () => {
        expect(page.textBlock).toBeTruthy();
      });

      it('should not call ApiPipe', () => {
        expect(apiPipe).not.toHaveBeenCalled();
      });
    });

    describe('Image', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Api.caseStudies[1] };
        comp.ngOnInit();
        fixture.detectChanges();
        page.addElements();
      });

      it('should display ImageBlockComponent', () => {
        expect(page.imageBlock).toBeTruthy();
      });

      it('should call ApiPipe', () => {
        expect(apiPipe).toHaveBeenCalled();
      });

      it('should call ApiPipe with block data', () => {
        expect(apiPipe).toHaveBeenCalledWith(
          comp.post!.content[0].data[0].data
        );
      });

      it(`should set full-bleed attibute as 'true' if fullBleed is true`, () => {
        (<Api.Blocks.ImageBlock>comp.post!.content[0].data[0]).fullBleed = true;
        fixture.detectChanges();

        expect(page.imageBlock.nativeElement.getAttribute('full-bleed')).toBe(
          'true'
        );
      });

      it(`should not set full-bleed attibute if no fullBleed`, () => {
        (<Api.Blocks.ImageBlock>(
          comp.post!.content[0].data[0]
        )).fullBleed = undefined;
        fixture.detectChanges();

        expect(page.imageBlock.nativeElement.getAttribute('full-bleed')).toBe(
          null
        );
      });
    });

    describe('Gallery', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Api.caseStudies[2] };
        comp.ngOnInit();
        fixture.detectChanges();
        page.addElements();
      });

      it('should display GalleryBlockComponent', () => {
        expect(page.galleryBlock).toBeTruthy();
      });

      it('should call ApiPipe', () => {
        expect(apiPipe).toHaveBeenCalled();
      });

      it('should call ApiPipe with block data', () => {
        expect(apiPipe).toHaveBeenCalledWith(
          comp.post!.content[0].data[0].data
        );
      });
    });

    describe('Duo', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Api.services[0] };
        comp.ngOnInit();
        fixture.detectChanges();
        page.addElements();
      });

      it('should display DuoBlockComponent', () => {
        expect(page.duoBlock).toBeTruthy();
      });

      it('should call ApiPipe', () => {
        expect(apiPipe).toHaveBeenCalled();
      });

      it('should call ApiPipe with block data', () => {
        expect(apiPipe).toHaveBeenCalledWith(
          comp.post!.content[0].data[0].data
        );
      });
    });

    describe('Video', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Api.services[1] };
        comp.ngOnInit();
        fixture.detectChanges();
        page.addElements();
      });

      it('should display VideoBlockComponent', () => {
        expect(page.videoBlock).toBeTruthy();
      });

      it('should call ApiPipe', () => {
        expect(apiPipe).toHaveBeenCalled();
      });

      it('should call ApiPipe with block data', () => {
        expect(apiPipe).toHaveBeenCalledWith(
          comp.post!.content[0].data[0].data
        );
      });
    });

    describe('Audio', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Api.services[2] };
        comp.ngOnInit();
        fixture.detectChanges();
        page.addElements();
      });

      it('should display AudioBlockComponent', () => {
        expect(page.audioBlock).toBeTruthy();
      });

      it('should call ApiPipe', () => {
        expect(apiPipe).toHaveBeenCalled();
      });

      it('should call ApiPipe with block data', () => {
        expect(apiPipe).toHaveBeenCalledWith(
          comp.post!.content[0].data[0].data
        );
      });
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(PostComponent);
  comp = fixture.componentInstance;
  page = new Page();
  apiPipe = spyOn(MockApiPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class Page {
  introText!: DebugElement;
  sectionTitle!: DebugElement;
  textBlock!: DebugElement;
  imageBlock!: DebugElement;
  galleryBlock!: DebugElement;
  duoBlock!: DebugElement;
  videoBlock!: DebugElement;
  audioBlock!: DebugElement;

  addElements() {
    this.introText = fixture.debugElement.query(By.css('#text-intro p'));
    this.sectionTitle = fixture.debugElement.query(By.css('h2'));
    this.textBlock = fixture.debugElement.query(By.css('text-block'));
    this.imageBlock = fixture.debugElement.query(By.css('image-block'));
    this.galleryBlock = fixture.debugElement.query(By.css('gallery-block'));
    this.duoBlock = fixture.debugElement.query(By.css('duo-block'));
    this.videoBlock = fixture.debugElement.query(By.css('video-block'));
    this.audioBlock = fixture.debugElement.query(By.css('audio-block'));
  }
}
