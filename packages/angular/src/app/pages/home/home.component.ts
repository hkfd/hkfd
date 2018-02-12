import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../shared/shared.module';
import { Page, Service, CaseStudy, Image } from '../../shared/shared.module';

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
      name: 'New-Watermouth-logos.jpg'
    },
    {
      name: 'map-illustration.jpg'
    },
    { name: 'map-watermouth.jpg' },
    {
      name: 'Apple-Devices-watermouth.jpg'
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
