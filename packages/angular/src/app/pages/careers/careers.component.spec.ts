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
let titleService: TitleService;
let apiService: ApiService;

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
    expect(titleService.setTitle).toHaveBeenCalled();
  });

  it('should call TitleService setTitle with argument', () => {
    expect(titleService.setTitle).toHaveBeenCalledWith(jasmine.any(String));
  });

  it('should call ApiService getCareers', () => {
    expect(apiService.getCareers).toHaveBeenCalledWith();
  });

  it('should set careers', () => {
    expect(comp.careers).toBeDefined();
    expect(comp.careers.length).toBe(3);
  });
});

function createComponent() {
  fixture = TestBed.createComponent(CareersComponent);
  comp = fixture.componentInstance;
  titleService = fixture.debugElement.injector.get(TitleService);
  apiService = fixture.debugElement.injector.get(ApiService);

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}
