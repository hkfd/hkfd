import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Renderer2, ElementRef, ElementRefStub } from '../../testing';
import { LazyDirective } from './lazy.directive';
import { Lazy } from './images';

let comp: TestHostComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;
let lazyDirective: LazyDirective;
let directive: LazyDirectiveStub;
let renderer: RendererStub;

@Component({
  template: `<img src="" [lazy]="srcset" (loaded)="elLoaded()">`
})
class TestHostComponent {
  srcset: Lazy = {
    attr: 'srcset',
    value: ['example-xs.jpg 100w', 'example-sm.jpg 200w']
  };

  elLoaded() {}
}

describe('LazyDirective', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LazyDirective, TestHostComponent],
        providers: [
          Renderer2,
          { provide: ElementRef, useClass: ElementRefStub }
        ]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createComponent()));

  describe('intersectionCallback', () => {
    it('should emit loaded if intersecting', () => {
      lazyDirective.intersectionCallback(<any>[{ isIntersecting: true }]);

      expect(page.elLoaded).toHaveBeenCalled();
    });

    it('should not emit loaded if not intersecting', () => {
      lazyDirective.intersectionCallback(<any>[{ isIntersecting: false }]);

      expect(page.elLoaded).not.toHaveBeenCalled();
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

    it('should not call Renderer2 setAttribute if no data', () => {
      lazyDirective.data = null;
      lazyDirective.intersectionCallback(<any>[{ isIntersecting: true }]);

      expect(renderer.setAttribute).not.toHaveBeenCalledWith(
        jasmine.anything(),
        'srcset',
        jasmine.anything()
      );
    });

    it('should set img srcset if intersecting', () => {
      lazyDirective.intersectionCallback(<any>[{ isIntersecting: true }]);
      fixture.detectChanges();

      expect(page.img.attributes.srcset).toBeDefined();
      expect(page.img.attributes.srcset).toEqual(
        'example-xs.jpg 100w,example-sm.jpg 200w'
      );
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(TestHostComponent);
  comp = fixture.componentInstance;
  page = new Page();
  directive = new LazyDirectiveStub();
  renderer = new RendererStub();

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
  elLoaded: jasmine.Spy;

  img: DebugElement;

  constructor() {
    this.elLoaded = spyOn(comp, 'elLoaded').and.callThrough();
  }

  addElements() {
    this.img = fixture.debugElement.query(By.css('img'));
  }
}