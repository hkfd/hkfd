import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
  discardPeriodicTasks
} from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';

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
    comp.ngOnChanges({ images: new SimpleChange(null, null, null) });
    fixture.detectChanges();

    expect(page.sliderInit).not.toHaveBeenCalled();
  });

  it('should call sliderInit OnChanges', () => {
    comp.ngOnChanges({ images: new SimpleChange(null, comp.images, null) });
    fixture.detectChanges();

    expect(page.sliderInit).toHaveBeenCalled();
  });

  describe('sliderInit', () => {
    beforeEach(() => {
      comp.ngOnChanges({ images: new SimpleChange(null, comp.images, null) });
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
      comp.ngOnChanges({ images: new SimpleChange(null, comp.images, null) });

      expect(comp.currentIndex).toBeGreaterThanOrEqual(0);
      expect(comp.currentIndex).toBeLessThanOrEqual(5);
    });

    it('should set currentIndex as 0 if random is false', () => {
      comp.random = false;
      comp.ngOnChanges({ images: new SimpleChange(null, comp.images, null) });

      expect(comp.currentIndex).toBe(0);
    });

    it('should call startTimer', () => {
      expect(page.startTimer).toHaveBeenCalled();
    });
  });

  describe('startTimer', () => {
    it(
      'should call changeImage if autoplay is true',
      fakeAsync(() => {
        comp.autoplay = true;
        comp.ngOnChanges({ images: new SimpleChange(null, comp.images, null) });
        tick(comp.delay);

        expect(page.changeImage).toHaveBeenCalled();
        discardPeriodicTasks();
      })
    );

    it(
      'should not call changeImage if autoplay is false',
      fakeAsync(() => {
        comp.autoplay = false;
        comp.ngOnChanges({ images: new SimpleChange(null, comp.images, null) });
        tick(comp.delay);

        expect(page.changeImage).not.toHaveBeenCalled();
        discardPeriodicTasks();
      })
    );
  });

  describe('endTimer', () => {
    it(
      'should stop changeImage calls',
      fakeAsync(() => {
        comp.autoplay = true;
        comp.ngOnChanges({ images: new SimpleChange(null, comp.images, null) });
        comp.endTimer();

        expect(page.changeImage).not.toHaveBeenCalled();
        discardPeriodicTasks();
      })
    );
  });

  describe('changeImage', () => {
    beforeEach(() => {
      comp.autoplay = false;
      comp.ngOnChanges({ images: new SimpleChange(null, comp.images, null) });

      expect(page.changeImage).not.toHaveBeenCalled();
    });

    it('should be called on next click', () => {
      page.sliderNext.triggerEventHandler('click', null);

      expect(page.changeImage).toHaveBeenCalled();
    });

    it('should be called on previous click', () => {
      page.sliderPrev.triggerEventHandler('click', null);

      expect(page.changeImage).toHaveBeenCalled();
    });

    it('should increment currentIndex on next click', () => {
      comp.currentIndex = 0;
      page.sliderNext.triggerEventHandler('click', null);

      expect(comp.currentIndex).toBe(1);
    });

    it('should translate slide on next click', () => {
      comp.currentIndex = 0;
      page.sliderNext.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(page.slideContainer.styles).toEqual({
        transform: 'translateX(-100%)'
      });
    });

    it('should decrement currentIndex on previous click', () => {
      comp.currentIndex = 1;
      page.sliderPrev.triggerEventHandler('click', null);

      expect(comp.currentIndex).toBe(0);
    });

    it('should translate slide on previous click', () => {
      comp.currentIndex = 1;
      page.sliderPrev.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(page.slideContainer.styles).toEqual({
        transform: 'translateX(0%)'
      });
    });

    it('should set currentIndex to first image on last next click', () => {
      comp.currentIndex = 4;
      page.sliderNext.triggerEventHandler('click', null);

      expect(comp.currentIndex).toBe(0);
    });

    it('should set currentIndex to last image on first previous click', () => {
      comp.currentIndex = 0;
      page.sliderPrev.triggerEventHandler('click', null);

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
      comp.images = null;
      comp.mouseLeave();

      expect(page.startTimer).not.toHaveBeenCalled();
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(SliderComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}

class Page {
  sliderInit: jasmine.Spy;
  startTimer: jasmine.Spy;
  endTimer: jasmine.Spy;
  changeImage: jasmine.Spy;

  sliderNext: DebugElement;
  sliderPrev: DebugElement;
  slideContainer: DebugElement;

  constructor() {
    comp.images = Data.Generic.images;

    this.sliderInit = spyOn(comp, 'sliderInit').and.callThrough();
    this.startTimer = spyOn(comp, 'startTimer').and.callThrough();
    this.endTimer = spyOn(comp, 'endTimer').and.callThrough();
    this.changeImage = spyOn(comp, 'changeImage').and.callThrough();

    this.sliderNext = fixture.debugElement.query(By.css('.slider-next'));
    this.sliderPrev = fixture.debugElement.query(By.css('.slider-prev'));
    this.slideContainer = fixture.debugElement.query(
      By.css('.slide-container')
    );
  }
}
