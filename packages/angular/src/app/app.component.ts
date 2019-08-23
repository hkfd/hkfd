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
import { NotificationService } from 'shared/notification.service';
import { MetaService } from 'shared/meta.service';
import { createMetaTags } from './app.component.helpers';

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
    @Inject(PLATFORM_ID) private platformId: Object,
    private notificationService: NotificationService,
    private metaService: MetaService
  ) {}

  getState({ activatedRouteData: { state } }: RouterOutlet) {
    return state;
  }

  ngOnInit() {
    if (isPlatformServer(this.platformId)) return;

    ga('create', environment.analyticsId, 'auto');

    this.router$ = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe(({ urlAfterRedirects }) => {
        this.metaService.setMetaTags(createMetaTags(urlAfterRedirects));

        ga('set', 'title', 'Heckford');
        ga('set', 'page', urlAfterRedirects);
        ga('send', 'pageview');

        this.notificationService.dismissMessage();
      });
  }

  ngOnDestroy() {
    if (this.router$) this.router$.unsubscribe();
  }
}
