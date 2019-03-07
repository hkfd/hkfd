import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

import {
  RouterTestingModule,
  ActivatedRoute,
  ActivatedRouteStub,
  StubTextBlockComponent,
  Data
} from 'testing';

import { Career } from 'api';
import { CareerComponent } from './career.component';

let comp: CareerComponent;
let fixture: ComponentFixture<CareerComponent>;
let changeDetectorRef: ChangeDetectorRef;
let page: Page;
let activatedRoute: ActivatedRouteStub;

beforeEach(jest.clearAllMocks);

describe('CareerComponent', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testData = { career: Data.Api.getCareers('Career 1') };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CareerComponent, StubTextBlockComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`ngOnInit`', () => {
    it('should set `career$`', () => {
      expect(comp.career$).toBeDefined();
    });

    it('should subscribe to `ActivatedRoute` `data`', () => {
      expect(activatedRoute.data.subscribe).toHaveBeenCalled();
    });

    it('should set `career`', () => {
      expect(comp.career).toEqual(Data.Api.getCareers('Career 1'));
    });

    it('should call `ChangeDetectorRef` `markForCheck`', () => {
      expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
    });
  });

  describe('`ngOnDestroy`', () => {
    it('should call `career$` `unsubscribe` if has `career$`', () => {
      comp.career$ = { unsubscribe: jest.fn() } as any;
      comp.ngOnDestroy();

      expect((comp.career$ as any).unsubscribe).toHaveBeenCalled();
    });

    it('should not throw if no `career$`', () => {
      comp.career$ = undefined;

      expect(() => comp.ngOnDestroy()).not.toThrow();
    });
  });

  describe('Template', () => {
    it('should display title', () => {
      expect(page.title.textContent).toEqual('Career 1');
    });

    describe('Section', () => {
      it('should display title if `title`', () => {
        (comp.career as Career).content[0].title = 'Section Title';
        changeDetectorRef.markForCheck();
        fixture.detectChanges();

        expect(page.sectionTitle.textContent).toEqual('Section Title');
      });

      it('should not display title if no `title`', () => {
        (comp.career as Career).content[0].title = undefined;
        changeDetectorRef.markForCheck();
        fixture.detectChanges();

        expect(page.sectionTitle).toBeFalsy();
      });

      it('should display `TextBlockComponent`', () => {
        expect(page.textBlock).toBeTruthy();
      });

      it('should set `TextBlockComponent` `data` as `data`', () => {
        expect(page.textBlockComponent.data).toEqual((comp.career as Career)
          .content[0].data[0] as any);
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
  page = new Page();

  jest.spyOn(changeDetectorRef, 'markForCheck');
  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
