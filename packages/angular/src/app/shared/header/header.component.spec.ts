import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { NgModule, Component, ChangeDetectorRef } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, SlicePipe } from '@angular/common';

import { RouterTestingModule } from 'testing';

import { HeaderComponent } from './header.component';

let comp: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;
let changeDetectorRef: ChangeDetectorRef;
let page: Page;

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
    const pages = () => [
      { url: '/' },
      { title: 'Page 1', url: '/page-1' },
      { title: 'Page 2', url: '/page-2' }
    ];
    comp.pages = pages();
    changeDetectorRef.markForCheck();
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
        expect(SlicePipe.prototype.transform).toHaveBeenCalledWith(
          comp.pages,
          0,
          1
        );
      });

      it('should set href', () => {
        expect(page.navLogo.href).toBe('http://localhost/');
      });

      it('should call `navClick` on click', () => {
        page.navLogo.click();

        expect(comp.navClick).toHaveBeenCalled();
      });
    });

    describe('Toggle', () => {
      it('should be displayed', () => {
        expect(page.navToggle).toBeTruthy();
      });

      it('should call `toggleMobile` on click', () => {
        page.navToggle.click();

        expect(comp.toggleMobile).toHaveBeenCalled();
      });
    });

    describe('Links', () => {
      it('should be displayed', () => {
        expect(page.navLinks.length).toBe(2);
      });

      describe('Link', () => {
        it('should call `SlicePipe` with `1` arg', () => {
          expect(SlicePipe.prototype.transform).toHaveBeenCalledWith(
            comp.pages,
            1
          );
        });

        it('should display title', () => {
          expect((page.navLinks[0].textContent as string).trim()).toBe(
            'Page 1'
          );
        });

        it('should set href', () => {
          expect(page.navLinks[0].href).toBe('http://localhost/page-1');
        });

        it('should call `navClick` on click', () => {
          page.navLinks[0].click();

          expect(comp.navClick).toHaveBeenCalled();
        });

        describe('Active', () => {
          it('should not have class `active`', () => {
            expect(page.navLinks[0].classList.contains('active')).toBeFalsy();
          });

          it('should have class `active` on click', fakeAsync(() => {
            page.navLinks[0].click();
            fixture.detectChanges();
            tick();

            expect(page.navLinks[0].classList.contains('active')).toBeTruthy();
          }));
        });
      });
    });
  });
});

class Page {
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
    jest.spyOn(comp, 'navClick');
    jest.spyOn(comp, 'toggleMobile');
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
  changeDetectorRef = fixture.debugElement.injector.get<ChangeDetectorRef>(
    ChangeDetectorRef as any
  );
  jest.spyOn(SlicePipe.prototype, 'transform');
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
