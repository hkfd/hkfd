import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
  RouterTestingModule,
  MockTitleService,
  MockApiService
} from '../../../testing';

import { TitleService, ApiService } from '../../shared/shared.module';
import { HomeComponent } from './home.component';

let comp: HomeComponent;
let fixture: ComponentFixture<HomeComponent>;
let titleService: TitleService;
let apiService: ApiService;

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
    expect(titleService.setTitle).toHaveBeenCalled();
  });

  it('should call TitleService setTitle with no argument', () => {
    expect(titleService.setTitle).toHaveBeenCalledWith();
  });

  it('should call ApiService getServices', () => {
    expect(apiService.getServices).toHaveBeenCalled();
  });

  it('should call ApiService getClients', () => {
    expect(apiService.getClients).toHaveBeenCalled();
  });

  it('should call ApiService getCaseStudies', () => {
    expect(apiService.getCaseStudies).toHaveBeenCalled();
  });

  it('should set caseStudies', () => {
    expect(comp.caseStudies).toBeDefined();
  });

  it('should set featured caseStudies only', () => {
    expect(comp.caseStudies.length).toBe(2);
  });
});

function createComponent() {
  fixture = TestBed.createComponent(HomeComponent);
  comp = fixture.componentInstance;
  titleService = fixture.debugElement.injector.get(TitleService);
  apiService = fixture.debugElement.injector.get(ApiService);

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}
