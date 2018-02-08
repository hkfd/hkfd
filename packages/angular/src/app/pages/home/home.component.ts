import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { ServerService } from '../../shared/server.service';
import { Page } from '../../shared/page';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  page$: Subscription;
  page: Page;

  constructor(private serverService: ServerService) {}

  ngOnInit() {
    this.page$ = this.serverService
      .getPage('home')
      .subscribe((page: Page) => (this.page = page));
  }

  ngOnDestroy() {
    this.page$.unsubscribe();
  }
}
