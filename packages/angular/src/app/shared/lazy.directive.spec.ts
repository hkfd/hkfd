import { Component, DebugElement, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Renderer2, ElementRef, ElementRefStub } from 'testing';
import { LazyDirective } from './lazy.directive';
import { Generic } from './generic';

let comp: TestHostComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;
let lazyDirective: LazyDirective;
let renderer: RendererStub;
let mockPlatformId: 'browser' | 'server';

@Component({
  template: `<img src="" [lazy]="srcset">`
})
class TestHostComponent {
  srcset: Generic.Lazy = {
    attr: 'srcset',
    val: ['example-xs.jpg 100w', 'example-sm.jpg 200w']
  };
}

describe('LazyDirective', () => {
  describe('AfterViewInit', () => {
    describe('browser', () => {
      beforeEach(() => (mockPlatformId = 'browser'));
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));

      it('should set observer', () => {
        lazyDirective.ngAfterViewInit();

        expect((lazyDirective as any).observer).toBeDefined();
      });
    });

    describe('server', () => {
      beforeEach(() => (mockPlatformId = 'server'));
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));

      it('should not set observer', () => {
        lazyDirective.ngAfterViewInit();

        expect((lazyDirective as any).observer).toBeUndefined();
      });
    });
  });

  describe('intersectionCallback', () => {
    beforeEach(() => (mockPlatformId = 'server'));
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() => renderer.setAttribute.calls.reset());

    it('should set data loaded as true if intersecting', () => {
      lazyDirective.intersectionCallback(<any>[{ isIntersecting: true }]);

      expect(comp.srcset.loaded).toBeTruthy();
    });

    it('should not set data loaded if not intersecting', () => {
      lazyDirective.intersectionCallback(<any>[{ isIntersecting: false }]);

      expect(comp.srcset.loaded).toBeUndefined();
    });

    it('should call Renderer2 setAttribute if intersecting', () => {
      lazyDirective.intersectionCallback(<any>[{ isIntersecting: true }]);

      expect(renderer.setAttribute).toHaveBeenCalledWith(
        jasmine.anything(),
        'srcset',
        jasmine.anything()
      );
    });

    it('should call Renderer2 setAttribute with data attr and value args', () => {
      lazyDirective.intersectionCallback(<any>[{ isIntersecting: true }]);

      expect(renderer.setAttribute).toHaveBeenCalledWith(
        jasmine.any(HTMLElement),
        'srcset',
        'example-xs.jpg 100w,example-sm.jpg 200w'
      );
    });

    it('should not call Renderer2 setAttribute if no data attr', () => {
      lazyDirective.data = { attr: '', val: ['example'] };
      lazyDirective.intersectionCallback(<any>[{ isIntersecting: true }]);

      expect(renderer.setAttribute).not.toHaveBeenCalledWith(
        jasmine.anything(),
        'srcset',
        jasmine.anything()
      );
    });

    it('should not call Renderer2 setAttribute if no data val', () => {
      lazyDirective.data = { attr: 'example', val: [''] };
      lazyDirective.intersectionCallback(<any>[{ isIntersecting: true }]);

      expect(renderer.setAttribute).not.toHaveBeenCalledWith(
        jasmine.anything(),
        'srcset',
        jasmine.anything()
      );
    });

    it('should set el attr if intersecting', () => {
      lazyDirective.intersectionCallback(<any>[{ isIntersecting: true }]);
      fixture.detectChanges();

      expect(page.img.attributes.srcset).toBeDefined();
      expect(page.img.attributes.srcset).toEqual(
        'example-xs.jpg 100w,example-sm.jpg 200w'
      );
    });
  });
});

function setupTest() {
  TestBed.configureTestingModule({
    declarations: [LazyDirective, TestHostComponent],
    providers: [
      Renderer2,
      { provide: ElementRef, useClass: ElementRefStub },
      { provide: PLATFORM_ID, useValue: mockPlatformId }
    ]
  }).compileComponents();
}

function createComponent() {
  fixture = TestBed.createComponent(TestHostComponent);
  comp = fixture.componentInstance;
  page = new Page();
  renderer = new RendererStub();
  new LazyDirectiveStub();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class RendererStub {
  setAttribute: jasmine.Spy;

  constructor() {
    const image = fixture.debugElement.query(By.directive(LazyDirective));
    const renderer2 = image.injector.get(Renderer2);

    this.setAttribute = spyOn(renderer2, 'setAttribute').and.callThrough();
  }
}

class LazyDirectiveStub {
  intersectionCallback: jasmine.Spy;

  constructor() {
    const image = fixture.debugElement.query(By.directive(LazyDirective));
    lazyDirective = image.injector.get(LazyDirective);

    this.intersectionCallback = spyOn(
      lazyDirective,
      'intersectionCallback'
    ).and.callThrough();
  }
}

class Page {
  img!: DebugElement;

  addElements() {
    this.img = fixture.debugElement.query(By.css('img'));
  }
}
