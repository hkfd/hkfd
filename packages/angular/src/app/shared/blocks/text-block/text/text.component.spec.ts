import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Data } from 'testing';

import { TextComponent } from './text.component';

let compHost: TestHostComponent;
let comp: TextComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;

@Component({
  selector: 'app-host',
  template: '<text [text]="text"></text>'
})
class TestHostComponent {
  text: any;
}

describe('TextComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, TextComponent]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `text`', () => {
    compHost.text = Data.Api.getSentence('normal');
    fixture.detectChanges();

    expect(comp.text).toEqual(Data.Api.getSentence('normal'));
  });

  describe('Template', () => {
    describe('URL', () => {
      beforeEach(() => {
        compHost.text = Data.Api.getSentence('url');
        fixture.detectChanges();
      });

      it('should display a element', () => {
        expect(page.a).toBeTruthy();
      });

      it('should display text', () => {
        expect((page.a.textContent as string).trim()).toBe(
          Data.Api.getSentence('url').text
        );
      });

      it('should set href', () => {
        expect(page.a.href).toBe(Data.Api.getSentence('url').url as any);
      });

      it('should set target as `_blank`', () => {
        expect(page.a.target).toBe('_blank');
      });

      it('should set rel as `nofollow noopener`', () => {
        expect(page.a.rel).toBe('nofollow noopener');
      });
    });

    describe('Heading', () => {
      beforeEach(() => {
        compHost.text = Data.Api.getSentence('heading');
        fixture.detectChanges();
      });

      it('should display h3 element', () => {
        expect(page.h3).toBeTruthy();
      });

      it('should display text', () => {
        expect(page.h3.textContent).toBe(Data.Api.getSentence('heading').text);
      });
    });

    describe('Bold', () => {
      beforeEach(() => {
        compHost.text = Data.Api.getSentence('bold');
        fixture.detectChanges();
      });

      it('should display b element', () => {
        expect(page.b).toBeTruthy();
      });

      it('should display text', () => {
        expect(page.b.textContent).toBe(Data.Api.getSentence('bold').text);
      });
    });

    describe('Italic', () => {
      beforeEach(() => {
        compHost.text = Data.Api.getSentence('italic');
        fixture.detectChanges();
      });

      it('should display i element', () => {
        expect(page.i).toBeTruthy();
      });

      it('should display text', () => {
        expect(page.i.textContent).toBe(Data.Api.getSentence('italic').text);
      });
    });

    describe('Normal', () => {
      beforeEach(() => {
        compHost.text = Data.Api.getSentence('normal');
        fixture.detectChanges();
      });

      it('should display text', () => {
        expect(fixture.nativeElement.innerText).toBe(
          Data.Api.getSentence('normal').text
        );
      });
    });
  });
});

class Page {
  get a() {
    return this.query<HTMLAnchorElement>('a');
  }
  get h3() {
    return this.query<HTMLHeadingElement>('h3');
  }
  get b() {
    return this.query<HTMLElement>('b');
  }
  get i() {
    return this.query<HTMLElement>('i');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(TestHostComponent);
  compHost = fixture.componentInstance;
  comp = fixture.debugElement.query(By.directive(TextComponent))
    .componentInstance;
  page = new Page();
}
