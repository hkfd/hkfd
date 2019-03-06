import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  ChangeDetectionStrategy
} from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { environment } from 'environment';
import { AppAnimations } from './app.animations';

@Component({
  selector: 'app-root',
  template: `
    <header></header>
    <main [@routeTransition]="getState(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </main>
    <footer></footer>
  `,
  animations: AppAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  router$: Subscription | undefined;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getState({ activatedRouteData: { state } }: RouterOutlet) {
    return state;
  }

  ngOnInit() {
    if (isPlatformServer(this.platformId)) return;

    ga('create', environment.analyticsId, 'auto');

    // TODO: replace individual component calls to MetaService and get data from route https://github.com/angular/angular/issues/15004
    this.router$ = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe(({ urlAfterRedirects }) => {
        ga('set', 'title', 'Heckford');
        ga('set', 'page', urlAfterRedirects);
        ga('send', 'pageview');
      });
  }

  ngOnDestroy() {
    if (this.router$) this.router$.unsubscribe();
  }
}
