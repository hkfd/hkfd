import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
  RouterTestingModule,
  MockMetaService,
  MockApiService,
  MockApiPipe
} from 'testing';

import { MetaService, ApiService } from 'shared';
import { CareersImages } from './careers.images';
import { CareersComponent } from './careers.component';

let comp: CareersComponent;
let fixture: ComponentFixture<CareersComponent>;
let metaService: MetaService;
let apiService: ApiService;
let apiPipe: jasmine.Spy;

describe('CareersComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CareersComponent, MockApiPipe],
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

  it('should call MetaService setMetaTags with title and url args', () => {
    expect(metaService.setMetaTags).toHaveBeenCalledWith({
      title: jasmine.any(String),
      url: jasmine.any(String)
    });
  });

  it('should call ApiService getCareers', () => {
    expect(apiService.getCareers).toHaveBeenCalledWith();
  });

  it('should set careers', () => {
    expect(comp.careers).toBeDefined();
    expect(comp.careers.length).toBe(3);
  });

  it('should call ApiPipe', () => {
    expect(apiPipe).toHaveBeenCalled();
  });

  it('should call ApiPipe with hiring image', () => {
    expect(apiPipe).toHaveBeenCalledWith(CareersImages.hiring);
  });

  it('should call ApiPipe with career image', () => {
    expect(apiPipe).toHaveBeenCalledWith(CareersImages.career);
  });
});

function createComponent() {
  fixture = TestBed.createComponent(CareersComponent);
  comp = fixture.componentInstance;
  metaService = fixture.debugElement.injector.get(MetaService);
  apiService = fixture.debugElement.injector.get(ApiService);
  apiPipe = spyOn(MockApiPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}
