import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

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

  imagesClients: Image[] = [
    {
      name: 'client-aston-martin',
      alt: 'Aston Martin'
    },
    {
      name: 'client-wainhomes',
      alt: 'Wainhomes'
    },
    {
      name: 'client-vimto',
      alt: 'Vimto'
    },
    {
      name: 'client-bmw',
      alt: 'BMW'
    },
    {
      name: 'client-lancashire-county-council',
      alt: 'Lancashire County Council'
    },
    {
      name: 'client-blackpool-council',
      alt: 'Blackpool Council'
    },
    {
      name: 'client-tomy',
      alt: 'Tomy'
    },
    {
      name: 'client-galliford-try',
      alt: 'Galliford Try'
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
  }

  ngOnDestroy() {
    this.page$.unsubscribe();
    this.caseStudies$.unsubscribe();
  }
}
