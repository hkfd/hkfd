import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  RouterTestingModule,
  MockTitleService,
  MockApiService,
  MockApiPipe
} from '../../../testing';

import { TitleService, ApiService, ApiPipe } from '../../shared/shared.module';
import { WorkComponent } from './work.component';

let comp: WorkComponent;
let fixture: ComponentFixture<WorkComponent>;
let titleService: TitleService;
let apiService: ApiService;
let apiPipe: ApiPipeStub;
let page: Page;

describe('WorkComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [WorkComponent],
      providers: [
        { provide: TitleService, useClass: MockTitleService },
        { provide: ApiService, useClass: MockApiService },
        { provide: ApiPipe, useClass: MockApiPipe }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should call TitleService setTitle', () => {
    expect(titleService.setTitle).toHaveBeenCalled();
  });

  it('should call TitleService setTitle with argument', () => {
    expect(titleService.setTitle).toHaveBeenCalledWith(jasmine.any(String));
  });

  it('should call ApiService getCaseStudies', () => {
    expect(apiService.getCaseStudies).toHaveBeenCalled();
  });

  it('should call ApiPipe', () => {
    expect(apiPipe.transform).toHaveBeenCalled();
  });

  it('should call ApiPipe with case study thumbnails', () => {
    comp.caseStudies.forEach(caseStudy =>
      expect(apiPipe.transform).toHaveBeenCalledWith(caseStudy.thumbnail)
    );
  });

  it('should set caseStudies', () => {
    expect(comp.caseStudies.length).toBe(3);
  });

  it('should set case study colour', () => {
    comp.caseStudies.forEach((caseStudy, index) =>
      expect(page.caseStudies[index].properties.className).toContain(
        caseStudy.colour
      )
    );
  });
});

function createComponent() {
  fixture = TestBed.createComponent(WorkComponent);
  comp = fixture.componentInstance;
  titleService = fixture.debugElement.injector.get(TitleService);
  apiService = fixture.debugElement.injector.get(ApiService);
  apiPipe = new ApiPipeStub();
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
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
  caseStudies: DebugElement[];

  addElements() {
    this.caseStudies = fixture.debugElement.queryAll(By.css('.case-study'));
  }
}
