import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import {
  TitleService,
  ApiService,
  Career,
  Image
} from '../../shared/shared.module';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit, OnDestroy {
  careers$: Subscription;
  careers: Career[];

  imageIntro: Image = {
    name: 'careers-intro',
    alt: 'Careers'
  };

  imageCareer: Image = {
    name: 'career',
    alt: 'Heckford studio'
  };

  constructor(
    private titleService: TitleService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Careers');

    this.careers$ = this.apiService
      .getCareers()
      .subscribe((careers: Career[]) => (this.careers = careers));
  }

  ngOnDestroy() {
    this.careers$.unsubscribe();
  }
}