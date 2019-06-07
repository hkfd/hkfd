import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Data } from 'testing';

import { RichText } from 'prismic-dom';

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
      declarations: [TestHostComponent, PrismicTextBlockComponent]
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

  describe('`linkResolver`', () => {
    it('should return `/news/$uid` if `type` arg is `news`', () => {
      const res = comp.linkResolver({
        type: 'news',
        uid: 'post'
      } as any);

      expect(res).toBe('/news/post');
    });

    it('should return `/careers/$uid` if `type` arg is `career`', () => {
      const res = comp.linkResolver({
        type: 'career',
        uid: 'post'
      } as any);

      expect(res).toBe('/careers/post');
    });

    it('should return `/` by default', () => {
      const res = comp.linkResolver({} as any);

      expect(res).toBe('/');
    });
  });

  describe('Template', () => {
    describe('Has `data`', () => {
      beforeEach(() => {
        compHost.data = Data.Prismic.getText();
        fixture.detectChanges();
      });

      it('should be displayed', () => {
        expect(page.text.innerHTML).toBe(
          '<p>This is a sentence.</p><p><strong>This is a bold sentence.</strong></p>'
        );
      });

      it('should call RichText `asHtml` with `data` and `linkResolver` args', () => {
        expect(RichText.asHtml).toHaveBeenCalledWith(
          comp.data,
          comp.linkResolver
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
  jest.spyOn(RichText, 'asHtml');
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
