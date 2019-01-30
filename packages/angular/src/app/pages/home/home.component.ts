import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { MetaService, ApiService } from 'shared';
import { Service, Client, CaseStudy } from 'api';
import { HomeImages } from './home.images';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  services$!: Observable<Service[]>;
  clients$!: Observable<Client[]>;
  caseStudies$!: Subscription;
  caseStudies: CaseStudy[] | undefined;

  images = HomeImages;

  constructor(
    private metaService: MetaService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.metaService.setMetaTags({});

    this.services$ = this.apiService.getServices();
    this.clients$ = this.apiService.getClients();

    this.caseStudies$ = this.apiService
      .getCaseStudies()
      .subscribe(
        caseStudies =>
          (this.caseStudies = caseStudies.filter(
            ({ featured }) => featured === true
          ))
      );
  }

  ngOnDestroy() {
    this.caseStudies$.unsubscribe();
  }
}
