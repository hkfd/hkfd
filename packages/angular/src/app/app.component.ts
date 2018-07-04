import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformServer } from '@angular/common';
import {
  Router,
  RouterOutlet,
  RouterEvent,
  NavigationEnd
} from '@angular/router';

import { Subscription } from 'rxjs';

import { environment } from 'environment';
import { AppAnimations } from './app.animations';

@Component({
  selector: 'app-root',
  template: `<header></header>
  <main [@routeTransition]="getState(outlet)">
  <router-outlet #outlet="outlet"></router-outlet>
  </main>
  <footer></footer>`,
  animations: AppAnimations
})
export class AppComponent implements OnInit, OnDestroy {
  router$: Subscription;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }

  ngOnInit() {
    if (isPlatformServer(this.platformId)) return;

    ga('create', environment.analyticsId, 'auto');

    this.router$ = this.router.events.subscribe((event: RouterEvent) => {
      if (!(event instanceof NavigationEnd)) return;

      const scrollEl = document.scrollingElement || document.documentElement;
      this.renderer.setProperty(scrollEl, 'scrollTop', 0);

      ga('set', 'title', 'Heckford');
      ga('set', 'page', event.urlAfterRedirects);
      ga('send', 'pageview');
    });
  }

  ngOnDestroy() {
    if (this.router$) this.router$.unsubscribe();
  }
}
