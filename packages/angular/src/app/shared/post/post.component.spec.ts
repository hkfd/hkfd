import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import {
  Router,
  RouterTestingModule,
  MockTitleService,
  MockApiService,
  MockApiPipe,
  ActivatedRoute,
  ActivatedRouteStub
} from '../../../testing';

import { TitleService, ApiService, Api } from '../../shared/shared.module';
import { PostComponent } from './post.component';

let comp: PostComponent;
let fixture: ComponentFixture<PostComponent>;
let titleService: TitleService;
let apiService: ApiService;
let page: Page;
let router: RouterStub;
let activatedRoute: ActivatedRouteStub;
let apiPipe: jasmine.Spy;

describe('PostComponent', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PostComponent, MockApiPipe],
      providers: [
        { provide: TitleService, useClass: MockTitleService },
        { provide: ApiService, useClass: MockApiService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should call Router navigateByUrl on empty post', () => {
    expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('should call Router navigateByUrl with root arg on empty post', () => {
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  describe('OnInit', () => {
    beforeEach(() => {
      activatedRoute.testParamMap = { type: 'work', id: 'case-study-1' };
      fixture.detectChanges();
    });

    it('should call ApiService getPost', () => {
      expect(apiService.getPost).toHaveBeenCalled();
    });

    it('should call ApiService getPost with type and id args', () => {
      expect(apiService.getPost).toHaveBeenCalledWith('work', 'case-study-1');
    });

    it('should set post', () => {
      expect(comp.post).toBeDefined();
      expect(comp.post.title).toBe('Case Study 1');
    });

    it('should call TitleService setTitle', () => {
      expect(titleService.setTitle).toHaveBeenCalled();
    });

    it('should call TitleService setTitle with post title', () => {
      expect(titleService.setTitle).toHaveBeenCalledWith('Case Study 1');
    });

    it('should set layout', () => {
      expect(comp.layout).toBeDefined();
    });

    it(`should set layout as 'layout-'`, () => {
      expect(comp.layout).toMatch(/layout-[1-3]/);
    });

    it('should call ApiService getPost on route change', () => {
      activatedRoute.testParamMap = { type: 'work', id: 'case-study-2' };
      fixture.detectChanges();

      expect(apiService.getPost).toHaveBeenCalledTimes(3);
    });

    it('should set post again on route change', () => {
      activatedRoute.testParamMap = { type: 'work', id: 'case-study-2' };
      fixture.detectChanges();

      expect(comp.post.title).toBe('Case Study 2');
    });

    it('should not call Router navigateByUrl', () => {
      expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
    });
  });

  describe('Content', () => {
    it('should display title', () => {
      activatedRoute.testParamMap = { type: 'work', id: 'case-study-1' };
      fixture.detectChanges();
      page.addElements();

      expect(page.sectionTitle.nativeElement.textContent).toEqual(
        jasmine.any(String)
      );
    });

    describe('Text', () => {
      beforeEach(() => {
        activatedRoute.testParamMap = { type: 'work', id: 'case-study-1' };
        fixture.detectChanges();
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
        activatedRoute.testParamMap = { type: 'work', id: 'case-study-2' };
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
        expect(apiPipe).toHaveBeenCalledWith(comp.post.content[0].data[0].data);
      });

      it(`should set full-bleed attibute as 'true' if fullBleed is true`, () => {
        (<Api.Blocks.ImageBlock>comp.post.content[0].data[0]).fullBleed = true;
        fixture.detectChanges();

        expect(page.imageBlock.nativeElement.getAttribute('full-bleed')).toBe(
          'true'
        );
      });

      it(`should not set full-bleed attibute if no fullBleed`, () => {
        (<Api.Blocks.ImageBlock>(
          comp.post.content[0].data[0]
        )).fullBleed = undefined;
        fixture.detectChanges();

        expect(page.imageBlock.nativeElement.getAttribute('full-bleed')).toBe(
          null
        );
      });
    });

    describe('Gallery', () => {
      beforeEach(() => {
        activatedRoute.testParamMap = { type: 'work', id: 'case-study-3' };
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
        expect(apiPipe).toHaveBeenCalledWith(comp.post.content[0].data[0].data);
      });
    });

    describe('Duo', () => {
      beforeEach(() => {
        activatedRoute.testParamMap = { type: 'service', id: 'service-1' };
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
        expect(apiPipe).toHaveBeenCalledWith(comp.post.content[0].data[0].data);
      });
    });

    describe('Video', () => {
      beforeEach(() => {
        activatedRoute.testParamMap = { type: 'service', id: 'service-2' };
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
        expect(apiPipe).toHaveBeenCalledWith(comp.post.content[0].data[0].data);
      });
    });

    describe('Audio', () => {
      beforeEach(() => {
        activatedRoute.testParamMap = { type: 'service', id: 'service-3' };
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
        expect(apiPipe).toHaveBeenCalledWith(comp.post.content[0].data[0].data);
      });
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(PostComponent);
  comp = fixture.componentInstance;
  titleService = fixture.debugElement.injector.get(TitleService);
  apiService = fixture.debugElement.injector.get(ApiService);
  page = new Page();
  router = new RouterStub();
  apiPipe = spyOn(MockApiPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class RouterStub {
  navigateByUrl: jasmine.Spy;

  constructor() {
    const noop = () => undefined;
    const router = fixture.debugElement.injector.get(Router);

    this.navigateByUrl = spyOn(router, 'navigateByUrl').and.callFake(noop);
  }
}

class Page {
  sectionTitle: DebugElement;
  textBlock: DebugElement;
  imageBlock: DebugElement;
  galleryBlock: DebugElement;
  duoBlock: DebugElement;
  videoBlock: DebugElement;
  audioBlock: DebugElement;

  addElements() {
    this.sectionTitle = fixture.debugElement.query(By.css('h2'));
    this.textBlock = fixture.debugElement.query(By.css('text-block'));
    this.imageBlock = fixture.debugElement.query(By.css('image-block'));
    this.galleryBlock = fixture.debugElement.query(By.css('gallery-block'));
    this.duoBlock = fixture.debugElement.query(By.css('duo-block'));
    this.videoBlock = fixture.debugElement.query(By.css('video-block'));
    this.audioBlock = fixture.debugElement.query(By.css('audio-block'));
  }
}
