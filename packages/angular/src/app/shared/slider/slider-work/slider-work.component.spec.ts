import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RouterTestingModule, MockServerPipe, Data } from '../../../../testing';
import { ServerPipe } from '../../shared.module';
import { SliderWorkComponent } from './slider-work.component';

let comp: SliderWorkComponent;
let fixture: ComponentFixture<SliderWorkComponent>;
let serverPipe: ServerPipeStub;
let page: Page;

describe('SliderWorkComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [SliderWorkComponent],
        providers: [{ provide: ServerPipe, useClass: MockServerPipe }],
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

  it('should call ServerPipe', () => {
    expect(serverPipe.transform).toHaveBeenCalled();
  });

  it('should call ServerPipe with case study thumbnails', () => {
    comp.caseStudies.forEach(caseStudy =>
      expect(serverPipe.transform).toHaveBeenCalledWith(caseStudy.thumbnail)
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
  serverPipe = new ServerPipeStub();
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}

class ServerPipeStub {
  transform: jasmine.Spy;

  constructor() {
    const serverPipe = fixture.debugElement.injector.get(ServerPipe);

    this.transform = spyOn(serverPipe, 'transform').and.callThrough();
  }
}

class Page {
  sliderInit: jasmine.Spy;

  constructor() {
    this.sliderInit = spyOn(comp, 'sliderInit').and.callThrough();

    comp.caseStudies = Data.Server.caseStudies;
  }
}
