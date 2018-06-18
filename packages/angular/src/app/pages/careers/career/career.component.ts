import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { TitleService, ApiService, Api } from '../../../shared/shared.module';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit, OnDestroy {
  career$: Subscription;
  career: Api.Career;

  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.career$ = this.route.data.subscribe(
      ({ career }: { career: Api.Career }) => {
        this.career = career;
        this.titleService.setTitle(career.title);
      }
    );
  }

  ngOnDestroy() {
    this.career$.unsubscribe();
  }
}
