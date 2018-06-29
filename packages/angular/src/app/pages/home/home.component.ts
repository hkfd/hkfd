import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { TitleService, ApiService, Api } from '../../shared/shared.module';
import { HomeImages } from './home.images';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  services$: Observable<Api.Service[]>;
  clients$: Observable<Api.Client[]>;
  caseStudies$: Subscription;
  caseStudies: Api.CaseStudy[];

  images = HomeImages;

  constructor(
    private titleService: TitleService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.titleService.setTitle();

    this.services$ = this.apiService.getServices();
    this.clients$ = this.apiService.getClients();

    this.caseStudies$ = this.apiService
      .getCaseStudies()
      .subscribe(
        caseStudies =>
          (this.caseStudies = caseStudies.filter(
            caseStudy => caseStudy.featured === true
          ))
      );
  }

  ngOnDestroy() {
    this.caseStudies$.unsubscribe();
  }
}
