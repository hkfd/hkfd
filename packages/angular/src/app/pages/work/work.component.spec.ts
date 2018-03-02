import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
  RouterTestingModule,
  MockTitleService,
  MockApiService
} from '../../../testing';

import { TitleService, ApiService } from '../../shared/shared.module';
import { WorkComponent } from './work.component';

let comp: WorkComponent;
let fixture: ComponentFixture<WorkComponent>;
let page: Page;

describe('WorkComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, NoopAnimationsModule],
        declarations: [WorkComponent],
        providers: [
          { provide: TitleService, useClass: MockTitleService },
          { provide: ApiService, useClass: MockApiService }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createComponent()));

  it('should call TitleService setTitle', () => {
    expect(page.titleService.setTitle).toHaveBeenCalled();
  });

  it('should call TitleService setTitle with argument', () => {
    expect(page.titleService.setTitle).toHaveBeenCalledWith(
      jasmine.any(String)
    );
  });

  it('should call ApiService getCaseStudies', () => {
    expect(page.apiService.getCaseStudies).toHaveBeenCalledWith();
  });

  it('should set caseStudies', () => {
    expect(comp.caseStudies).toBeDefined();
    expect(comp.caseStudies.length).toBe(2);
  });

  it('should set only non featured case studies', () =>
    comp.caseStudies.forEach(caseStudy =>
      expect(caseStudy).toEqual(jasmine.objectContaining({ featured: false }))
    ));
});

function createComponent() {
  fixture = TestBed.createComponent(WorkComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}

class Page {
  titleService: MockTitleService;
  apiService: MockApiService;

  constructor() {
    (<any>this.titleService) = fixture.debugElement.injector.get(TitleService);
    (<any>this.apiService) = fixture.debugElement.injector.get(ApiService);
  }
}
