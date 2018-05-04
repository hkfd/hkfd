import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  RouterTestingModule,
  MockTitleService,
  MockApiService,
  MockServerPipe
} from '../../../testing';

import {
  TitleService,
  ApiService,
  ServerPipe
} from '../../shared/shared.module';
import { WorkComponent } from './work.component';

let comp: WorkComponent;
let fixture: ComponentFixture<WorkComponent>;
let titleService: TitleService;
let apiService: ApiService;
let serverPipe: ServerPipeStub;
let page: Page;

describe('WorkComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, NoopAnimationsModule],
        declarations: [WorkComponent],
        providers: [
          { provide: TitleService, useClass: MockTitleService },
          { provide: ApiService, useClass: MockApiService },
          { provide: ServerPipe, useClass: MockServerPipe }
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

  it('should call ApiService getCaseStudies', () => {
    expect(apiService.getCaseStudies).toHaveBeenCalled();
  });

  it('should call ServerPipe', () => {
    expect(serverPipe.transform).toHaveBeenCalled();
  });

  it('should call ServerPipe with case study thumbnails', () => {
    comp.caseStudies.forEach(caseStudy =>
      expect(serverPipe.transform).toHaveBeenCalledWith(caseStudy.thumbnail)
    );
  });

  it('should set caseStudies', () => {
    expect(comp.caseStudies.length).toBe(3);
  });

  it('should set case study colour', () => {
    comp.caseStudies.forEach((caseStudy, index) =>
      expect(page.caseStudies[index].properties.className).toContain(
        caseStudy.colour
      )
    );
  });
});

function createComponent() {
  fixture = TestBed.createComponent(WorkComponent);
  comp = fixture.componentInstance;
  titleService = fixture.debugElement.injector.get(TitleService);
  apiService = fixture.debugElement.injector.get(ApiService);
  serverPipe = new ServerPipeStub();
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class ServerPipeStub {
  transform: jasmine.Spy;

  constructor() {
    const serverPipe = fixture.debugElement.injector.get(ServerPipe);

    this.transform = spyOn(serverPipe, 'transform').and.callThrough();
  }
}

class Page {
  caseStudies: DebugElement[];

  addElements() {
    this.caseStudies = fixture.debugElement.queryAll(By.css('.case-study'));
  }
}
