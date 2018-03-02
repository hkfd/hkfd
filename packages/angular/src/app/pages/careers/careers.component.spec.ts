import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
  RouterTestingModule,
  MockTitleService,
  MockApiService
} from '../../../testing';

import { TitleService, ApiService } from '../../shared/shared.module';
import { CareersComponent } from './careers.component';

let comp: CareersComponent;
let fixture: ComponentFixture<CareersComponent>;
let page: Page;

describe('CareersComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [CareersComponent],
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

  it('should call ApiService getCareers', () => {
    expect(page.apiService.getCareers).toHaveBeenCalledWith();
  });

  it('should set careers', () => {
    expect(comp.careers).toBeDefined();
    expect(comp.careers.length).toBe(3);
  });
});

function createComponent() {
  fixture = TestBed.createComponent(CareersComponent);
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
