import {
  Component,
  PLATFORM_ID,
  NgZone,
  ChangeDetectorRef
} from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StubImageComponent, Data } from 'testing';
import { InteractionError } from 'shared';
import { SliderComponent } from './slider.component';

let compHost: TestHostComponent;
let comp: SliderComponent;
let fixture: ComponentFixture<TestHostComponent>;
let changeDetectorRef: ChangeDetectorRef;
let mockPlatformId: 'browser' | 'server';
let ngZone: NgZone;
let page: Page;

@Component({
  selector: 'app-host',
  template: `
    <slider
      [images]="images"
      [random]="random"
      [autoplay]="autoplay"
      [delay]="delay"
    >
      <main>Content</main>
    </slider>
  `
})
class TestHostComponent {
  images: any;
  random: any;
  autoplay: any;
  delay: any;
}

beforeEach(jest.clearAllMocks);

describe('SliderComponent', () => {
  describe('', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));

    it('should create component', () => {
      expect(comp).toBeTruthy();
    });

    describe('`images`', () => {
      describe('Has `images`', () => {
        beforeEach(() => {
          compHost.images = Data.Generic.getImages();
          fixture.detectChanges();
        });

        it('should be set', () => {
          expect(comp.images).toEqual(Data.Generic.getImages());
        });

        it('should set `slidesCount` as `images.length`', () => {
          expect(comp.slidesCount).toBe(Data.Generic.getImages().length);
        });

        it('should call `sliderInit`', () => {
          expect(comp.sliderInit).toHaveBeenCalled();
        });
      });

      describe('No `images`', () => {
        beforeEach(() => {
          compHost.images = null;
          fixture.detectChanges();
        });

        it('should be `undefined`', () => {
          expect(comp.images).toEqual(undefined);
        });

        it('should not set `slidesCount`', () => {
          expect(comp.slidesCount).toBe(undefined);
        });

        it('should not call `sliderInit`', () => {
          expect(comp.sliderInit).not.toHaveBeenCalled();
        });
      });
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
  });

  describe('`ngOnDestroy`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));

    it('should call `endTimer`', () => {
      comp.ngOnDestroy();

      expect(comp.endTimer).toHaveBeenCalled();
    });
  });

  describe('`sliderInit`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));

    describe('No `slidesCount`', () => {
      beforeEach(() => (comp.slidesCount = undefined));

      it('should throw error', () => {
        expect(() => comp.sliderInit()).toThrowError('No `slidesCount`');
      });
    });

    describe('Has `slidesCount`', () => {
      beforeEach(() => (comp.slidesCount = 1));

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

        it('should set `currentIndex` as number between `0` and `slidesCount`', () => {
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

        expect(comp.startTimer).toHaveBeenCalled();
      });
    });
  });

  describe('`endTimer`', () => {
    describe('browser', () => {
      beforeEach(() => (mockPlatformId = 'browser'));
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));
      beforeEach(() => {
        (comp.clearInterval as jest.Mock).mockReturnValue('clearIntervalFn');
        comp.endTimer();
      });

      it('should call `NgZone` `runOutsideAngular` with `clearInterval` arg', () => {
        const [
          fnArg
        ] = (ngZone.runOutsideAngular as jest.Mock).mock.calls.pop() as any;

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
        (comp.setInterval as jest.Mock).mockReturnValue('setIntervalFn');

        comp.startTimer();
      });

      it('should call `NgZone` `runOutsideAngular` with `setInterval` arg', () => {
        const [
          fnArg
        ] = (ngZone.runOutsideAngular as jest.Mock).mock.calls.pop() as any;

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
      expect(window.clearInterval).toHaveBeenCalledWith('timer');
    });
  });

  describe('`setInterval`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() => {
      (comp as any).timer = undefined;
      comp.delay = 0;
      (comp.intervalChangeImage as jest.Mock).mockReturnValue(
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
      ] = (window.setInterval as jest.Mock).mock.calls.pop() as any;

      expect(fnArg()).toBe('intervalChangeImageFn');
      expect(delayArg).toEqual([0]);
    });
  });

  describe('`intervalChangeImage`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() => {
      (comp.changeImage as jest.Mock).mockReturnValue('changeImageFn');

      comp.intervalChangeImage();
    });

    it('should call `NgZone` `run` with `changeImage` arg', () => {
      const [fnArg] = (ngZone.run as jest.Mock).mock.calls.pop() as any;

      expect(fnArg()).toBe('changeImageFn');
    });
  });

  describe('`changeImage`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() => {
      (comp.sliderInit as jest.Mock).mockImplementation(() => undefined);
      comp.images = Data.Generic.getImages();
    });

    describe('No `slidesCount`', () => {
      beforeEach(() => (comp.slidesCount = undefined));

      it('should throw error', () => {
        expect(() => comp.changeImage()).toThrowError(
          InteractionError,
          'No `slidesCount`'
        );
      });
    });

    describe('Has `slidesCount`', () => {
      beforeEach(() => (comp.slidesCount = Data.Generic.getImages().length));

      it('should call `ChangeDetectorRef` `markForCheck`', () => {
        comp.changeImage(0);

        expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
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
  });

  describe('`mouseEnter`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() => {
      (comp.endTimer as jest.Mock).mockImplementation(() => undefined);
      comp.images = Data.Generic.getImages();

      comp.mouseEnter();
    });

    it('should call `endTimer`', () => {
      expect(comp.endTimer).toHaveBeenCalled();
    });
  });

  describe('`mouseLeave`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() =>
      (comp.startTimer as jest.Mock).mockImplementation(() => undefined)
    );

    describe('Has `images`', () => {
      beforeEach(() => {
        comp.images = Data.Generic.getImages();

        comp.mouseLeave();
      });

      it('should call `startTimer`', () => {
        expect(comp.startTimer).toHaveBeenCalled();
      });
    });

    describe('No `images`', () => {
      beforeEach(() => {
        (comp.images as any) = undefined;

        comp.mouseLeave();
      });

      it('should not call `startTimer`', () => {
        expect(comp.startTimer).not.toHaveBeenCalled();
      });
    });
  });

  describe('Template', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));
    beforeEach(() => {
      compHost.images = Data.Generic.getImages();
      fixture.detectChanges();
    });

    describe('Nav', () => {
      describe('Prev', () => {
        it('should be displayed', () => {
          expect(page.sliderPrev).toBeTruthy();
        });

        it('should call `changeImage` on click with `-1` arg', () => {
          page.sliderPrev.click();

          expect(comp.changeImage).toHaveBeenCalledWith(-1);
        });
      });

      describe('Next', () => {
        it('should be displayed', () => {
          expect(page.sliderNext).toBeTruthy();
        });

        it('should call `changeImage` on click with `1` arg', () => {
          page.sliderNext.click();

          expect(comp.changeImage).toHaveBeenCalledWith(1);
        });
      });
    });

    describe('Projected content', () => {
      it('should be displayed', () => {
        expect(page.projectedContent.textContent).toBe('Content');
      });
    });

    describe('Container', () => {
      describe('No `images`', () => {
        beforeEach(() => {
          (comp as any)._images = undefined;
          changeDetectorRef.markForCheck();
          fixture.detectChanges();
        });

        it('should not be displayed', () => {
          expect(page.slideContainer).toBeFalsy();
        });
      });

      describe('Has `images`', () => {
        beforeEach(() => {
          compHost.images = Data.Generic.getImages();
          fixture.detectChanges();
        });

        it('should be displayed', () => {
          expect(page.slideContainer).toBeTruthy();
        });

        it('should set style transform as `currentIndex` translate', () => {
          comp.currentIndex = 5;
          changeDetectorRef.markForCheck();
          fixture.detectChanges();

          expect(page.slideContainer.style.transform).toBe(
            `translateX(${5 * -100}%)`
          );
        });

        describe('Slides', () => {
          it('should be displayed', () => {
            expect(page.slides.length).toBe(Data.Generic.getImages().length);
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
                expect(
                  page.slideImage.hasAttribute('full-height')
                ).toBeTruthy();
              });
            });
          });
        });
      });
    });
  });
});

class Page {
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
    jest.spyOn(comp, 'sliderInit');
    jest.spyOn(comp, 'startTimer');
    jest.spyOn(comp, 'setInterval');
    jest.spyOn(comp, 'endTimer');
    jest.spyOn(comp, 'changeImage');
    jest.spyOn(comp, 'clearInterval');
    jest.spyOn(comp, 'intervalChangeImage');
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
  const el = fixture.debugElement.query(By.directive(SliderComponent));
  comp = el.componentInstance;
  changeDetectorRef = (comp as any).changeDetectorRef;
  global.clearInterval = jest.fn();
  jest.spyOn(global, 'setInterval').mockImplementation(() => 'setInterval');
  ngZone = fixture.debugElement.injector.get<NgZone>(NgZone);
  ngZone.runOutsideAngular = jest.fn().mockImplementation((fn: any) => fn());
  ngZone.run = jest.fn().mockImplementation((fn: any) => fn());
  page = new Page();

  jest.spyOn(changeDetectorRef, 'markForCheck');

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
