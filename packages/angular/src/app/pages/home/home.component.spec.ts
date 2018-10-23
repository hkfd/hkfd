import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
  RouterTestingModule,
  MockMetaService,
  MockApiService,
  MockApiPipe,
  Data
} from 'testing';

import { MetaService, ApiService, Api } from 'shared';
import { HomeImages } from './home.images';
import { HomeComponent } from './home.component';

let comp: HomeComponent;
let fixture: ComponentFixture<HomeComponent>;
let metaService: MetaService;
let apiService: ApiService;
let apiPipe: jasmine.Spy;

describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent, MockApiPipe],
      providers: [
        { provide: MetaService, useClass: MockMetaService },
        { provide: ApiService, useClass: MockApiService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should call MetaService setMetaTags', () => {
    expect(metaService.setMetaTags).toHaveBeenCalled();
  });

  it('should call MetaService setMetaTags with no args', () => {
    expect(metaService.setMetaTags).toHaveBeenCalledWith({});
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
    expect((comp.caseStudies as Api.CaseStudy[]).length).toBe(2);
  });

  it('should call ApiPipe', () => {
    expect(apiPipe).toHaveBeenCalled();
  });

  it('should call ApiPipe with intro image', () => {
    expect(apiPipe).toHaveBeenCalledWith(HomeImages.intro);
  });

  it('should call ApiPipe with service thumbnails', () => {
    Data.Api.getServices<void>().forEach(service =>
      expect(apiPipe).toHaveBeenCalledWith(service.thumbnail)
    );
  });
});

function createComponent() {
  fixture = TestBed.createComponent(HomeComponent);
  comp = fixture.componentInstance;
  metaService = fixture.debugElement.injector.get<MetaService>(MetaService);
  apiService = fixture.debugElement.injector.get<ApiService>(ApiService);
  apiPipe = spyOn(MockApiPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}
