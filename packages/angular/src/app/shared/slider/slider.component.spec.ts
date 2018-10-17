import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
  discardPeriodicTasks
} from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';

import { Data } from 'testing';
import { SliderComponent } from './slider.component';

let comp: SliderComponent;
let fixture: ComponentFixture<SliderComponent>;
let page: Page;

describe('SliderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SliderComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should not call sliderInit without images', () => {
    comp.ngOnChanges({ images: new SimpleChange(null, null, false) });
    fixture.detectChanges();

    expect(page.sliderInit).not.toHaveBeenCalled();
  });

  it('should call sliderInit OnChanges', () => {
    comp.ngOnChanges({ images: new SimpleChange(null, comp.images, false) });
    fixture.detectChanges();

    expect(page.sliderInit).toHaveBeenCalled();
  });

  describe('sliderInit', () => {
    beforeEach(() => {
      comp.ngOnChanges({ images: new SimpleChange(null, comp.images, false) });
      fixture.detectChanges();
    });

    it('should be called', () => {
      expect(page.sliderInit).toHaveBeenCalled();
    });

    it('should set currentIndex', () => {
      expect(comp.currentIndex).toBeDefined();
    });

    it('should set currentIndex between 0 and 5 if random is true', () => {
      comp.random = true;
      comp.ngOnChanges({ images: new SimpleChange(null, comp.images, false) });

      expect(comp.currentIndex).toBeGreaterThanOrEqual(0);
      expect(comp.currentIndex).toBeLessThanOrEqual(5);
    });

    it('should set currentIndex as 0 if random is false', () => {
      comp.random = false;
      comp.ngOnChanges({ images: new SimpleChange(null, comp.images, false) });

      expect(comp.currentIndex).toBe(0);
    });

    it('should call startTimer', () => {
      expect(page.startTimer).toHaveBeenCalled();
    });
  });

  describe('startTimer', () => {
    it('should call changeImage if autoplay is true', fakeAsync(() => {
      comp.autoplay = true;
      comp.ngOnChanges({ images: new SimpleChange(null, comp.images, false) });
      tick(comp.delay);

      expect(page.changeImage).toHaveBeenCalled();
      discardPeriodicTasks();
    }));

    it('should not call changeImage if autoplay is false', fakeAsync(() => {
      comp.autoplay = false;
      comp.ngOnChanges({ images: new SimpleChange(null, comp.images, false) });
      tick(comp.delay);

      expect(page.changeImage).not.toHaveBeenCalled();
      discardPeriodicTasks();
    }));
  });

  describe('endTimer', () => {
    it('should stop changeImage calls', fakeAsync(() => {
      comp.autoplay = true;
      comp.ngOnChanges({ images: new SimpleChange(null, comp.images, false) });
      comp.endTimer();

      expect(page.changeImage).not.toHaveBeenCalled();
      discardPeriodicTasks();
    }));
  });

  describe('changeImage', () => {
    beforeEach(() => {
      comp.autoplay = false;
      comp.ngOnChanges({ images: new SimpleChange(null, comp.images, false) });

      expect(page.changeImage).not.toHaveBeenCalled();
    });

    it('should be called on next click', () => {
      page.sliderNext.click();

      expect(page.changeImage).toHaveBeenCalled();
    });

    it('should be called on previous click', () => {
      page.sliderPrev.click();

      expect(page.changeImage).toHaveBeenCalled();
    });

    it('should increment currentIndex on next click', () => {
      comp.currentIndex = 0;
      page.sliderNext.click();

      expect(comp.currentIndex).toBe(1);
    });

    it('should translate slide on next click', () => {
      comp.currentIndex = 0;
      page.sliderNext.click();
      fixture.detectChanges();

      expect(page.slideContainer.getAttribute('style')).toBe(
        'transform: translateX(-100%);'
      );
    });

    it('should decrement currentIndex on previous click', () => {
      comp.currentIndex = 1;
      page.sliderPrev.click();

      expect(comp.currentIndex).toBe(0);
    });

    it('should translate slide on previous click', () => {
      comp.currentIndex = 1;
      page.sliderPrev.click();
      fixture.detectChanges();

      expect(page.slideContainer.getAttribute('style')).toBe(
        'transform: translateX(0%);'
      );
    });

    it('should set currentIndex to first image on last next click', () => {
      comp.currentIndex = 4;
      page.sliderNext.click();

      expect(comp.currentIndex).toBe(0);
    });

    it('should set currentIndex to last image on first previous click', () => {
      comp.currentIndex = 0;
      page.sliderPrev.click();

      expect(comp.currentIndex).toBe(4);
    });
  });

  describe('mouseEnter', () => {
    it('should call endTimer', () => {
      comp.mouseEnter();

      expect(page.endTimer).toHaveBeenCalled();
    });
  });

  describe('mouseLeave', () => {
    it('should call startTimer if images', () => {
      comp.images = Data.Generic.images;
      comp.mouseLeave();

      expect(page.startTimer).toHaveBeenCalled();
    });

    it('should not call startTimer if no images', () => {
      (comp.images as any) = undefined;
      comp.mouseLeave();

      expect(page.startTimer).not.toHaveBeenCalled();
    });
  });
});

class Page {
  sliderInit: jasmine.Spy;
  startTimer: jasmine.Spy;
  endTimer: jasmine.Spy;
  changeImage: jasmine.Spy;

  get sliderNext() {
    return this.query<HTMLButtonElement>('.slider-next');
  }
  get sliderPrev() {
    return this.query<HTMLButtonElement>('.slider-prev');
  }
  get slideContainer() {
    return this.query<HTMLDivElement>('.slide-container');
  }

  constructor() {
    comp.images = Data.Generic.images;

    this.sliderInit = spyOn(comp, 'sliderInit').and.callThrough();
    this.startTimer = spyOn(comp, 'startTimer').and.callThrough();
    this.endTimer = spyOn(comp, 'endTimer').and.callThrough();
    this.changeImage = spyOn(comp, 'changeImage').and.callThrough();
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(SliderComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}
