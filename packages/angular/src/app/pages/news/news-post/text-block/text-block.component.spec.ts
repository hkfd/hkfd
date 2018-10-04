import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Data } from 'testing';

import { TextBlockComponent } from './text-block.component';

let comp: TextBlockComponent;
let fixture: ComponentFixture<TextBlockComponent>;
let richText: RichTextStub;
let page: Page;

describe('TextBlockComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextBlockComponent]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should call RichText asHtml with data arg', () => {
    expect(richText.asHtml).toHaveBeenCalledWith(comp.data, jasmine.anything());
  });

  it('should display text', () => {
    expect(page.text.innerText).toContain('This is a sentence.');
    expect(page.text.innerText).toContain('This is a bold sentence.');
  });

  it('should display HTML', () => {
    expect(page.text.innerHTML).toContain(
      '<p>This is a sentence.</p><p><strong>This is a bold sentence.</strong></p>'
    );
  });

  describe('linkResolver', () => {
    it(`should return '/' by default`, () => {
      const linkResolver = comp.linkResolver({ type: '' } as any);

      expect(linkResolver).toBe('/');
    });

    it(`should return '/news/$uid' if news post type`, () => {
      const linkResolver = comp.linkResolver({
        type: 'news',
        uid: 'post'
      } as any);

      expect(linkResolver).toBe('/news/post');
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(TextBlockComponent);
  comp = fixture.componentInstance;
  richText = new RichTextStub();
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class RichTextStub {
  asHtml: jasmine.Spy;

  constructor() {
    this.asHtml = spyOn(comp.richText, 'asHtml').and.callThrough();
  }
}

class Page {
  text!: HTMLDivElement;

  constructor() {
    comp.data = Data.Prismic.text;
  }

  addElements() {
    this.text = fixture.debugElement.query(By.css('div')).nativeElement;
  }
}
