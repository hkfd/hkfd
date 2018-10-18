import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { Data } from 'testing';
import { TextComponent } from './text.component';

let comp: TextComponent;
let fixture: ComponentFixture<TextComponent>;
let page: Page;

describe('TextComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextComponent]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  describe('URL', () => {
    beforeEach(() => {
      comp.text = Data.Api.sentence.url;
      fixture.detectChanges();
    });

    it('should display a element', () => {
      expect(page.a).toBeTruthy();
    });

    it('should display text in element', () => {
      expect(page.a.textContent).toBe('Click here');
    });

    it('should set href', () => {
      expect(page.a.getAttribute('href')).toBe('http://example.com');
    });

    it('should set target as `_blank`', () => {
      expect(page.a.getAttribute('target')).toBe('_blank');
    });

    it('should set rel as `nofollow`', () => {
      expect(page.a.getAttribute('rel')).toBe('nofollow noopener');
    });
  });

  describe('Heading', () => {
    beforeEach(() => {
      comp.text = Data.Api.sentence.heading;
      fixture.detectChanges();
    });

    it('should display h3 element', () => {
      expect(page.h3).toBeTruthy();
    });

    it('should display text in element', () => {
      expect(page.h3.textContent).toEqual(jasmine.any(String));
    });
  });

  describe('Bold', () => {
    beforeEach(() => {
      comp.text = Data.Api.sentence.bold;
      fixture.detectChanges();
    });

    it('should display b element', () => {
      expect(page.b).toBeTruthy();
    });

    it('should display text in element', () => {
      expect(page.b.textContent).toBe('Bold sentence.');
    });
  });

  describe('Italic', () => {
    beforeEach(() => {
      comp.text = Data.Api.sentence.italic;
      fixture.detectChanges();
    });

    it('should display i element', () => {
      expect(page.i).toBeTruthy();
    });

    it('should display text in element', () => {
      expect(page.i.textContent).toBe('Italic sentence.');
    });
  });

  describe('Normal', () => {
    beforeEach(() => {
      comp.text = Data.Api.sentence.normal;
      fixture.detectChanges();
    });

    it('should display text', () => {
      expect(fixture.nativeElement.innerText).toBe('Normal sentence.');
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
  fixture = TestBed.createComponent(TextComponent);
  comp = fixture.componentInstance;
  page = new Page();
}
