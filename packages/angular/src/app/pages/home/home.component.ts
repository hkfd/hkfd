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

  services$: Observable<Service[]>;
  caseStudies$: Observable<CaseStudy[]>;

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

    this.services$ = this.apiService.getServices();
    this.caseStudies$ = this.apiService.getCaseStudies();
  }

  ngOnDestroy() {
    this.page$.unsubscribe();
  }
}
