import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  MockTitleService,
  MockApiService,
  MockApiPipe,
  ActivatedRoute,
  ActivatedRouteStub,
  Data
} from '../../../../testing';

import { TitleService, ApiService, Api } from '../../../shared/shared.module';
import { CareerComponent } from './career.component';

let comp: CareerComponent;
let fixture: ComponentFixture<CareerComponent>;
let titleService: TitleService;
let apiService: ApiService;
let page: Page;
let activatedRoute: ActivatedRouteStub;
let apiPipe: jasmine.Spy;

describe('CareerComponent', () => {
  beforeEach(
    async(() => {
      activatedRoute = new ActivatedRouteStub();
      activatedRoute.testData = { career: Data.Api.careers[0] };

      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [CareerComponent, MockApiPipe],
        providers: [
          { provide: TitleService, useClass: MockTitleService },
          { provide: ApiService, useClass: MockApiService },
          { provide: ActivatedRoute, useValue: activatedRoute }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createComponent()));

  it('should set career', () => {
    expect(comp.career).toEqual(Data.Api.careers[0]);
  });

  it('should call TitleService setTitle', () => {
    expect(titleService.setTitle).toHaveBeenCalled();
  });

  it('should call TitleService setTitle with post title', () => {
    expect(titleService.setTitle).toHaveBeenCalledWith('Career 1');
  });

  describe('Content', () => {
    it('should display title', () => {
      expect(page.sectionTitle.nativeElement.textContent).toEqual('TextBlock');
    });

    it('should display title in benefits information', () => {
      expect(page.benefitsInfo.nativeElement.textContent).toContain('Career 1');
    });

    describe('Text', () => {
      it('should display TextBlockComponent', () => {
        expect(page.textBlock).toBeTruthy();
      });

      it('should not call ApiPipe', () => {
        expect(apiPipe).not.toHaveBeenCalled();
      });
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(CareerComponent);
  comp = fixture.componentInstance;
  titleService = fixture.debugElement.injector.get(TitleService);
  apiService = fixture.debugElement.injector.get(ApiService);
  page = new Page();
  apiPipe = spyOn(MockApiPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class Page {
  sectionTitle: DebugElement;
  textBlock: DebugElement;
  benefitsInfo: DebugElement;

  addElements() {
    this.sectionTitle = fixture.debugElement.query(By.css('h2'));
    this.textBlock = fixture.debugElement.query(By.css('text-block'));
    this.benefitsInfo = fixture.debugElement.query(
      By.css('section:last-of-type p')
    );
  }
}
