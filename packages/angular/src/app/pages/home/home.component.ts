import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../shared/shared.module';
import { Page, Service, CaseStudy } from '../../shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  page$: Subscription;
  page: Page;

  services$: Observable<Service[]>;
  caseStudies$: Observable<CaseStudy[]>;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.page$ = this.apiService
      .getPage('home')
      .subscribe((page: Page) => (this.page = page));

    this.services$ = this.apiService.getServices();
    this.caseStudies$ = this.apiService.getCaseStudies();
  }

  ngOnDestroy() {
    this.page$.unsubscribe();
  }
}
