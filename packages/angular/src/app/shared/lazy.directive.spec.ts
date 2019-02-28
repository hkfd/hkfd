import { Component, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LazyDirective } from './lazy.directive';

let compHost: TestHostComponent;
let fixture: ComponentFixture<TestHostComponent>;
let lazyDirective: LazyDirective;
let mockPlatformId: 'browser' | 'server';

@Component({
  template: '<img src="" lazy (isVisible)="isVisible()">'
})
class TestHostComponent {
  isVisible() {}
}

describe('LazyDirective', () => {
  describe('', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));

    it('should create directive', () => {
      expect(lazyDirective).toBeTruthy();
    });
  });

  describe('`ngAfterViewInit`', () => {
    describe('browser', () => {
      beforeEach(() => (mockPlatformId = 'browser'));
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));

      it('should set `observer`', () => {
        lazyDirective.ngAfterViewInit();

        expect((lazyDirective as any).observer).toBeDefined();
      });
    });

    describe('server', () => {
      beforeEach(() => (mockPlatformId = 'server'));
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));

      it('should not set `observer`', () => {
        lazyDirective.ngAfterViewInit();

        expect((lazyDirective as any).observer).toBeUndefined();
      });
    });
  });

  describe('`ngOnDestroy`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() => lazyDirective.ngOnDestroy());

    it('should call `disconnectObserver`', () => {
      expect(lazyDirective.disconnectObserver).toHaveBeenCalled();
    });
  });

  describe('`disconnectObserver`', () => {
    describe('Has `observer`', () => {
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));
      beforeEach(() => {
        (lazyDirective as any).observer = { disconnect: jest.fn() };

        lazyDirective.disconnectObserver();
      });

      it('should call `observer` `disconnect`', () => {
        expect((lazyDirective as any).observer.disconnect).toHaveBeenCalled();
      });
    });
  });

  describe('`intersectionCallback`', () => {
    beforeEach(() => (mockPlatformId = 'server'));
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));

    describe('`isIntersecting` is `false`', () => {
      beforeEach(() =>
        lazyDirective.intersectionCallback([{ isIntersecting: false }] as any)
      );

      it('should not call `isVisible` `emit`', () => {
        expect(lazyDirective.isVisible.emit).not.toHaveBeenCalled();
      });

      it('should not call host component `isVisible`', () => {
        expect(compHost.isVisible).not.toHaveBeenCalled();
      });
    });

    describe('`isIntersecting` is `true`', () => {
      beforeEach(() =>
        lazyDirective.intersectionCallback([{ isIntersecting: true }] as any)
      );

      it('should call `isVisible` `emit` with `true` arg', () => {
        expect(lazyDirective.isVisible.emit).toHaveBeenCalledWith(true);
      });

      it('should call host component `isVisible`', () => {
        expect(compHost.isVisible).toHaveBeenCalled();
      });

      it('should call `disconnectObserver`', () => {
        expect(lazyDirective.disconnectObserver).toHaveBeenCalled();
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

function createComponent() {
  fixture = TestBed.createComponent(TestHostComponent);
  compHost = fixture.componentInstance;

  const imageEl = fixture.debugElement.query(By.directive(LazyDirective));
  lazyDirective = imageEl.injector.get<LazyDirective>(LazyDirective);
  jest.spyOn(lazyDirective, 'disconnectObserver');
  jest.spyOn(lazyDirective.isVisible, 'emit');
  jest.spyOn(compHost, 'isVisible');

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
