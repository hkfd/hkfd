import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { WorkAnimations } from './work.animations';
import {
  TitleService,
  ApiService,
  CaseStudy
} from '../../shared/shared.module';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  animations: WorkAnimations
})
export class WorkComponent implements OnInit, OnDestroy {
  caseStudies$: Subscription;
  caseStudies: CaseStudy[] = [];

  constructor(
    private titleService: TitleService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Our Work');

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
