import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
  RouterTestingModule,
  MockTitleService,
  MockApiService
} from '../../../testing';

import {
  TitleService,
  ApiService,
  CloudinaryPipe
} from '../../shared/shared.module';
import { AboutComponent } from './about.component';

let comp: AboutComponent;
let fixture: ComponentFixture<AboutComponent>;
let page: Page;

describe('AboutComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [AboutComponent, CloudinaryPipe],
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

  it('should call ApiService getTeam', () => {
    expect(page.apiService.getTeam).toHaveBeenCalledWith();
  });

  it('should set team', () => {
    expect(comp.team).toBeDefined();
    expect(comp.team.length).toBe(5);
  });
});

function createComponent() {
  fixture = TestBed.createComponent(AboutComponent);
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
