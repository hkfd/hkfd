import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { TitleService, ApiService, ApiPipe, Api } from 'shared';
import { WorkAnimations } from './work.animations';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  animations: WorkAnimations
})
export class WorkComponent implements OnInit, OnDestroy {
  caseStudies$: Subscription;
  caseStudies: Api.CaseStudy[];

  constructor(
    private titleService: TitleService,
    private apiService: ApiService,
    private apiPipe: ApiPipe
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Our Work');

    this.caseStudies$ = this.apiService.getCaseStudies().subscribe(
      caseStudies =>
        (this.caseStudies = caseStudies.map(caseStudy => {
          caseStudy.thumbnail = this.apiPipe.transform(caseStudy.thumbnail);
          return caseStudy;
        }))
    );
  }

  ngOnDestroy() {
    this.caseStudies$.unsubscribe();
  }
}
