import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NgModule, Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, SlicePipe } from '@angular/common';

import { RouterTestingModule, makeImmutable } from 'testing';

import { HeaderComponent } from './header.component';

let comp: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;
let page: Page;
let slicePipe: jasmine.Spy;

@Component({
  template: ''
})
class TestComponent {}

@NgModule({
  imports: [CommonModule],
  declarations: [TestComponent]
})
export class TestModule {}

describe('HeaderComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '**', component: TestComponent }
        ]),
        NoopAnimationsModule
      ],
      declarations: [HeaderComponent, TestComponent]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  beforeEach(() => {
    comp.pages = makeImmutable([
      { url: '/' },
      { title: 'Page 1', url: '/page-1' },
      { title: 'Page 2', url: '/page-2' }
    ]);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `mobileShow` as `false`', () => {
    expect(comp.mobileShow).toBe(false);
  });

  describe('`navClick`', () => {
    beforeEach(() => ((comp.mobileShow as any) = undefined));

    it('should set `mobileShow` as `false`', () => {
      comp.navClick();

      expect(comp.mobileShow).toBe(false);
    });
  });

  describe('`toggleMobile`', () => {
    describe('`false`', () => {
      beforeEach(() => (comp.mobileShow = false));

      it('should set `mobileShow` as `true`', () => {
        comp.toggleMobile();

        expect(comp.mobileShow).toBe(true);
      });
    });

    describe('`true`', () => {
      beforeEach(() => (comp.mobileShow = true));

      it('should set `mobileShow` as `false`', () => {
        comp.toggleMobile();

        expect(comp.mobileShow).toBe(false);
      });
    });
  });

  describe('Template', () => {
    describe('Logo', () => {
      it('should be displayed', () => {
        expect(page.navLogo).toBeTruthy();
      });

      it('should call `SlicePipe` with `0:1` arg', () => {
        expect(slicePipe).toHaveBeenCalledWith(comp.pages, 0, 1);
      });

      it('should set href', () => {
        expect(page.navLogo.href).toBe('http://localhost:9876/');
      });

      it('should call `navClick` on click', () => {
        page.navLogo.click();

        expect(page.navClick).toHaveBeenCalled();
      });
    });

    describe('Toggle', () => {
      it('should be displayed', () => {
        expect(page.navToggle).toBeTruthy();
      });

      it('should call `toggleMobile` on click', () => {
        page.navToggle.click();

        expect(page.toggleMobile).toHaveBeenCalled();
      });
    });

    describe('Links', () => {
      it('should be displayed', () => {
        expect(page.navLinks.length).toBe(2);
      });

      describe('Link', () => {
        it('should call `SlicePipe` with `1` arg', () => {
          expect(slicePipe).toHaveBeenCalledWith(comp.pages, 1);
        });

        it('should display title', () => {
          expect((page.navLinks[0].textContent as string).trim()).toBe(
            'PAGE 1'
          );
        });

        it('should set href', () => {
          expect(page.navLinks[0].href).toBe('http://localhost:9876/page-1');
        });

        it('should call `navClick` on click', () => {
          page.navLinks[0].click();

          expect(page.navClick).toHaveBeenCalled();
        });

        describe('Active', () => {
          it('should not have class `active`', () => {
            expect(page.navLinks[0].classList.contains('active')).toBeFalsy();
          });

          it('should have class `active` on click', () => {
            page.navLinks[0].click();

            return fixture.whenStable().then(_ => {
              expect(
                page.navLinks[0].classList.contains('active')
              ).toBeTruthy();
            });
          });
        });
      });
    });
  });
});

class Page {
  navClick: jasmine.Spy;
  toggleMobile: jasmine.Spy;

  get navLogo() {
    return this.query<HTMLAnchorElement>('#nav-logo');
  }
  get navToggle() {
    return this.query<HTMLButtonElement>('#nav-button');
  }
  get navLinks() {
    return this.queryAll<HTMLAnchorElement>('.nav-link');
  }

  constructor() {
    this.navClick = spyOn(comp, 'navClick').and.callThrough();
    this.toggleMobile = spyOn(comp, 'toggleMobile').and.callThrough();
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(HeaderComponent);
  comp = fixture.componentInstance;
  slicePipe = spyOn(SlicePipe.prototype, 'transform').and.callThrough();
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
