import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  RouterTestingModule,
  MockMetaService,
  MockApiService,
  MockApiPipe
} from 'testing';

import { MetaService, ApiService, ApiPipe, Api } from 'shared';
import { WorkComponent } from './work.component';

let comp: WorkComponent;
let fixture: ComponentFixture<WorkComponent>;
let metaService: MetaService;
let apiService: ApiService;
let apiPipe: ApiPipeStub;
let page: Page;

describe('WorkComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [WorkComponent],
      providers: [
        { provide: MetaService, useClass: MockMetaService },
        { provide: ApiService, useClass: MockApiService },
        { provide: ApiPipe, useClass: MockApiPipe }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should call MetaService setMetaTags', () => {
    expect(metaService.setMetaTags).toHaveBeenCalled();
  });

  it('should call MetaService setMetaTags with title and url args', () => {
    expect(metaService.setMetaTags).toHaveBeenCalledWith({
      title: jasmine.any(String),
      url: jasmine.any(String)
    });
  });

  it('should call ApiService getCaseStudies', () => {
    expect(apiService.getCaseStudies).toHaveBeenCalled();
  });

  it('should call ApiPipe', () => {
    expect(apiPipe.transform).toHaveBeenCalled();
  });

  it('should call ApiPipe with case study thumbnails', () => {
    (comp.caseStudies as Api.CaseStudy[]).forEach(caseStudy =>
      expect(apiPipe.transform).toHaveBeenCalledWith(caseStudy.thumbnail)
    );
  });

  it('should set caseStudies', () => {
    expect((comp.caseStudies as Api.CaseStudy[]).length).toBe(3);
  });

  it('should set case study colour', () => {
    (comp.caseStudies as Api.CaseStudy[]).forEach((caseStudy, index) =>
      expect(page.caseStudies[index].properties.className).toContain(
        caseStudy.colour
      )
    );
  });
});

class ApiPipeStub {
  transform: jasmine.Spy;

  constructor() {
    const apiPipeInstance = fixture.debugElement.injector.get(ApiPipe);

    this.transform = spyOn(apiPipeInstance, 'transform').and.callThrough();
  }
}

class Page {
  caseStudies!: DebugElement[];

  addElements() {
    this.caseStudies = fixture.debugElement.queryAll(By.css('.case-study'));
  }
}

function createComponent() {
  fixture = TestBed.createComponent(WorkComponent);
  comp = fixture.componentInstance;
  metaService = fixture.debugElement.injector.get<MetaService>(MetaService);
  apiService = fixture.debugElement.injector.get<ApiService>(ApiService);
  apiPipe = new ApiPipeStub();
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}
