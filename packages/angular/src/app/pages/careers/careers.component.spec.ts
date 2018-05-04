import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
  RouterTestingModule,
  MockTitleService,
  MockApiService,
  MockServerPipe
} from '../../../testing';

import { TitleService, ApiService } from '../../shared/shared.module';
import { CareersImages } from './careers.images';
import { CareersComponent } from './careers.component';

let comp: CareersComponent;
let fixture: ComponentFixture<CareersComponent>;
let titleService: TitleService;
let apiService: ApiService;
let serverPipe: jasmine.Spy;

describe('CareersComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [CareersComponent, MockServerPipe],
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

  it('should call ServerPipe', () => {
    expect(serverPipe).toHaveBeenCalled();
  });

  it('should call ServerPipe with hiring image', () => {
    expect(serverPipe).toHaveBeenCalledWith(CareersImages.hiring);
  });

  it('should call ServerPipe with career image', () => {
    expect(serverPipe).toHaveBeenCalledWith(CareersImages.career);
  });
});

function createComponent() {
  fixture = TestBed.createComponent(CareersComponent);
  comp = fixture.componentInstance;
  titleService = fixture.debugElement.injector.get(TitleService);
  apiService = fixture.debugElement.injector.get(ApiService);
  serverPipe = spyOn(MockServerPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}
