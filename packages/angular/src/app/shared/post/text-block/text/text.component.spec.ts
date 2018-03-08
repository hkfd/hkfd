import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { sentence } from '../../../../../testing';
import { TextComponent } from './text.component';

let comp: TextComponent;
let fixture: ComponentFixture<TextComponent>;
let page: Page;

describe('TextComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TextComponent]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createComponent()));

  describe('URL', () => {
    beforeEach(() => {
      comp.text = sentence.url;
      fixture.detectChanges();
      page.addElements();
    });

    it(`should display 'a' element`, () => {
      expect(page.a).toBeTruthy();
    });

    it('should display text in element', () => {
      expect(page.a.nativeElement.textContent).toBe('Click here');
    });

    it('should set href', () => {
      expect(page.a.nativeElement.getAttribute('href')).toBe(
        'http://example.com'
      );
    });

    it(`should set target as '_blank'`, () => {
      expect(page.a.nativeElement.getAttribute('target')).toBe('_blank');
    });

    it(`should set rel as 'nofollow'`, () => {
      expect(page.a.nativeElement.getAttribute('rel')).toBe(
        'nofollow noopener'
      );
    });
  });

  describe('Heading', () => {
    beforeEach(() => {
      comp.text = sentence.heading;
      fixture.detectChanges();
      page.addElements();
    });

    it(`should display 'h3' element`, () => {
      expect(page.h3).toBeTruthy();
    });

    it('should display text in element', () => {
      expect(page.h3.nativeElement.textContent).toEqual(jasmine.any(String));
    });

    it('should display uppercase text in element', () => {
      expect(page.h3.nativeElement.textContent).toBe('HEADING');
    });
  });

  describe('Bold', () => {
    beforeEach(() => {
      comp.text = sentence.bold;
      fixture.detectChanges();
      page.addElements();
    });

    it(`should display 'i' element`, () => {
      expect(page.b).toBeTruthy();
    });

    it('should display text in element', () => {
      expect(page.b.nativeElement.textContent).toBe('Bold sentence.');
    });
  });

  describe('Italic', () => {
    beforeEach(() => {
      comp.text = sentence.italic;
      fixture.detectChanges();
      page.addElements();
    });

    it(`should display 'i' element`, () => {
      expect(page.i).toBeTruthy();
    });

    it('should display text in element', () => {
      expect(page.i.nativeElement.textContent).toBe('Italic sentence.');
    });
  });

  describe('Normal', () => {
    beforeEach(() => {
      comp.text = sentence.normal;
      fixture.detectChanges();
      page.addElements();
    });

    it('should display text', () => {
      expect(fixture.nativeElement.innerText).toBe('Normal sentence.');
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(TextComponent);
  comp = fixture.componentInstance;
  page = new Page();
}

class Page {
  a: DebugElement;
  h3: DebugElement;
  b: DebugElement;
  i: DebugElement;

  addElements() {
    this.a = fixture.debugElement.query(By.css('a'));
    this.h3 = fixture.debugElement.query(By.css('h3'));
    this.b = fixture.debugElement.query(By.css('b'));
    this.i = fixture.debugElement.query(By.css('i'));
  }
}
