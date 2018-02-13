import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { ApiService, CaseStudy } from '../../../shared/shared.module';

@Component({
  selector: 'app-case-study',
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.scss']
})
export class CaseStudyComponent implements OnInit, OnDestroy {
  caseStudy$: Subscription;
  caseStudy: CaseStudy;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.caseStudy$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.apiService.getCaseStudy(params.get('id'))
      )
      .subscribe((caseStudy: CaseStudy) => (this.caseStudy = caseStudy));
  }

  ngOnDestroy() {
    this.caseStudy$.unsubscribe();
  }
}
