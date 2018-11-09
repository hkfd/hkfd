import { Component, PLATFORM_ID, Renderer2, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Data } from 'testing';

import { LazyDirective } from './lazy.directive';

let comp: TestHostComponent;
let fixture: ComponentFixture<TestHostComponent>;
let lazyDirective: LazyDirective;
let renderer: RendererStub;
let elementRef: ElementRef;
let mockPlatformId: 'browser' | 'server';

@Component({
  template: '<img src="" [lazy]="lazy">'
})
class TestHostComponent {
  lazy: any = {};
}

describe('LazyDirective', () => {
  describe('', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() => {
      spyOn(lazyDirective, 'intersectionCallback').and.callFake(
        () => undefined
      );
      comp.lazy = Data.Generic.getLazy();
      fixture.detectChanges();
    });

    it('should create directive', () => {
      expect(lazyDirective).toBeTruthy();
    });

    it('should set `data`', () => {
      expect(lazyDirective.data).toEqual(Data.Generic.getLazy());
    });
  });

  describe('`ngAfterViewInit`', () => {
    describe('browser', () => {
      beforeEach(() => (mockPlatformId = 'browser'));
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));
      beforeEach(() => {
        spyOn(lazyDirective, 'intersectionCallback').and.callFake(
          () => undefined
        );
        comp.lazy = Data.Generic.getLazy();
        fixture.detectChanges();
      });

      it('should set `observer`', () => {
        lazyDirective.ngAfterViewInit();

        expect((lazyDirective as any).observer).toBeDefined();
      });
    });

    describe('server', () => {
      beforeEach(() => (mockPlatformId = 'server'));
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));
      beforeEach(() => {
        spyOn(lazyDirective, 'intersectionCallback').and.callFake(
          () => undefined
        );
        comp.lazy = Data.Generic.getLazy();
        fixture.detectChanges();
      });

      it('should not set `observer`', () => {
        lazyDirective.ngAfterViewInit();

        expect((lazyDirective as any).observer).toBeUndefined();
      });
    });
  });

  describe('`ngOnDestroy`', () => {
    describe('Has `observer`', () => {
      let disconnectSpy: jasmine.Spy;

      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));
      beforeEach(() => {
        (lazyDirective as any).observer = new IntersectionObserver(
          () => undefined
        );
        disconnectSpy = spyOn(
          (lazyDirective as any).observer,
          'disconnect'
        ).and.callThrough();

        lazyDirective.ngOnDestroy();
      });

      it('should call `observer` `disconnect`', () => {
        expect(disconnectSpy).toHaveBeenCalled();
      });
    });
  });

  describe('`intersectionCallback`', () => {
    beforeEach(() => (mockPlatformId = 'server'));
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() => {
      comp.lazy = Data.Generic.getLazy();
      fixture.detectChanges();
    });

    describe('`isIntersecting` is `false`', () => {
      beforeEach(() =>
        lazyDirective.intersectionCallback([{ isIntersecting: false }] as any));

      it('should not set `data` `loaded', () => {
        expect(comp.lazy.loaded).toBeUndefined();
      });
    });

    describe('`isIntersecting` is `true`', () => {
      it('should set `data` `loaded as `true`', () => {
        lazyDirective.intersectionCallback([{ isIntersecting: true }] as any);

        expect(comp.lazy.loaded).toBe(true);
      });

      describe('Has `observer`', () => {
        let disconnectSpy: jasmine.Spy;

        beforeEach(() => {
          (lazyDirective as any).observer = new IntersectionObserver(
            () => undefined
          );
          disconnectSpy = spyOn(
            (lazyDirective as any).observer,
            'disconnect'
          ).and.callThrough();

          lazyDirective.intersectionCallback([{ isIntersecting: true }] as any);
        });

        it('should call `observer` `disconnect`', () => {
          expect(disconnectSpy).toHaveBeenCalled();
        });
      });

      describe('No `data.attr` and `data.val`', () => {
        beforeEach(() => {
          renderer.setAttribute.calls.reset();
          lazyDirective.data = {
            ...Data.Generic.getLazy(),
            attr: undefined
          } as any;
          lazyDirective.intersectionCallback([{ isIntersecting: true }] as any);
        });

        it('should not call `Renderer2` `setAttribute`', () => {
          expect(renderer.setAttribute).not.toHaveBeenCalled();
        });
      });

      describe('`data.attr` and no `data.val`', () => {
        beforeEach(() => {
          renderer.setAttribute.calls.reset();
          lazyDirective.data = {
            ...Data.Generic.getLazy(),
            val: undefined
          } as any;
          lazyDirective.intersectionCallback([{ isIntersecting: true }] as any);
        });

        it('should not call `Renderer2` `setAttribute`', () => {
          expect(renderer.setAttribute).not.toHaveBeenCalled();
        });
      });

      describe('No `data.attr` and no `data.val`', () => {
        beforeEach(() => {
          renderer.setAttribute.calls.reset();
          lazyDirective.data = {
            ...Data.Generic.getLazy(),
            attr: undefined,
            val: undefined
          } as any;
          lazyDirective.intersectionCallback([{ isIntersecting: true }] as any);
        });

        it('should not call `Renderer2` `setAttribute`', () => {
          expect(renderer.setAttribute).not.toHaveBeenCalled();
        });
      });

      describe('`data.attr` and `data.val`', () => {
        beforeEach(() => {
          renderer.setAttribute.calls.reset();
          lazyDirective.data = Data.Generic.getLazy();
          lazyDirective.intersectionCallback([{ isIntersecting: true }] as any);
        });

        it('should call `Renderer2` `setAttribute` with `ElementRef nativeElement`, `data.attr`, and joined `data.val` args', () => {
          expect(renderer.setAttribute).toHaveBeenCalledWith(
            elementRef.nativeElement,
            Data.Generic.getLazy().attr,
            Data.Generic.getLazy().val.join()
          );
        });
      });
    });
  });
});

function setupTest() {
  TestBed.configureTestingModule({
    declarations: [TestHostComponent, LazyDirective],
    providers: [{ provide: PLATFORM_ID, useValue: mockPlatformId }]
  }).compileComponents();
}

class RendererStub {
  setAttribute: jasmine.Spy;

  constructor() {
    const image = fixture.debugElement.query(By.directive(LazyDirective));
    const renderer2 = image.injector.get<Renderer2>(Renderer2 as any);

    this.setAttribute = spyOn(renderer2, 'setAttribute').and.callThrough();
  }
}

function createComponent() {
  fixture = TestBed.createComponent(TestHostComponent);
  comp = fixture.componentInstance;
  renderer = new RendererStub();

  const imageEl = fixture.debugElement.query(By.directive(LazyDirective));
  lazyDirective = imageEl.injector.get<LazyDirective>(LazyDirective);
  elementRef = imageEl.injector.get<ElementRef>(ElementRef);

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
