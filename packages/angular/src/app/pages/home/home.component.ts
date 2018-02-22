import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import {
  TitleService,
  ApiService,
  Page,
  Service,
  CaseStudy,
  Image
} from '../../shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  page$: Subscription;
  page: Page;

  caseStudies$: Subscription;
  caseStudies: CaseStudy[];

  services$: Observable<Service[]>;
  clients$: Observable<Image[]>;

  imagesIntro: Image[] = [
    {
      name: 'heckford-building',
      alt: 'Heckford – Preston'
    },
    {
      name: 'heckford-reception1',
      alt: 'Heckford reception'
    },
    {
      name: 'heckford-reception3',
      alt: 'Heckford reception'
    },
    {
      name: 'heckford-accounts',
      alt: 'Heckford accounts'
    },
    {
      name: 'heckford-print1',
      alt: 'Heckford printing'
    },
    {
      name: 'heckford-reception2',
      alt: 'Heckford reception'
    },
    {
      name: 'heckford-print2',
      alt: 'Heckford printing'
    },
    {
      name: 'heckford-studio',
      alt: 'Heckford studio'
    }
  ];

  constructor(
    private titleService: TitleService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.titleService.setTitle();

    this.page$ = this.apiService
      .getPage('home')
      .subscribe((page: Page) => (this.page = page));

    this.caseStudies$ = this.apiService
      .getCaseStudies()
      .subscribe(
        (caseStudies: CaseStudy[]) =>
          (this.caseStudies = caseStudies.filter(
            (caseStudy: CaseStudy) => caseStudy.featured
          ))
      );

    this.services$ = this.apiService.getServices();
    this.clients$ = this.apiService.getClients();
  }

  ngOnDestroy() {
    this.page$.unsubscribe();
    this.caseStudies$.unsubscribe();
  }
}
