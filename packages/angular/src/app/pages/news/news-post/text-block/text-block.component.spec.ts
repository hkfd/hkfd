import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Data } from 'testing';

import { RichText } from 'prismic-dom';

import { TextBlockComponent } from './text-block.component';

let comp: TextBlockComponent;
let fixture: ComponentFixture<TextBlockComponent>;
let page: Page;

describe('TextBlockComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [TextBlockComponent]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  beforeEach(() => {
    comp.data = Data.Prismic.getText();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`linkResolver`', () => {
    it('should return `/news/$uid` if `type` arg is `news`', () => {
      const res = comp.linkResolver({
        type: 'news',
        uid: 'post'
      } as any);

      expect(res).toBe('/news/post');
    });

    it('should return `/` by default', () => {
      const res = comp.linkResolver({} as any);

      expect(res).toBe('/');
    });
  });

  describe('Template', () => {
    describe('Has `data`', () => {
      beforeEach(() => {
        comp.data = Data.Prismic.getText();
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
        (comp.data as any) = undefined;
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
  fixture = TestBed.createComponent(TextBlockComponent);
  comp = fixture.componentInstance;
  jest.spyOn(RichText, 'asHtml');
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
