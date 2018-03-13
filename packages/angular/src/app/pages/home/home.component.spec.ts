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

  it('should call ApiService getCaseStudies', () => {
    expect(apiService.getCaseStudies).toHaveBeenCalled();
  });

  it('should call ApiService getCaseStudies with true arg', () => {
    expect(apiService.getCaseStudies).toHaveBeenCalledWith(true);
  });

  it('should call ApiService getServices', () => {
    expect(apiService.getServices).toHaveBeenCalled();
  });

  it('should call ApiService getClients', () => {
    expect(apiService.getClients).toHaveBeenCalled();
  });

  it('should set clients', () => {
    expect(comp.clients).toBeDefined();
  });

  it('should set clients as comma-seperated string', () => {
    expect(comp.clients).toBe('client1, client2, client3');
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
