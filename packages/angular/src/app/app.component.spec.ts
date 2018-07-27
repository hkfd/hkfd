import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { Router, RouterTestingModule } from 'testing';

import { AppComponent } from './app.component';

const app = <any>window;
let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let page: Page;
let router: Router;

@Component({
  template: 'Page 1'
})
class Page1Component {}

@Component({
  template: 'Page 2'
})
class Page2Component {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'page-1',
            component: Page1Component,
            data: {
              state: 'page1'
            }
          },
          {
            path: 'page-2',
            component: Page2Component,
            data: {
              state: 'page2'
            }
          },
          {
            path: '',
            redirectTo: 'page-1',
            pathMatch: 'full'
          }
        ]),
        NoopAnimationsModule
      ],
      declarations: [AppComponent, Page1Component, Page2Component],
      providers: [Location]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  describe('getState', () => {
    it('should be called on route change', async(() =>
      router
        .navigateByUrl('page-1')
        .then(_ => expect(page.getState).toHaveBeenCalled())));

    it('should return state', async(() =>
      router.navigateByUrl('page-2').then(_ => {
        const outlet = page.getState.calls.mostRecent().args[0];

        expect(comp.getState(outlet)).toBe('page2');
      })));
  });

  describe('OnInit', () => {
    it('should set up Google Analytics', () => {
      expect(app.ga).toHaveBeenCalledWith('create', 'def', 'auto');
    });

    it('should subscribe to Router events', () => {
      expect(comp.router$).toBeDefined();
    });

    describe('Routing', () => {
      it('should call ga', async(() =>
        router
          .navigateByUrl('page-1')
          .then(_ =>
            expect(app.ga).toHaveBeenCalledWith(
              'set',
              jasmine.anything(),
              jasmine.anything()
            )
          )));

      it(`should call ga set with title as 'Heckford'`, async(() =>
        router
          .navigateByUrl('page-1')
          .then(_ =>
            expect(app.ga).toHaveBeenCalledWith('set', 'title', 'Heckford')
          )));

      it('should call ga set with page as URL on first route change', async(() =>
        router
          .navigateByUrl('page-1')
          .then(_ =>
            expect(app.ga).toHaveBeenCalledWith('set', 'page', '/page-1')
          )));

      it('should call ga set with page as URL on second route change', async(() =>
        router
          .navigateByUrl('page-1')
          .then(() => router.navigateByUrl('page-2'))
          .then(_ =>
            expect(app.ga).toHaveBeenCalledWith('set', 'page', '/page-2')
          )));

      it('should call ga set with page as URL on redirect', async(() =>
        router
          .navigateByUrl('')
          .then(_ =>
            expect(app.ga).toHaveBeenCalledWith('set', 'page', '/page-1')
          )));

      it('should not call ga set with page as redirected URL', async(() =>
        router
          .navigateByUrl('')
          .then(_ =>
            expect(app.ga).not.toHaveBeenCalledWith('set', 'page', '/page-3')
          )));
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(AppComponent);
  comp = fixture.componentInstance;
  page = new Page();
  new GoogleAnalytics();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}

class GoogleAnalytics {
  constructor() {
    app.ga = jasmine.createSpy('ga');
  }
}

class Page {
  getState: jasmine.Spy;

  constructor() {
    router = fixture.debugElement.injector.get(Router);

    this.getState = spyOn(comp, 'getState').and.callThrough();
  }
}
