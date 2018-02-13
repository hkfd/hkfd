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
      name: 'LARGE-sandcasle-logo-on-LIME.jpg',
      alt: null
    },
    {
      name: 'LUTRON-lightbulb.jpg',
      alt: null
    },
    {
      name: 'Priestley-College-MORE-TOP.jpg',
      alt: null
    },
    {
      name: 'regatta-image.jpg',
      alt: null
    },
    {
      name: 'Wigan-College-gym-girl.jpg',
      alt: null
    }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
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
  }
}
