import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import {
  TitleService,
  ApiService,
  Service,
  CaseStudy,
  Image
} from '../../shared/shared.module';
import { HomeImages } from './home.images';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  caseStudies$: Subscription;
  caseStudies: CaseStudy[];

  services$: Observable<Service[]>;
  clients$: Observable<Image[]>;

  images = HomeImages;

  constructor(
    private titleService: TitleService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.titleService.setTitle();

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
    this.caseStudies$.unsubscribe();
  }
}
