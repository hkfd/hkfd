import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
  RouterTestingModule,
  MockTitleService,
  MockApiService,
  MockApiPipe,
  Data
} from 'testing';

import { TitleService, ApiService } from 'shared';
import { HomeImages } from './home.images';
import { HomeComponent } from './home.component';

let comp: HomeComponent;
let fixture: ComponentFixture<HomeComponent>;
let titleService: TitleService;
let apiService: ApiService;
let apiPipe: jasmine.Spy;

describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent, MockApiPipe],
      providers: [
        { provide: TitleService, useClass: MockTitleService },
        { provide: ApiService, useClass: MockApiService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

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

  it('should call ApiPipe', () => {
    expect(apiPipe).toHaveBeenCalled();
  });

  it('should call ApiPipe with intro image', () => {
    expect(apiPipe).toHaveBeenCalledWith(HomeImages.intro);
  });

  it('should call ApiPipe with service thumbnails', () => {
    Data.Api.services.forEach(service =>
      expect(apiPipe).toHaveBeenCalledWith(service.thumbnail)
    );
  });
});

function createComponent() {
  fixture = TestBed.createComponent(HomeComponent);
  comp = fixture.componentInstance;
  titleService = fixture.debugElement.injector.get(TitleService);
  apiService = fixture.debugElement.injector.get(ApiService);
  apiPipe = spyOn(MockApiPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}
