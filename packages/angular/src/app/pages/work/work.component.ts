import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { ApiService, CaseStudy } from '../../shared/shared.module';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit, OnDestroy {
  caseStudies$: Subscription;
  caseStudies: CaseStudy[];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.caseStudies$ = this.apiService
      .getCaseStudies()
      .subscribe(
        (caseStudies: CaseStudy[]) => (this.caseStudies = caseStudies)
      );
  }

  ngOnDestroy() {
    this.caseStudies$.unsubscribe();
  }
}
