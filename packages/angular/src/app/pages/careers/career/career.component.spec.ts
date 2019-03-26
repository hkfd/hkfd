import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  ActivatedRoute,
  ActivatedRouteStub,
  MockApiService,
  StubTextBlockComponent,
  Data
} from 'testing';

import { of } from 'rxjs';

import { ApiService } from 'shared';
import { CareerComponent } from './career.component';

let comp: CareerComponent;
let fixture: ComponentFixture<CareerComponent>;
let page: Page;
let activatedRoute: ActivatedRouteStub;
let apiService: ApiService;

beforeEach(jest.clearAllMocks);

describe('CareerComponent', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParamMap = { id: 'career-1' };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CareerComponent, StubTextBlockComponent],
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
    it('should set `career$`', () => {
      expect(comp.career$).toBeDefined();
    });

    it('should call `ApiService` `getCareer` with `id` param arg if param exists', () => {
      activatedRoute.testParamMap = { id: 'id' };

      expect(apiService.getCareer).toHaveBeenCalledWith('id');
    });

    it('should call `ApiService` `getCareer` with empty string arg if param does not exist', () => {
      activatedRoute.testParamMap = { id: undefined };

      expect(apiService.getCareer).toHaveBeenCalledWith('');
    });
  });

  describe('Template', () => {
    it('should display title', () => {
      expect(page.title.textContent).toEqual('Career 1');
    });

    describe('Section', () => {
      it('should display title if `title`', () => {
        (apiService.getCareer as jest.Mock).mockReturnValue(
          of({
            ...Data.Api.getCareers('Career 1'),
            content: [{ title: 'Section Title' }]
          })
        );
        activatedRoute.testParamMap = { id: undefined };
        fixture.detectChanges();

        expect(page.sectionTitle.textContent).toEqual('Section Title');
      });

      it('should not display title if no `title`', () => {
        (apiService.getCareer as jest.Mock).mockReturnValue(
          of({
            ...Data.Api.getCareers('Career 1'),
            content: [{ title: undefined }]
          })
        );
        activatedRoute.testParamMap = { id: undefined };
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
  apiService = fixture.debugElement.injector.get<ApiService>(ApiService);
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
