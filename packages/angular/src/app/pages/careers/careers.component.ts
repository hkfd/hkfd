import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { MetaService, ApiService } from 'shared';
import { Career } from 'api';
import { CareersImages } from './careers.images';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit, OnDestroy {
  careers$!: Subscription;
  careers: Career[] | undefined;

  images = CareersImages;

  constructor(
    private metaService: MetaService,
    private apiService: ApiService
  ) {}

  careerTrackBy(_index: number, { id }: Career) {
    return id;
  }

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
