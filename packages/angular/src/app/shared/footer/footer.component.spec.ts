import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

let comp: FooterComponent;
let fixture: ComponentFixture<FooterComponent>;
let page: Page;

describe('FooterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should set currentYear', () => {
    expect(comp.currentYear).toBeDefined();
  });

  it('should display current year', () => {
    expect(page.currentYear.textContent).toContain(
      new Date().getFullYear().toString()
    );
  });

  it('should display links', () => {
    expect(page.socialLinks.length).toBe(2);
  });

  it('should set link url', () => {
    const href = page.socialLinks[0].getAttribute('href');

    expect(href).toBe('http://example1.com');
  });

  it('should set link icon src', () => {
    const src = page.socialLinkIcons[0].getAttribute('src');

    expect(src).toBe('/assets/1.jpg');
  });
});

class Page {
  get currentYear() {
    return this.query<HTMLElement>('small');
  }
  get socialLinks() {
    return this.queryAll<HTMLAnchorElement>('#info-social a');
  }
  get socialLinkIcons() {
    return this.queryAll<HTMLImageElement>('#info-social img');
  }

  constructor() {
    comp.links = [
      { url: 'http://example1.com', icon: '/assets/1.jpg', alt: 'Image' },
      { url: 'http://example2.com', icon: '/assets/2.jpg', alt: 'Image' }
    ];
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
