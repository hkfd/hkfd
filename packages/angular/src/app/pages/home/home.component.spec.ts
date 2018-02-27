import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import {
  MockTitleService,
  MockApiService
} from '../../../testing/testing.module';

import { TitleService, ApiService } from '../../shared/shared.module';
import { HomeComponent } from './home.component';

let comp: HomeComponent;
let fixture: ComponentFixture<HomeComponent>;
let page: Page;

describe('HomeComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [HomeComponent],
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
    expect(page.titleService.setTitleSpy.calls.any()).toBe(true);
  });
});

function createComponent() {
  fixture = TestBed.createComponent(HomeComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class Page {
  titleService: MockTitleService;
  apiService: MockApiService;

  pageServices: DebugElement[];

  constructor() {
    (<any>this.titleService) = fixture.debugElement.injector.get(TitleService);
    (<any>this.apiService) = fixture.debugElement.injector.get(ApiService);
  }

  addElements() {
    if (!comp.page) return;
    this.pageServices = fixture.debugElement.queryAll(By.css('.services'));
  }
}
