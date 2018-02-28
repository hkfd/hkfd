import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { casestudies } from '../../../../testing';
import { SliderWorkComponent } from './slider-work.component';

let comp: SliderWorkComponent;
let fixture: ComponentFixture<SliderWorkComponent>;
let page: Page;

describe('SliderWorkComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [SliderWorkComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createComponent()));

  it('should set caseStudies', () => {
    expect(comp.caseStudies).toBeDefined();
  });

  it('should set images', () => {
    expect(comp.images).toBeDefined();
  });

  it('should call sliderInit', () => {
    expect(page.sliderInit).toHaveBeenCalled();
  });

  it('should not set caseStudies if no input', () => {
    comp.caseStudies = null;

    expect(comp.caseStudies).toBeDefined();
  });
});

function createComponent() {
  fixture = TestBed.createComponent(SliderWorkComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}

class Page {
  sliderInit: jasmine.Spy;

  constructor() {
    this.sliderInit = spyOn(comp, 'sliderInit').and.callThrough();

    comp.caseStudies = casestudies;
  }
}
