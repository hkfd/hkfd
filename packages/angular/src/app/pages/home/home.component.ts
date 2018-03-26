import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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
  services$: Observable<Service[]>;
  caseStudies$: Subscription;
  caseStudies: CaseStudy[];
  clients$: Subscription;
  clients: string;

  images = HomeImages;

  constructor(
    private titleService: TitleService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.titleService.setTitle();

    this.services$ = this.apiService.getServices();

    this.caseStudies$ = this.apiService
      .getCaseStudies()
      .subscribe(
        (caseStudies: CaseStudy[]) =>
          (this.caseStudies = caseStudies.filter(
            caseStudy => caseStudy.featured === true
          ))
      );

    this.clients$ = this.apiService
      .getClients()
      .subscribe((clients: string[]) => (this.clients = clients.join(', ')));
  }

  ngOnDestroy() {
    this.clients$.unsubscribe();
  }
}
