import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Router, RouterTestingModule } from '../../../testing';

import { HeaderComponent } from './header.component';

let comp: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;
let page: Page;
let router: RouterStub;

describe('HeaderComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, NoopAnimationsModule],
        declarations: [HeaderComponent]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createComponent()));

  describe('navClick', () => {
    it('should be called on link click', () => {
      page.navLink.triggerEventHandler('click', null);

      expect(page.navClick).toHaveBeenCalled();
    });

    it('should be called with page url arg on link click', () => {
      page.navLink.triggerEventHandler('click', null);

      expect(page.navClick).toHaveBeenCalledWith('/page-1');
    });

    it('should set mobileShow to false', () => {
      comp.mobileShow = true;
      page.navLink.triggerEventHandler('click', null);

      expect(comp.mobileShow).toBe(false);
    });

    it('should call Router navigateByUrl', () => {
      page.navLink.triggerEventHandler('click', null);

      expect(router.navigateByUrl).toHaveBeenCalled();
    });

    it('should call Router navigateByUrl with url arg', () => {
      page.navLink.triggerEventHandler('click', null);

      expect(router.navigateByUrl).toHaveBeenCalledWith('/page-1');
    });
  });

  describe('toggleMobile', () => {
    it('should be called on button click', () => {
      page.navButton.triggerEventHandler('click', null);

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

  describe('linkActive', () => {
    it('should call Router isActive', () => {
      expect(router.isActive).toHaveBeenCalled();
    });

    it('should call Router isActive with url arg', () => {
      expect(router.isActive).toHaveBeenCalledWith('/page-1', true);
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(HeaderComponent);
  comp = fixture.componentInstance;
  page = new Page();
  router = new RouterStub();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class RouterStub {
  navigateByUrl: jasmine.Spy;
  isActive: jasmine.Spy;

  constructor() {
    const noop = () => undefined;
    const router = fixture.debugElement.injector.get(Router);

    this.navigateByUrl = spyOn(router, 'navigateByUrl').and.callFake(noop);
    this.isActive = spyOn(router, 'isActive').and.callFake(noop);
  }
}

class Page {
  navClick: jasmine.Spy;
  toggleMobile: jasmine.Spy;

  navLink: DebugElement;
  navButton: DebugElement;

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
    this.navLink = fixture.debugElement.query(By.css('.nav-link'));
    this.navButton = fixture.debugElement.query(By.css('#nav-button'));
  }
}
