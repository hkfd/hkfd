import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { MetaService, ApiService, Api } from 'shared';
import { CareersImages } from './careers.images';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit, OnDestroy {
  careers$!: Subscription;
  careers: Api.Career[] | undefined;

  images = CareersImages;

  constructor(
    private metaService: MetaService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.metaService.setMetaTags({ title: 'Careers', url: 'careers' });

    this.careers$ = this.apiService
      .getCareers()
      .subscribe(careers => (this.careers = careers));
  }

  ngOnDestroy() {
    this.careers$.unsubscribe();
  }
}
