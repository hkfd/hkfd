import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StubTextComponent, Data } from 'testing';
import { Api } from 'shared';

import { TextBlockComponent } from './text-block.component';

let compHost: TestHostComponent;
let comp: TextBlockComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;

@Component({
  selector: 'app-host',
  template: '<text-block [data]="data"></text-block>'
})
class TestHostComponent {
  data: any;
}

describe('TextBlockComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, TextBlockComponent, StubTextComponent]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `data`', () => {
    compHost.data = Data.Api.getTextBlocks('list');
    fixture.detectChanges();

    expect(comp.data).toEqual(Data.Api.getTextBlocks('list'));
  });

  describe('Template', () => {
    describe('Paragraph', () => {
      beforeEach(() => {
        compHost.data = Data.Api.getTextBlocks('text');
        fixture.detectChanges();
      });

      it('should display paragraphs', () => {
        expect(page.p.length).toBe(2);
      });

      it('should display sentences', () => {
        expect(page.text.length).toBe(5);
      });

      it('should set `TextComponent` `text` as `text`', () => {
        expect(page.textComponent.text).toEqual(
          (Data.Api.getTextBlocks('text').data[0]
            .paragraph as Api.Sentence[])[0]
        );
      });

      it('should not display list', () => {
        expect(page.ul.length).toBeFalsy();
      });
    });

    describe('List', () => {
      beforeEach(() => {
        compHost.data = Data.Api.getTextBlocks('list');
        fixture.detectChanges();
      });

      it('should display lists', () => {
        expect(page.ul.length).toBe(2);
      });

      it('should display list items', () => {
        expect(page.text.length).toBe(5);
      });

      it('should set `TextComponent` `text` as `text`', () => {
        expect(page.textComponent.text).toEqual(
          (Data.Api.getTextBlocks('list').data[0].list as Api.Sentence[])[0]
        );
      });

      it('should not display paragraph', () => {
        expect(page.p.length).toBeFalsy();
      });
    });
  });
});

class Page {
  get p() {
    return this.queryAll<HTMLParagraphElement>('p');
  }
  get ul() {
    return this.queryAll<HTMLUListElement>('ul');
  }
  get text() {
    return this.queryAll<HTMLElement>('text');
  }

  get textComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubTextComponent)
    );
    return directiveEl.injector.get<StubTextComponent>(StubTextComponent);
  }

  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(TestHostComponent);
  compHost = fixture.componentInstance;
  comp = fixture.debugElement.query(By.directive(TextBlockComponent))
    .componentInstance;
  page = new Page();
}
