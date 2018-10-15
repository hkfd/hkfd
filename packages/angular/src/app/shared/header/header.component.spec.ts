import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NgModule, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, SlicePipe } from '@angular/common';

import { RouterTestingModule, Location, SpyLocation } from '../../../testing';

import { HeaderComponent } from './header.component';

let comp: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;
let page: Page;
let location: SpyLocation;
let slicePipe: jasmine.Spy;

@Component({
  template: `<div></div>`
})
class TestComponent {}

@NgModule({
  imports: [CommonModule],
  declarations: [TestComponent]
})
export class TestModule {}

describe('HeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '**', component: TestComponent }
        ]),
        NoopAnimationsModule
      ],
      declarations: [HeaderComponent, TestComponent]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should call SlicePipe', () => {
    expect(slicePipe).toHaveBeenCalled();
  });

  it('should call SlicePipe with 0:1', () => {
    expect(slicePipe).toHaveBeenCalledWith(comp.pages, 0, 1);
  });

  it('should call SlicePipe with 1', () => {
    expect(slicePipe).toHaveBeenCalledWith(comp.pages, 1);
  });

  it('should route on logo click', async(() => {
    location.go('/page-1');
    expect(location.path()).toBe('/page-1');

    page.navLogo.nativeElement.click();
    fixture.detectChanges();

    return fixture.whenStable().then(() => {
      expect(location.path()).toBe('/');
    });
  }));

  it('should route on link click', async(() => {
    location.go('/');
    expect(location.path()).toBe('/');

    page.navLink.nativeElement.click();
    fixture.detectChanges();

    return fixture.whenStable().then(() => {
      expect(location.path()).toBe('/page-1');
    });
  }));

  it(`should set class 'active' on link click`, async(() => {
    location.go('/');
    expect(location.path()).toBe('/');

    const link: HTMLAnchorElement = page.navLink.nativeElement;

    link.click();
    fixture.detectChanges();

    return fixture.whenStable().then(() => {
      expect(link.className).toContain('active');
    });
  }));

  describe('navClick', () => {
    it('should be called on link click', () => {
      page.navLink.triggerEventHandler('click', {});

      expect(page.navClick).toHaveBeenCalled();
    });

    it('should set mobileShow to false', () => {
      comp.mobileShow = true;
      page.navLink.triggerEventHandler('click', {});

      expect(comp.mobileShow).toBe(false);
    });
  });

  describe('toggleMobile', () => {
    it('should be called on button click', () => {
      page.navButton.triggerEventHandler('click', {});

      expect(page.toggleMobile).toHaveBeenCalled();
    });

    it('should set mobileShow to true if false', () => {
      comp.mobileShow = false;
      comp.toggleMobile();

      expect(comp.mobileShow).toBe(true);
    });

    it('should set mobileShow to false if true', () => {
      comp.mobileShow = true;
      comp.toggleMobile();

      expect(comp.mobileShow).toBe(false);
    });
  });
});

class Page {
  navClick: jasmine.Spy;
  toggleMobile: jasmine.Spy;

  navLogo!: DebugElement;
  navLink!: DebugElement;
  navButton!: DebugElement;

  constructor() {
    comp.pages = [
      { url: '/' },
      { title: 'Page 1', url: '/page-1' },
      { title: 'Page 2', url: '/page-2' }
    ];

    this.navClick = spyOn(comp, 'navClick').and.callThrough();
    this.toggleMobile = spyOn(comp, 'toggleMobile').and.callThrough();
  }

  addElements() {
    this.navLogo = fixture.debugElement.query(By.css('#nav-logo'));
    this.navLink = fixture.debugElement.query(By.css('.nav-link'));
    this.navButton = fixture.debugElement.query(By.css('#nav-button'));
  }
}

function createComponent() {
  fixture = TestBed.createComponent(HeaderComponent);
  comp = fixture.componentInstance;
  location = fixture.debugElement.injector.get<SpyLocation>(Location as any);
  page = new Page();
  slicePipe = spyOn(SlicePipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}
