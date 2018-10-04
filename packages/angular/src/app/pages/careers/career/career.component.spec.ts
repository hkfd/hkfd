import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

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
    activatedRoute.testData = { career: Data.Api.careers[0] };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CareerComponent, MockApiPipe],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should set career', () => {
    expect(comp.career).toEqual(Data.Api.careers[0]);
  });

  describe('Content', () => {
    it('should display title', () => {
      expect(page.sectionTitle.nativeElement.textContent).toEqual('TextBlock');
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
  page = new Page();
  apiPipe = spyOn(MockApiPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class Page {
  sectionTitle!: DebugElement;
  textBlock!: DebugElement;
  benefitsInfo!: DebugElement;

  addElements() {
    this.sectionTitle = fixture.debugElement.query(By.css('h2'));
    this.textBlock = fixture.debugElement.query(By.css('text-block'));
    this.benefitsInfo = fixture.debugElement.query(
      By.css('section:last-of-type p')
    );
  }
}
