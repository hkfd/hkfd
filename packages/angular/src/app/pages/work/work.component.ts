import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { WorkAnimations } from './work.animations';
import { ApiService, CaseStudy } from '../../shared/shared.module';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  animations: WorkAnimations
})
export class WorkComponent implements OnInit, OnDestroy {
  caseStudies$: Subscription;
  caseStudies: CaseStudy[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.caseStudies$ = this.apiService
      .getCaseStudies()
      .subscribe(
        (caseStudies: CaseStudy[]) =>
          (this.caseStudies = caseStudies.filter(
            (caseStudy: CaseStudy) => !caseStudy.featured
          ))
      );
  }

  ngOnDestroy() {
    this.caseStudies$.unsubscribe();
  }
}
