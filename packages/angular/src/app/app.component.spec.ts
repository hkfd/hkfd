import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, PLATFORM_ID } from '@angular/core';
import { Location } from '@angular/common';

import { Router, RouterTestingModule, MockNotificationService } from 'testing';
import { Subscription } from 'rxjs';

import { environment } from 'environment';
import { NotificationService } from 'shared';
import { AppComponent } from './app.component';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let page: Page;
let router: Router;
let notificationService: NotificationService;
let mockPlatformId: 'browser' | 'server';

@Component({
  template: 'Page 1'
})
class Page1Component {}

@Component({
  template: 'Page 2'
})
class Page2Component {}

describe('AppComponent', () => {
  it('should create component', () => {
    setupTest();
    createComponent();

    expect(comp).toBeTruthy();
  });

  describe('`ngOnInit`', () => {
    describe('browser', () => {
      beforeEach(() => (mockPlatformId = 'browser'));
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));

      it('should call `ga` with `create`, `environment.analyticsId`, and `auto` args', () => {
        expect((window as any).ga).toHaveBeenCalledWith(
          'create',
          environment.analyticsId,
          'auto'
        );
      });

      it('should set `router$`', () => {
        expect(comp.router$).toBeDefined();
      });

      it('should subscribe to `Router` `events`', () => {
        expect(router.events.subscribe).toHaveBeenCalled();
      });

      describe('Routing', () => {
        it('should call `ga` with `set`, `title`, and `Heckford` args', () =>
          router
            .navigateByUrl('page-1')
            .then(_ =>
              expect((window as any).ga).toHaveBeenCalledWith(
                'set',
                'title',
                'Heckford'
              )
            ));

        it('should call `ga` with `set`, `page`, and `urlAfterRedirects` args', () =>
          router
            .navigateByUrl('page-2')
            .then(_ =>
              expect((window as any).ga).toHaveBeenCalledWith(
                'set',
                'page',
                '/page-2'
              )
            ));

        it('should call `ga` with `send` and `pageview` args', () =>
          router
            .navigateByUrl('page-2')
            .then(_ =>
              expect((window as any).ga).toHaveBeenCalledWith(
                'send',
                'pageview'
              )
            ));

        it('should call `NotificationService` `dismissMessage`', () =>
          router
            .navigateByUrl('page-2')
            .then(_ =>
              expect(notificationService.dismissMessage).toHaveBeenCalled()
            ));

        it('should not call `ga` with `set`, `page`, and redirected url args', () =>
          router
            .navigateByUrl('no-page')
            .then(_ =>
              expect((window as any).ga).not.toHaveBeenCalledWith(
                'set',
                'page',
                '/no-page'
              )
            ));
      });
    });

    describe('server', () => {
      beforeEach(() => (mockPlatformId = 'server'));
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));

      it('should not call `ga`', () => {
        expect((window as any).ga).not.toHaveBeenCalled();
      });

      it('should not set `router$`', () => {
        expect(comp.router$).toBeUndefined();
      });
    });
  });

  describe('`ngOnDestroy`', () => {
    describe('browser', () => {
      beforeEach(() => (mockPlatformId = 'browser'));
      beforeEach(async(() => setupTest()));
      beforeEach(async(() => createComponent()));

      it('should call `router$` `unsubscribe`', () => {
        jest.spyOn(comp.router$ as Subscription, 'unsubscribe');
        comp.ngOnDestroy();

        expect((comp.router$ as Subscription).unsubscribe).toHaveBeenCalled();
      });
    });
  });

  describe('`getState`', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));

    it('should be called on route change', () =>
      router
        .navigateByUrl('page-1')
        .then(_ => expect(comp.getState).toHaveBeenCalled()));

    it('should return `activatedRouteData` `state`', () => {
      const res = comp.getState({
        activatedRouteData: { state: 'state' }
      } as any);

      expect(res).toBe('state');
    });
  });

  describe('Template', () => {
    beforeEach(async(() => setupTest()));
    beforeEach(async(() => createComponent()));

    it('should display header', () => {
      expect(page.header).toBeTruthy();
    });

    it('should display router outlet', () => {
      expect(page.routerOutlet).toBeTruthy();
    });

    it('should display footer', () => {
      expect(page.footer).toBeTruthy();
    });
  });
});

function setupTest() {
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
          path: '**',
          redirectTo: 'page-1',
          pathMatch: 'full'
        }
      ]),
      NoopAnimationsModule
    ],
    declarations: [AppComponent, Page1Component, Page2Component],
    providers: [
      Location,
      { provide: PLATFORM_ID, useValue: mockPlatformId },
      { provide: NotificationService, useClass: MockNotificationService }
    ]
  }).compileComponents();
}

class Page {
  get header() {
    return this.query<HTMLElement>('header');
  }
  get routerOutlet() {
    return this.query<HTMLElement>('router-outlet');
  }
  get footer() {
    return this.query<HTMLElement>('footer');
  }

  constructor() {
    jest.spyOn(comp, 'getState');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(AppComponent);
  comp = fixture.componentInstance;
  (global as any).ga = jest.fn();
  router = fixture.debugElement.injector.get<Router>(Router);
  notificationService = fixture.debugElement.injector.get<NotificationService>(
    NotificationService
  );
  jest.spyOn(router.events, 'subscribe');
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
