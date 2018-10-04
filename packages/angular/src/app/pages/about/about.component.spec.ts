import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
  RouterTestingModule,
  MockMetaService,
  MockApiService,
  MockApiPipe,
  Data
} from 'testing';

import { MetaService, ApiService } from 'shared';
import { AboutImages } from './about.images';
import { AboutComponent } from './about.component';

let comp: AboutComponent;
let fixture: ComponentFixture<AboutComponent>;
let metaService: MetaService;
let apiService: ApiService;
let apiPipe: jasmine.Spy;

describe('AboutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AboutComponent, MockApiPipe],
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

  it('should call ApiService getTeam', () => {
    expect(apiService.getTeam).toHaveBeenCalledWith();
  });

  it('should set team', () => {
    expect(comp.team).toBeDefined();
    expect(comp.team!.length).toBe(5);
  });

  it('should call ApiPipe', () => {
    expect(apiPipe).toHaveBeenCalled();
  });

  it('should call ApiPipe with intro image', () => {
    expect(apiPipe).toHaveBeenCalledWith(AboutImages.intro);
  });

  it('should call ApiPipe with team thumbnails', () => {
    Data.Api.team.forEach(person =>
      expect(apiPipe).toHaveBeenCalledWith(person.thumbnail)
    );
  });
});

function createComponent() {
  fixture = TestBed.createComponent(AboutComponent);
  comp = fixture.componentInstance;
  metaService = fixture.debugElement.injector.get(MetaService);
  apiService = fixture.debugElement.injector.get(ApiService);
  apiPipe = spyOn(MockApiPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}
