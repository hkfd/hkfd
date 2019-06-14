import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Data, MockPrismicTextPipe } from 'testing';

import { PrismicTextBlockComponent } from './prismic-text-block.component';
import { By } from '@angular/platform-browser';

let compHost: TestHostComponent;
let comp: PrismicTextBlockComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;

@Component({
  selector: 'app-host',
  template: '<prismic-text-block [data]="data"></prismic-text-block>'
})
export class TestHostComponent {
  data: any;
}

describe('TextBlockComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        PrismicTextBlockComponent,
        MockPrismicTextPipe
      ]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  beforeEach(() => {
    compHost.data = Data.Prismic.getText();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `data`', () => {
    expect(comp.data).toEqual(Data.Prismic.getText());
  });

  describe('Template', () => {
    describe('Has `data`', () => {
      beforeEach(() => {
        compHost.data = Data.Prismic.getText();
        fixture.detectChanges();
      });

      it('should be displayed', () => {
        expect(page.text.innerHTML).toBeTruthy();
      });

      it('should call `PrismicTextPipe` with `data` arg', () => {
        expect(MockPrismicTextPipe.prototype.transform).toHaveBeenCalledWith(
          comp.data,
          'asHtml'
        );
      });
    });

    describe('No `data`', () => {
      beforeEach(() => {
        compHost.data = undefined;
        fixture.detectChanges();
      });

      it('should not be displayed', () => {
        expect(page.text).toBeFalsy();
      });
    });
  });
});

class Page {
  get text() {
    return this.query<HTMLDivElement>('div');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(TestHostComponent);
  compHost = fixture.componentInstance;
  const el = fixture.debugElement.query(
    By.directive(PrismicTextBlockComponent)
  );
  comp = el.injector.get<PrismicTextBlockComponent>(PrismicTextBlockComponent);
  jest.spyOn(MockPrismicTextPipe.prototype, 'transform');
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
