import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Data } from 'testing';
import { TextBlockComponent } from './text-block.component';

let comp: TextBlockComponent;
let fixture: ComponentFixture<TextBlockComponent>;
let page: Page;

describe('TextBlockComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextBlockComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  describe('Paragraph', () => {
    beforeEach(() => {
      comp.data = Data.Api.getTextBlocks('text');
      fixture.detectChanges();
    });

    it('should display paragraph template', () => {
      expect(page.p.length).toBeGreaterThan(0);
    });

    it('should display TextComponent', () => {
      expect(page.text.length).toBeGreaterThan(0);
    });

    it('should display template per paragraph', () => {
      expect(page.p.length).toBe(2);
    });

    it('should display TextComponent per sentence', () => {
      expect(page.text.length).toBe(5);
    });

    it('should not display list template', () => {
      expect(page.ul.length).toBe(0);
    });
  });

  describe('List', () => {
    beforeEach(() => {
      comp.data = Data.Api.getTextBlocks('list');
      fixture.detectChanges();
    });

    it('should display list template', () => {
      expect(page.ul.length).toBeGreaterThan(0);
    });

    it('should display TextComponent', () => {
      expect(page.text.length).toBeGreaterThan(0);
    });

    it('should display template per list', () => {
      expect(page.ul.length).toBe(2);
    });

    it('should display TextComponent per item', () => {
      expect(page.text.length).toBe(5);
    });

    it('should not display paragraph template', () => {
      expect(page.p.length).toBe(0);
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

  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(TextBlockComponent);
  comp = fixture.componentInstance;
  page = new Page();
}
