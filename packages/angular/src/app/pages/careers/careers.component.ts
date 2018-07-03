import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { TitleService, ApiService, Api } from 'shared';
import { CareersImages } from './careers.images';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit, OnDestroy {
  careers$: Subscription;
  careers: Api.Career[];

  images = CareersImages;

  constructor(
    private titleService: TitleService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Careers');

    this.careers$ = this.apiService
      .getCareers()
      .subscribe(careers => (this.careers = careers));
  }

  ngOnDestroy() {
    this.careers$.unsubscribe();
  }
}
