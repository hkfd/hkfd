import { Component, PLATFORM_ID, NgZone } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StubImageComponent, Data } from 'testing';
import { SliderComponent } from './slider.component';

let compHost: TestHostComponent;
let comp: SliderComponent;
let fixture: ComponentFixture<TestHostComponent>;
let mockPlatformId: 'browser' | 'server';
let windowStub: WindowStub;
let ngZone: NgZoneStub;
let page: Page;

@Component({
  selector: 'app-host',
  template: `
    <slider
      [images]="images"
      [random]="random"
      [autoplay]="autoplay"
      [delay]="delay"
      ><main>Content</main></slider
    >
  `
})
class TestHostComponent {
  images: any;
  random: any;
  autoplay: any;
  delay: any;
}

describe('SliderComponent', () => {
  describe('', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));

    it('should create component', () => {
      expect(comp).toBeTruthy();
    });

    it('should set `images`', () => {
      compHost.images = Data.Generic.getImages();
      fixture.detectChanges();

      expect(comp.images).toEqual(Data.Generic.getImages());
    });

    it('should set `delay`', () => {
      compHost.delay = 1;
      fixture.detectChanges();

      expect(comp.delay).toBe(1);
    });

    it('should set `autoplay`', () => {
      compHost.autoplay = true;
      fixture.detectChanges();

      expect(comp.autoplay).toBe(true);
    });

    it('should set `random`', () => {
      compHost.random = true;
      fixture.detectChanges();

      expect(comp.random).toBe(true);
    });

    it('should not call `sliderInit`', () => {
      expect(page.sliderInit).not.toHaveBeenCalled();
    });
  });

  describe('`ngOnchanges`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));

    describe('no `images`', () => {
      beforeEach(() => comp.ngOnChanges({}));

      it('should not call `sliderInit`', () => {
        expect(page.sliderInit).not.toHaveBeenCalled();
      });
    });

    describe('no `images.currentValue`', () => {
      beforeEach(() => comp.ngOnChanges({ images: {} as any }));

      it('should not call `sliderInit`', () => {
        expect(page.sliderInit).not.toHaveBeenCalled();
      });
    });

    describe('`images` and `images.currentValue`', () => {
      beforeEach(() =>
        comp.ngOnChanges({
          images: { currentValue: Data.Generic.getImages() } as any
        })
      );

      it('should call `sliderInit`', () => {
        expect(page.sliderInit).toHaveBeenCalled();
      });
    });
  });

  describe('`ngOnDestroy`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));

    it('should call `endTimer`', () => {
      comp.ngOnDestroy();

      expect(page.endTimer).toHaveBeenCalled();
    });
  });

  describe('`sliderInit`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));

    describe('`random` is `true`', () => {
      beforeEach(() => {
        comp.random = true;
        comp.images = [{}] as any;
      });

      it('should set `currentIndex`', () => {
        comp.currentIndex = undefined as any;
        comp.sliderInit();

        expect(comp.currentIndex).toBeDefined();
      });

      it('should set `currentIndex` as number between `0` and `images.length`', () => {
        comp.currentIndex = undefined as any;
        comp.sliderInit();

        expect(comp.currentIndex).toBeLessThanOrEqual(1);
        expect(comp.currentIndex).toBeGreaterThanOrEqual(0);
      });
    });

    describe('`random` is `false`', () => {
      beforeEach(() => (comp.random = false));

      it('should not set `currentIndex`', () => {
        comp.currentIndex = undefined as any;
        comp.sliderInit();

        expect(comp.currentIndex).toBeUndefined();
      });
    });

    it('should call `startTimer`', () => {
      comp.sliderInit();

      expect(page.startTimer).toHaveBeenCalled();
    });
  });

  describe('`endTimer`', () => {
    describe('browser', () => {
      beforeEach(() => (mockPlatformId = 'browser'));
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));
      beforeEach(() => {
        (comp.clearInterval as jasmine.Spy).and.returnValue('clearIntervalFn');
        comp.endTimer();
      });

      it('should call `NgZone` `runOutsideAngular` with `clearInterval` arg', () => {
        const [fnArg] = ngZone.runOutsideAngular.calls.mostRecent().args;

        expect(fnArg()).toBe('clearIntervalFn');
      });
    });

    describe('server', () => {
      beforeEach(() => (mockPlatformId = 'server'));
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));
      beforeEach(() => comp.endTimer());

      it('should not call `NgZone` `runOutsideAngular`', () => {
        expect(ngZone.runOutsideAngular).not.toHaveBeenCalled();
      });
    });
  });

  describe('`startTimer`', () => {
    describe('`autoplay` is `true` and browser', () => {
      beforeEach(() => (mockPlatformId = 'browser'));
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));
      beforeEach(() => {
        comp.autoplay = true;
        (comp.setInterval as jasmine.Spy).and.returnValue('setIntervalFn');

        comp.startTimer();
      });

      it('should call `NgZone` `runOutsideAngular` with `setInterval` arg', () => {
        const [fnArg] = ngZone.runOutsideAngular.calls.mostRecent().args;

        expect(fnArg()).toBe('setIntervalFn');
      });
    });

    describe('`autoplay` is `true` and server', () => {
      beforeEach(() => (mockPlatformId = 'server'));
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));
      beforeEach(() => {
        comp.autoplay = true;

        comp.startTimer();
      });

      it('should not call `NgZone` `runOutsideAngular`', () => {
        expect(ngZone.runOutsideAngular).not.toHaveBeenCalled();
      });
    });

    describe('`autoplay` is `false` and server', () => {
      beforeEach(() => (mockPlatformId = 'server'));
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));
      beforeEach(() => {
        comp.autoplay = false;

        comp.startTimer();
      });

      it('should not call `NgZone` `runOutsideAngular`', () => {
        expect(ngZone.runOutsideAngular).not.toHaveBeenCalled();
      });
    });

    describe('`autoplay` is `false` and browser', () => {
      beforeEach(() => (mockPlatformId = 'browser'));
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));
      beforeEach(() => {
        comp.autoplay = false;

        comp.startTimer();
      });

      it('should not call `NgZone` `runOutsideAngular`', () => {
        expect(ngZone.runOutsideAngular).not.toHaveBeenCalled();
      });
    });
  });

  describe('`clearInterval`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() => {
      (comp as any).timer = 'timer';

      comp.clearInterval();
    });

    it('should call `window` `clearInterval` with `timer` arg', () => {
      expect(windowStub.clearInterval).toHaveBeenCalledWith('timer');
    });
  });

  describe('`setInterval`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() => {
      (comp as any).timer = undefined;
      comp.delay = 0;
      (comp.intervalChangeImage as jasmine.Spy).and.returnValue(
        'intervalChangeImageFn'
      );

      comp.setInterval();
    });

    it('should set `timer`', () => {
      expect((comp as any).timer).toBeDefined();
    });

    it('should call `window` `setInterval` with `intervalChangeImage` and `delay` args', () => {
      const [
        fnArg,
        ...delayArg
      ] = windowStub.setInterval.calls.mostRecent().args;

      expect(fnArg()).toBe('intervalChangeImageFn');
      expect(delayArg).toEqual([0]);
    });
  });

  describe('`intervalChangeImage`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() => {
      (comp.changeImage as jasmine.Spy).and.returnValue('changeImageFn');

      comp.intervalChangeImage();
    });

    it('should call `NgZone` `run` with `changeImage` arg', () => {
      const [fnArg] = ngZone.run.calls.mostRecent().args;

      expect(fnArg()).toBe('changeImageFn');
    });
  });

  describe('`changeImage`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() => {
      (comp.sliderInit as jasmine.Spy).and.callFake(() => undefined);
      comp.images = Data.Generic.getImages();
    });

    it('should set `currentIndex` as `currentIndex` add `offset` if positive `offset` arg', () => {
      comp.currentIndex = 0;
      comp.changeImage(2);

      expect(comp.currentIndex).toBe(2);
    });

    it('should set `currentIndex` as `currentIndex` subtract `offset` if negative `offset` arg', () => {
      comp.currentIndex = 2;
      comp.changeImage(-2);

      expect(comp.currentIndex).toBe(0);
    });

    it('should increment `currentIndex` if no arg', () => {
      comp.currentIndex = 0;
      comp.changeImage();

      expect(comp.currentIndex).toBe(1);
    });

    describe('`currentIndex` is `0`', () => {
      it('should set `currentIndex` as last `images` if `-1` arg', () => {
        comp.currentIndex = 0;
        comp.changeImage(-1);

        expect(comp.currentIndex).toBe(Data.Generic.getImages().length - 1);
      });

      it('should set `currentIndex` as `1` if `1` arg', () => {
        comp.currentIndex = 0;
        comp.changeImage(1);

        expect(comp.currentIndex).toBe(1);
      });
    });

    describe('`currentIndex` is last `images`', () => {
      it('should set `currentIndex` as `0` if `1` arg', () => {
        comp.currentIndex = Data.Generic.getImages().length - 1;
        comp.changeImage(1);

        expect(comp.currentIndex).toBe(0);
      });

      it('should set `currentIndex` as second to last `images` if `-1` arg', () => {
        comp.currentIndex = Data.Generic.getImages().length - 1;
        comp.changeImage(-1);

        expect(comp.currentIndex).toBe(Data.Generic.getImages().length - 2);
      });
    });
  });

  describe('`mouseEnter`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() => {
      (comp.endTimer as jasmine.Spy).and.callFake(() => undefined);
      comp.images = Data.Generic.getImages();

      comp.mouseEnter();
    });

    it('should call `endTimer`', () => {
      expect(page.endTimer).toHaveBeenCalled();
    });
  });

  describe('`mouseLeave`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() =>
      (comp.startTimer as jasmine.Spy).and.callFake(() => undefined)
    );

    describe('Has `images`', () => {
      beforeEach(() => {
        comp.images = Data.Generic.getImages();

        comp.mouseLeave();
      });

      it('should call `startTimer`', () => {
        expect(page.startTimer).toHaveBeenCalled();
      });
    });

    describe('No `images`', () => {
      beforeEach(() => {
        (comp.images as any) = undefined;

        comp.mouseLeave();
      });

      it('should not call `startTimer`', () => {
        expect(page.startTimer).not.toHaveBeenCalled();
      });
    });
  });

  describe('Template', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() => {
      comp.images = Data.Generic.getImages();
      fixture.detectChanges();
    });

    describe('Nav', () => {
      describe('Prev', () => {
        it('should be displayed', () => {
          expect(page.sliderPrev).toBeTruthy();
        });

        it('should call `changeImage` on click with `-1` arg', () => {
          page.sliderPrev.click();

          expect(page.changeImage).toHaveBeenCalledWith(-1);
        });
      });

      describe('Next', () => {
        it('should be displayed', () => {
          expect(page.sliderNext).toBeTruthy();
        });

        it('should call `changeImage` on click with `1` arg', () => {
          page.sliderNext.click();

          expect(page.changeImage).toHaveBeenCalledWith(1);
        });
      });
    });

    describe('Projected content', () => {
      it('should be displayed', () => {
        expect(page.projectedContent.textContent).toBe('Content');
      });
    });

    describe('Slides', () => {
      it('should be displayed', () => {
        expect(page.slides.length).toBe(Data.Generic.getImages().length);
      });

      it('should set style transform as `currentIndex` translate', () => {
        comp.currentIndex = 5;
        fixture.detectChanges();

        expect(page.slideContainer.style.transform).toBe(
          `translateX(${5 * -100}%)`
        );
      });

      describe('Slide', () => {
        describe('Image', () => {
          it('should be displayed', () => {
            expect(page.slideImage).toBeTruthy();
          });

          it('should set `ImageComponent` `image` as `image`', () => {
            expect(page.imageComponent.image).toEqual(
              Data.Generic.getImages()[0]
            );
          });

          it('should set `ImageComponent` `full-height` attribute', () => {
            expect(page.slideImage.hasAttribute('full-height')).toBeTruthy();
          });
        });
      });
    });
  });
});

