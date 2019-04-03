import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

import {
  RouterTestingModule,
  ActivatedRoute,
  ActivatedRouteStub,
  MockApiService,
  StubTextBlockComponent,
  StubErrorComponent,
  Data
} from 'testing';

import { ApiService } from 'shared';
import { CareerComponent } from './career.component';

let comp: CareerComponent;
let fixture: ComponentFixture<CareerComponent>;
let page: Page;
let activatedRoute: ActivatedRouteStub;
let changeDetectorRef: ChangeDetectorRef;
let apiService: ApiService;

beforeEach(jest.clearAllMocks);

describe('CareerComponent', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParamMap = { id: 'career-1' };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        CareerComponent,
        StubTextBlockComponent,
        StubErrorComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ApiService, useClass: MockApiService }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`ngOnInit`', () => {
    it('should set `careerSub`', () => {
      expect(comp.careerSub).toBeDefined();
    });

    it('should call `ApiService` `getCareer` with `id` param arg if `id` param exists', () => {
      jest.clearAllMocks();
      activatedRoute.testParamMap = { id: 'id' };

      expect(apiService.getCareer).toHaveBeenCalledWith('id');
    });

    it('should not call `ApiService` `getCareer` if `id` param does not exist', () => {
      jest.clearAllMocks();
      activatedRoute.testParamMap = { id: undefined };

      expect(apiService.getCareer).not.toHaveBeenCalled();
    });

    it('should set `career`', () => {
      expect(comp.career).toEqual(Data.Api.getCareers('Career 1'));
    });

    it('should call `ChangeDetectorRef` `markForCheck`', () => {
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });
  });

  describe('`ngOnDestroy`', () => {
    it('should call `careerSub` `unsubscribe` if has `careerSub', () => {
      comp.careerSub = { unsubscribe: jest.fn() } as any;
      comp.ngOnDestroy();

      expect((comp.careerSub as any).unsubscribe).toHaveBeenCalled();
    });

    it('should not throw if no `careerSub`', () => {
      comp.careerSub = undefined;

      expect(() => comp.ngOnDestroy()).not.toThrow();
    });
  });

  describe('Template', () => {
    describe('`career` is `undefined`', () => {
      beforeEach(() => {
        comp.career = undefined;
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
      });

      it('should not display `ErrorComponent`', () => {
        expect(page.error).toBeFalsy();
      });

      it('should not display title', () => {
        expect(page.title).toBeFalsy();
      });
    });

    describe('`career` is `null`', () => {
      beforeEach(() => {
        comp.career = null;
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
      });

      it('should display `ErrorComponent`', () => {
        expect(page.error).toBeTruthy();
      });

      it('should not display title', () => {
        expect(page.title).toBeFalsy();
      });
    });

    describe('Has `career`', () => {
      beforeEach(() => {
        comp.career = Data.Api.getCareers('Career 1');
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
      });

      it('should not display `ErrorComponent`', () => {
        expect(page.error).toBeFalsy();
      });

      it('should display title', () => {
        expect(page.title.textContent).toEqual('Career 1');
      });

      describe('Section', () => {
        it('should display title if `title`', () => {
          comp.career = {
            ...Data.Api.getCareers('Career 1'),
            content: [{ title: 'Section Title' }]
          } as any;
          changeDetectorRef.markForCheck();
          fixture.detectChanges();

          expect(page.sectionTitle.textContent).toEqual('Section Title');
        });

        it('should not display title if no `title`', () => {
          comp.career = {
            ...Data.Api.getCareers('Career 1'),
            content: [{ title: undefined }]
          } as any;
          changeDetectorRef.markForCheck();
          fixture.detectChanges();

          expect(page.sectionTitle).toBeFalsy();
        });

        it('should display `TextBlockComponent`', () => {
          expect(page.textBlock).toBeTruthy();
        });

        it('should set `TextBlockComponent` `data` as `data`', () => {
          expect(page.textBlockComponent.data).toEqual(Data.Api.getCareers(
            'Career 1'
          ).content[0].data[0] as any);
        });
      });
    });
  });
});

class Page {
  get title() {
    return this.query<HTMLHeadingElement>('h1');
  }
  get sectionTitle() {
    return this.query<HTMLHeadingElement>('section:nth-of-type(2) h2');
  }
  get textBlock() {
    return this.query<HTMLElement>('text-block');
  }
  get error() {
    return this.query<HTMLElement>('error');
  }

  get textBlockComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubTextBlockComponent)
    );
    return directiveEl.injector.get<StubTextBlockComponent>(
      StubTextBlockComponent
    );
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(CareerComponent);
  comp = fixture.componentInstance;
  changeDetectorRef = (comp as any).changeDetectorRef;
  apiService = fixture.debugElement.injector.get<ApiService>(ApiService);
  page = new Page();

  jest.spyOn(changeDetectorRef, 'markForCheck');
  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
