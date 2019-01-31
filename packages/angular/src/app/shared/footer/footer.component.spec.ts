import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

let comp: FooterComponent;
let fixture: ComponentFixture<FooterComponent>;
let page: Page;

describe('FooterComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  beforeEach(() => {
    const links = () => [
      {
        url: 'http://example1.com/',
        icon: 'http://testing/assets/1.jpg',
        alt: 'Image'
      },
      {
        url: 'http://example2.com/',
        icon: 'http://testing/assets/2.jpg',
        alt: 'Image'
      }
    ];
    comp.links = links();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('Template', () => {
    it('should display `currentYear`', () => {
      expect(page.currentYear.textContent).toContain(
        new Date().getFullYear().toString()
      );
    });

    describe('Social links', () => {
      it('should be displayed', () => {
        expect(page.socialLinks.length).toBe(comp.links.length);
      });

      describe('Link', () => {
        it('should set href', () => {
          expect(page.socialLinks[0].href).toBe('http://example1.com/');
        });

        describe('Icon', () => {
          it('should set src', () => {
            expect(page.socialLinkIcons[0].src).toBe(
              'http://testing/assets/1.jpg'
            );
          });

          it('should set alt', () => {
            expect(page.socialLinkIcons[0].alt).toBe('Image');
          });
        });
      });
    });
  });
});

class Page {
  get currentYear() {
    return this.query<HTMLElement>('#footer-info small');
  }
  get socialLinks() {
    return this.queryAll<HTMLAnchorElement>('#info-social a');
  }
  get socialLinkIcons() {
    return this.queryAll<HTMLImageElement>('#info-social img');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(FooterComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