class WindowStub {
  clearInterval: jasmine.Spy;
  setInterval: jasmine.Spy;

  constructor() {
    this.clearInterval = spyOn(window, 'clearInterval').and.callFake(
      () => undefined
    );
    this.setInterval = spyOn(window, 'setInterval').and.callThrough();
  }
}

class NgZoneStub {
  runOutsideAngular: jasmine.Spy;
  run: jasmine.Spy;

  constructor() {
    const ngZoneInstance = fixture.debugElement.injector.get<NgZone>(NgZone);
    this.runOutsideAngular = spyOn(
      ngZoneInstance,
      'runOutsideAngular'
    ).and.callFake((fn: any) => fn());
    this.run = spyOn(ngZoneInstance, 'run').and.callFake((fn: any) => fn());
  }
}

class Page {
  sliderInit: jasmine.Spy;
  startTimer: jasmine.Spy;
  setInterval: jasmine.Spy;
  intervalChangeImage: jasmine.Spy;
  endTimer: jasmine.Spy;
  clearInterval: jasmine.Spy;
  changeImage: jasmine.Spy;

  get sliderPrev() {
    return this.query<HTMLButtonElement>('.slider-prev');
  }
  get sliderNext() {
    return this.query<HTMLButtonElement>('.slider-next');
  }
  get projectedContent() {
    return this.query<HTMLElement>('main');
  }
  get slideContainer() {
    return this.query<HTMLDivElement>('.slide-container');
  }
  get slides() {
    return this.queryAll<HTMLDivElement>('.slide');
  }
  get slideImage() {
    return this.query<HTMLElement>('.slide image-component');
  }

