import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { MetaService, ApiService } from 'shared';
import { Service, Client, CaseStudy } from 'api';
import { HomeImages } from './home.images';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  services$!: Observable<Service[]>;
  clients$!: Observable<Client[]>;
  caseStudies$!: Subscription;
  caseStudies: CaseStudy[] | undefined;

  images = HomeImages;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private metaService: MetaService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.metaService.setMetaTags({});

    this.services$ = this.apiService.getServices();
    this.clients$ = this.apiService.getClients();

    this.caseStudies$ = this.apiService
      .getCaseStudies()
      .subscribe(caseStudies => {
        this.caseStudies = caseStudies.filter(
          ({ featured }) => featured === true
        );
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy() {
    this.caseStudies$.unsubscribe();
  }
}
