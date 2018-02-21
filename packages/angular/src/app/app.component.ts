import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  template: '<header></header><router-outlet></router-outlet><footer></footer>'
})
export class AppComponent implements OnInit, OnDestroy {
  router$: Subscription;

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit() {
    this.router$ = this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) return;

      this.renderer.setProperty(document.body, 'scrollTop', 0);
    });
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }
}
