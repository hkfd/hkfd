import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RouterTestingModule, MockApiPipe, Data } from 'testing';
import { ApiPipe } from 'shared';
import { SliderWorkComponent } from './slider-work.component';

let comp: SliderWorkComponent;
let fixture: ComponentFixture<SliderWorkComponent>;
let apiPipe: ApiPipeStub;
let page: Page;

describe('SliderWorkComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SliderWorkComponent],
      providers: [{ provide: ApiPipe, useClass: MockApiPipe }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should set caseStudies', () => {
    expect(comp.caseStudies).toBeDefined();
  });

  it('should set images', () => {
    expect(comp.images).toBeDefined();
  });

  it('should call ApiPipe', () => {
    expect(apiPipe.transform).toHaveBeenCalled();
  });

  it('should call ApiPipe with case study thumbnails', () => {
    comp.caseStudies.forEach(caseStudy =>
      expect(apiPipe.transform).toHaveBeenCalledWith(caseStudy.thumbnail)
    );
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
  apiPipe = new ApiPipeStub();
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}

class ApiPipeStub {
  transform: jasmine.Spy;

  constructor() {
    const apiPipe = fixture.debugElement.injector.get(ApiPipe);

    this.transform = spyOn(apiPipe, 'transform').and.callThrough();
  }
}

class Page {
  sliderInit: jasmine.Spy;

  constructor() {
    this.sliderInit = spyOn(comp, 'sliderInit').and.callThrough();

    comp.caseStudies = Data.Api.caseStudies;
  }
}