  get imageComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubImageComponent)
    );
    return directiveEl.injector.get<StubImageComponent>(StubImageComponent);
  }

  constructor() {
    this.sliderInit = spyOn(comp, 'sliderInit').and.callThrough();
    this.startTimer = spyOn(comp, 'startTimer').and.callThrough();
    this.setInterval = spyOn(comp, 'setInterval').and.callThrough();
    this.intervalChangeImage = spyOn(
      comp,
      'intervalChangeImage'
    ).and.callThrough();
    this.endTimer = spyOn(comp, 'endTimer').and.callThrough();
    this.changeImage = spyOn(comp, 'changeImage').and.callThrough();
    this.clearInterval = spyOn(comp, 'clearInterval').and.callThrough();
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

function setupTest() {
  TestBed.configureTestingModule({
    declarations: [TestHostComponent, SliderComponent, StubImageComponent],
    providers: [{ provide: PLATFORM_ID, useValue: mockPlatformId }]
  }).compileComponents();
}

function createComponent() {
  fixture = TestBed.createComponent(TestHostComponent);
  compHost = fixture.componentInstance;
  comp = fixture.debugElement.query(By.directive(SliderComponent))
    .componentInstance;
  windowStub = new WindowStub();
  ngZone = new NgZoneStub();
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
