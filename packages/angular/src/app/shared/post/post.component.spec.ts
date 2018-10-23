import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

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
    activatedRoute.testData = { post: Data.Api.getCaseStudies('Case Study 1') };

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
      expect(comp.post).toEqual(Data.Api.getCaseStudies('Case Study 1'));
    });

    it('should set layout', () => {
      expect(comp.layout).toBeDefined();
    });

    it('should set layout as `layout-`', () => {
      expect(comp.layout).toMatch(/layout-[1-3]/);
    });
  });

  describe('Content', () => {
    it('should display title', () => {
      activatedRoute.testData = {
        post: Data.Api.getCaseStudies('Case Study 1')
      };
      comp.ngOnInit();
      fixture.detectChanges();

      expect(page.sectionTitle.textContent).toEqual(jasmine.any(String));
    });

    it('should display intro', () => {
      activatedRoute.testData = {
        post: Data.Api.getCaseStudies('Case Study 1')
      };
      comp.ngOnInit();
      fixture.detectChanges();

      expect(page.introText.textContent).toBe('Case Study 1 intro');
    });

    describe('Text', () => {
      beforeEach(() => {
        activatedRoute.testData = {
          post: Data.Api.getCaseStudies('Case Study 1')
        };
        comp.ngOnInit();
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
        activatedRoute.testData = {
          post: Data.Api.getCaseStudies('Case Study 2')
        };
        comp.ngOnInit();
        fixture.detectChanges();
      });

      it('should display ImageBlockComponent', () => {
        expect(page.imageBlock).toBeTruthy();
      });

      it('should call ApiPipe', () => {
        expect(apiPipe).toHaveBeenCalled();
      });

      it('should call ApiPipe with block data', () => {
        expect(apiPipe).toHaveBeenCalledWith(
          (comp.post as Api.Post).content[0].data[0].data
        );
      });

      it('should set full-bleed attibute as true if fullBleed is true', () => {
        (<Api.Blocks.ImageBlock>(
          (comp.post as Api.Post).content[0].data[0]
        )).fullBleed = true;
        fixture.detectChanges();

        expect(page.imageBlock.getAttribute('full-bleed')).toBe('true');
      });

      it('should not set full-bleed attibute if no fullBleed', () => {
        (<Api.Blocks.ImageBlock>(
          (comp.post as Api.Post).content[0].data[0]
        )).fullBleed = undefined;
        fixture.detectChanges();

        expect(page.imageBlock.getAttribute('full-bleed')).toBe(null);
      });
    });

    describe('Gallery', () => {
      beforeEach(() => {
        activatedRoute.testData = {
          post: Data.Api.getCaseStudies('Case Study 3')
        };
        comp.ngOnInit();
        fixture.detectChanges();
      });

      it('should display GalleryBlockComponent', () => {
        expect(page.galleryBlock).toBeTruthy();
      });

      it('should call ApiPipe', () => {
        expect(apiPipe).toHaveBeenCalled();
      });

      it('should call ApiPipe with block data', () => {
        expect(apiPipe).toHaveBeenCalledWith(
          (comp.post as Api.Post).content[0].data[0].data
        );
      });
    });

    describe('Duo', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Api.getServices('Service 1') };
        comp.ngOnInit();
        fixture.detectChanges();
      });

      it('should display DuoBlockComponent', () => {
        expect(page.duoBlock).toBeTruthy();
      });

      it('should call ApiPipe', () => {
        expect(apiPipe).toHaveBeenCalled();
      });

      it('should call ApiPipe with block data', () => {
        expect(apiPipe).toHaveBeenCalledWith(
          (comp.post as Api.Post).content[0].data[0].data
        );
      });
    });

    describe('Video', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Api.getServices('Service 2') };
        comp.ngOnInit();
        fixture.detectChanges();
      });

      it('should display VideoBlockComponent', () => {
        expect(page.videoBlock).toBeTruthy();
      });

      it('should call ApiPipe', () => {
        expect(apiPipe).toHaveBeenCalled();
      });

      it('should call ApiPipe with block data', () => {
        expect(apiPipe).toHaveBeenCalledWith(
          (comp.post as Api.Post).content[0].data[0].data
        );
      });
    });

    describe('Audio', () => {
      beforeEach(() => {
        activatedRoute.testData = { post: Data.Api.getServices('Service 3') };
        comp.ngOnInit();
        fixture.detectChanges();
      });

      it('should display AudioBlockComponent', () => {
        expect(page.audioBlock).toBeTruthy();
      });

      it('should call ApiPipe', () => {
        expect(apiPipe).toHaveBeenCalled();
      });

      it('should call ApiPipe with block data', () => {
        expect(apiPipe).toHaveBeenCalledWith(
          (comp.post as Api.Post).content[0].data[0].data
        );
      });
    });
  });
});

class Page {
  get introText() {
    return this.query<HTMLParagraphElement>('#text-intro p');
  }
  get sectionTitle() {
    return this.query<HTMLHeadingElement>('h2');
  }
  get textBlock() {
    return this.query<HTMLElement>('text-block');
  }
  get imageBlock() {
    return this.query<HTMLElement>('image-block');
  }
  get galleryBlock() {
    return this.query<HTMLElement>('gallery-block');
  }
  get duoBlock() {
    return this.query<HTMLElement>('duo-block');
  }
  get videoBlock() {
    return this.query<HTMLElement>('video-block');
  }
  get audioBlock() {
    return this.query<HTMLElement>('audio-block');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(PostComponent);
  comp = fixture.componentInstance;
  page = new Page();
  apiPipe = spyOn(MockApiPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
