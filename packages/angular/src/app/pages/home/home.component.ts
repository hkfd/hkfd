import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
  TitleService,
  ApiService,
  Service,
  CaseStudy,
  Client,
  Image
} from '../../shared/shared.module';
import { HomeImages } from './home.images';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  services$: Observable<Service[]>;
  clients$: Observable<Client[]>;
  caseStudies$: Subscription;
  caseStudies: CaseStudy[];

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
        (caseStudies: CaseStudy[]) =>
          (this.caseStudies = caseStudies.filter(
            caseStudy => caseStudy.featured === true
          ))
      );
  }

  ngOnDestroy() {
    this.caseStudies$.unsubscribe();
  }
}
