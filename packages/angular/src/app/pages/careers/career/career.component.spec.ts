import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
  RouterTestingModule,
  MockApiPipe,
  ActivatedRoute,
  ActivatedRouteStub,
  Data
} from 'testing';

import { CareerComponent } from './career.component';

let comp: CareerComponent;
let fixture: ComponentFixture<CareerComponent>;
let page: Page;
let activatedRoute: ActivatedRouteStub;
let apiPipe: jasmine.Spy;

describe('CareerComponent', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testData = { career: Data.Api.getCareers('Career 1') };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CareerComponent, MockApiPipe],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should set career', () => {
    expect(comp.career).toEqual(Data.Api.getCareers('Career 1'));
  });

  describe('Content', () => {
    it('should display title', () => {
      expect(page.sectionTitle.textContent).toEqual('TextBlock');
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

class Page {
  get sectionTitle() {
    return this.query<HTMLHeadingElement>('h2');
  }
  get textBlock() {
    return this.query<HTMLElement>('text-block');
  }
  get benefitsInfo() {
    return this.query<HTMLParagraphElement>('section:last-of-type p');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(CareerComponent);
  comp = fixture.componentInstance;
  page = new Page();
  apiPipe = spyOn(MockApiPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
