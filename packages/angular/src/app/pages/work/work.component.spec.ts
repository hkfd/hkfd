import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  MockMetaService,
  MockApiService,
  MockApiPipe,
  StubImageComponent,
  Data
} from 'testing';

import { MetaService, ApiService, ApiPipe, Api } from 'shared';
import { WorkComponent } from './work.component';

let comp: WorkComponent;
let fixture: ComponentFixture<WorkComponent>;
let metaService: MetaService;
let apiService: ApiService;
let apiPipe: ApiPipeStub;
let page: Page;

describe('WorkComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [WorkComponent, StubImageComponent],
      providers: [
        { provide: MetaService, useClass: MockMetaService },
        { provide: ApiService, useClass: MockApiService },
        { provide: ApiPipe, useClass: MockApiPipe }
      ]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`ngOnInit`', () => {
    it('should call `MetaService` `setMetaTags` with `title` and `url` args', () => {
      expect(metaService.setMetaTags).toHaveBeenCalledWith({
        title: 'Our Work',
        url: 'work'
      });
    });

    describe('Case Studies', () => {
      it('should set `caseStudies$`', () => {
        expect(comp.caseStudies$).toBeDefined();
      });

      it('should call `ApiService` `getCaseStudies`', () => {
        expect(apiService.getCaseStudies).toHaveBeenCalled();
      });

      it('should set `caseStudies`', () => {
        expect((comp.caseStudies as Api.CaseStudy[]).length).toBe(
          Data.Api.getCaseStudies<void>().length
        );
      });

      it('should call `ApiPipe` with case study `thumbnail`s', () => {
        (comp.caseStudies as Api.CaseStudy[]).forEach(caseStudy =>
          expect(apiPipe.transform).toHaveBeenCalledWith(caseStudy.thumbnail)
        );
      });
    });
  });

  describe('`ngOnDestroy`', () => {
    it('should call `caseStudies$` `unsubscribe`', () => {
      const spy = spyOn(comp.caseStudies$, 'unsubscribe').and.callThrough();
      comp.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Template', () => {
    it('should display title', () => {
      expect(page.title.textContent).toBeTruthy();
    });

    describe('Case Studies', () => {
      it('should be displayed', () => {
        expect(page.caseStudies.length).toBe(
          Data.Api.getCaseStudies<void>().length
        );
      });

      describe('Case Study', () => {
        it('should display title', () => {
          expect(page.caseStudyTitle.textContent).toBe(
            Data.Api.getCaseStudies('Case Study 1').title
          );
        });

        describe('Thumbnail', () => {
          it('should be displayed', () => {
            expect(page.caseStudyThumbnail).toBeTruthy();
          });

          it('should set `ImageComponent` `image` as `thumbnail`', () => {
            expect(page.imageComponent.image).toEqual(Data.Api.getCaseStudies(
              'Case Study 1'
            ).thumbnail as any);
          });

          it('should set `ImageComponent` `full-height` attribute', () => {
            expect(
              page.caseStudyThumbnail.hasAttribute('full-height')
            ).toBeTruthy();
          });
        });

        it('should set colour class', () => {
          expect(page.caseStudies[0].className).toContain(
            Data.Api.getCaseStudies('Case Study 1').colour
          );
        });

        it('should set href', () => {
          expect(page.caseStudies[0].href).toBe(
            `http://localhost:9876/${
              Data.Api.getCaseStudies('Case Study 1').id
            }`
          );
        });
      });
    });
  });
});

class ApiPipeStub {
  transform: jasmine.Spy;

  constructor() {
    const apiPipeInstance = fixture.debugElement.injector.get(ApiPipe);

    this.transform = spyOn(apiPipeInstance, 'transform').and.callThrough();
  }
}

class Page {
  get title() {
    return this.query<HTMLHeadingElement>('h1');
  }
  get caseStudies() {
    return this.queryAll<HTMLAnchorElement>('.case-study');
  }
  get caseStudyTitle() {
    return this.query<HTMLHeadingElement>('.case-study h2');
  }
  get caseStudyThumbnail() {
    return this.query<HTMLElement>('.case-study image-component');
  }

  get imageComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubImageComponent)
    );
    return directiveEl.injector.get<StubImageComponent>(StubImageComponent);
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(WorkComponent);
  comp = fixture.componentInstance;
  metaService = fixture.debugElement.injector.get<MetaService>(MetaService);
  apiService = fixture.debugElement.injector.get<ApiService>(ApiService);
  apiPipe = new ApiPipeStub();
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
