import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

import {
  RouterTestingModule,
  ActivatedRoute,
  ActivatedRouteStub,
  MockPrismicService,
  StubPrismicTextBlockComponent,
  StubErrorComponent,
  MockPrismicTextPipe,
  Data
} from 'testing';

import { of } from 'rxjs';

import { PrismicService } from 'shared';
import { CareerPost } from 'prismic';
import { CareerComponent } from './career.component';

let comp: CareerComponent;
let fixture: ComponentFixture<CareerComponent>;
let page: Page;
let activatedRoute: ActivatedRouteStub;
let prismicService: PrismicService;

beforeEach(jest.clearAllMocks);

describe('CareerComponent', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParamMap = { uid: 'career-1' };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        CareerComponent,
        StubPrismicTextBlockComponent,
        StubErrorComponent,
        MockPrismicTextPipe
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: PrismicService, useClass: MockPrismicService }
      ]
    })
      .overrideComponent(CareerComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`ngOnInit`', () => {
    it('should set `career$`', () => {
      expect(comp.career$).toBeDefined();
    });

    it('should call `PrismicService` `getPost` with `career` and `uid` param args if `uid` param exists', () => {
      jest.clearAllMocks();
      activatedRoute.testParamMap = { uid: 'uid' };
      comp.ngOnInit();

      expect(prismicService.getPost).toHaveBeenCalledWith('career', 'uid');
    });

    it('should throw if `uid` param does not exist', () => {
      jest.clearAllMocks();
      activatedRoute.testParamMap = { uid: undefined };

      expect(() => comp.ngOnInit()).toThrowError('No `uid`');
    });
  });

  describe('Template', () => {
    describe('`career.post` is `null`', () => {
      beforeEach(() => {
        comp.career$ = of({ post: null });
        fixture.detectChanges();
      });

      it('should display `ErrorComponent`', () => {
        expect(page.error).toBeTruthy();
      });

      it('should not display title', () => {
        expect(page.title).toBeFalsy();
      });
    });

    describe('Has `career.post`', () => {
      beforeEach(() => {
        comp.career$ = of({ post: Data.Prismic.getCareerPost() });
        fixture.detectChanges();
      });

      it('should not display `ErrorComponent`', () => {
        expect(page.error).toBeFalsy();
      });

      describe('Title', () => {
        describe('Has `career.post.data.title`', () => {
          beforeEach(() => {
            comp.career$ = of({
              post: ({
                data: { title: [{ spans: [], text: 'Title', type: 'h1' }] }
              } as any) as CareerPost
            });
            fixture.detectChanges();
          });

          it('should be displayed', () => {
            expect(page.title.textContent).toBeTruthy();
          });

          it('should call `PrismicTextPipe` with `career.post.data.title` arg', () => {
            expect(
              MockPrismicTextPipe.prototype.transform
            ).toHaveBeenCalledWith(
              [{ spans: [], text: 'Title', type: 'h1' }],
              'asText'
            );
          });
        });

        describe('No `career.post.data.title`', () => {
          beforeEach(() => {
            comp.career$ = of({
              post: ({
                data: { title: undefined }
              } as any) as CareerPost
            });
            fixture.detectChanges();
          });

          it('should not display title', () => {
            expect(page.title).toBeFalsy();
          });
        });
      });

      it('should display salary', () => {
        expect(page.salary.textContent).toBe('Post salary');
      });

      describe('Section', () => {
        describe('Text', () => {
          beforeEach(() => {
            comp.career$ = of({
              post: Data.Prismic.getNewsPosts('post-2') as any
            });
            fixture.detectChanges();
          });

          it('should display `PrismicTextBlockComponent`', () => {
            expect(page.textBlock).toBeTruthy();
          });

          it('should set `PrismicTextBlockComponent` `data` as `primary.text`', () => {
            expect(page.prismicTextBlockComponent.data).toEqual(
              Data.Prismic.getNewsPosts('post-2').data.body[0].primary.text
            );
          });
        });
      });

      describe('Apply button', () => {
        it('should be displayed', () => {
          expect(page.applyButton).toBeTruthy();
        });

        it('should set `href` as `career.post.data.contact`', () => {
          expect(page.applyButton.href).toBe('mailto:post@contact');
        });
      });
    });
  });
});

class Page {
  get title() {
    return this.query<HTMLHeadingElement>('h1');
  }
  get salary() {
    return this.query<HTMLHeadingElement>('h2');
  }
  get textBlock() {
    return this.query<HTMLElement>('prismic-text-block');
  }
  get applyButton() {
    return this.query<HTMLAnchorElement>('a');
  }
  get error() {
    return this.query<HTMLElement>('error');
  }

  get prismicTextBlockComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubPrismicTextBlockComponent)
    );
    return directiveEl.injector.get<StubPrismicTextBlockComponent>(
      StubPrismicTextBlockComponent
    );
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(CareerComponent);
  comp = fixture.componentInstance;
  prismicService = fixture.debugElement.injector.get<PrismicService>(
    PrismicService
  );
  page = new Page();

  jest.spyOn(MockPrismicTextPipe.prototype, 'transform');
  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
