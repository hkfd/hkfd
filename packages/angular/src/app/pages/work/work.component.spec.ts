import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

import {
  RouterTestingModule,
  MockApiService,
  MockApiPipe,
  StubImageComponent,
  StubLazyDirective,
  Data
} from 'testing';

import { ApiService, ApiPipe } from 'shared';
import { CaseStudy } from 'api';
import { WorkComponent } from './work.component';

let comp: WorkComponent;
let fixture: ComponentFixture<WorkComponent>;
let changeDetectorRef: ChangeDetectorRef;
let apiService: ApiService;
let apiPipe: ApiPipe;
let page: Page;

beforeEach(jest.clearAllMocks);

describe('WorkComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [WorkComponent, StubImageComponent, StubLazyDirective],
      providers: [
        { provide: ApiService, useClass: MockApiService },
        { provide: ApiPipe, useClass: MockApiPipe }
      ]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`ngOnInit`', () => {
    describe('Case Studies', () => {
      it('should set `caseStudies$`', () => {
        expect(comp.caseStudies$).toBeDefined();
      });

      it('should call `ApiService` `getCaseStudies`', () => {
        expect(apiService.getCaseStudies).toHaveBeenCalled();
      });

      it('should set `caseStudies`', () => {
        expect((comp.caseStudies as CaseStudy[]).length).toBe(
          Data.Api.getCaseStudies<void>().length
        );
      });

      it('should call `ApiPipe` with case study `thumbnail`s', () => {
        Data.Api.getCaseStudies<void>().forEach(caseStudy =>
          expect(apiPipe.transform).toHaveBeenCalledWith(caseStudy.thumbnail)
        );
      });

      it('should call `ChangeDetectorRef` `markForCheck`', () => {
        expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
      });
    });
  });

  describe('`ngOnDestroy`', () => {
    it('should call `caseStudies$` `unsubscribe` if has `caseStudies$`', () => {
      comp.caseStudies$ = { unsubscribe: jest.fn() } as any;
      comp.ngOnDestroy();

      expect((comp.caseStudies$ as any).unsubscribe).toHaveBeenCalled();
    });

    it('should not throw if no `caseStudies$`', () => {
      comp.caseStudies$ = undefined;

      expect(() => comp.ngOnDestroy()).not.toThrow();
    });
  });

  describe('`handleVisible`', () => {
    it('should set `caseStudy.isVisible` as `true`', () => {
      const caseStudy = {};
      comp.handleVisible(caseStudy as any);

      expect(caseStudy).toEqual({ isVisible: true });
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

          it('should set `ImageComponent` `image` as transformed `thumbnail`', () => {
            expect(page.imageComponent.image).toEqual({
              'mock-api-pipe': Data.Api.getCaseStudies('Case Study 1').thumbnail
            } as any);
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
            `http://localhost/${Data.Api.getCaseStudies('Case Study 1').id}`
          );
        });

        it('should call `handleVisible` with `caseStudy` on `isVisible`', () => {
          comp.caseStudies = Data.Api.getCaseStudies<void>();
          changeDetectorRef.markForCheck();
          fixture.detectChanges();

          page.caseStudies[1].dispatchEvent(new Event('isVisible'));

          expect(comp.handleVisible).toHaveBeenCalledWith({
            ...Data.Api.getCaseStudies('Case Study 2'),
            isVisible: true
          });
        });
      });
    });
  });
});

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
  changeDetectorRef = (comp as any).changeDetectorRef;
  apiService = fixture.debugElement.injector.get<ApiService>(ApiService);
  apiPipe = fixture.debugElement.injector.get(ApiPipe);
  jest.spyOn(changeDetectorRef, 'markForCheck');
  jest.spyOn(apiPipe, 'transform');
  jest.spyOn(comp, 'handleVisible');
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
