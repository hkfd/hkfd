import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { Subscription } from 'rxjs';
import { concatMapTo, tap, map } from 'rxjs/operators';

import { ApiService } from 'shared';
import { Service, Client, CaseStudy } from 'api';
import { HomeImages } from './home.images';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  dataSub: Subscription | undefined;
  services: Service[] | undefined;
  caseStudies: CaseStudy[] | undefined;
  clients: Client[] | undefined;

  images = HomeImages;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.dataSub = this.apiService
      .getServices()
      .pipe(
        tap(services => {
          this.services = services;
          this.changeDetectorRef.markForCheck();
        }),
        concatMapTo(this.apiService.getCaseStudies()),
        map(caseStudies =>
          caseStudies.filter(({ featured }) => featured === true)
        ),
        tap(caseStudies => {
          this.caseStudies = caseStudies;
          this.changeDetectorRef.markForCheck();
        }),
        concatMapTo(this.apiService.getClients())
      )
      .subscribe(clients => {
        this.clients = clients;
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy() {
    this.dataSub && this.dataSub.unsubscribe();
  }
}
