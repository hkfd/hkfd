import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: '<header></header><router-outlet></router-outlet><footer></footer>'
})
export class AppComponent implements OnInit, OnDestroy {
  router$: Subscription;

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit() {
    ga('create', environment.analyticsId, 'auto');

    this.router$ = this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) return;

      const scrollEl = document.scrollingElement || document.documentElement;
      this.renderer.setProperty(scrollEl, 'scrollTop', 0);

      ga('set', 'title', 'Heckford');
      ga('set', 'page', event.urlAfterRedirects);
      ga('send', 'pageview');
    });
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }
}
