import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import {
  TitleService,
  ApiService,
  CaseStudy
} from '../../shared/shared.module';
import { WorkAnimations } from './work.animations';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  animations: WorkAnimations
})
export class WorkComponent implements OnInit {
  caseStudies$: Observable<CaseStudy[]>;

  constructor(
    private titleService: TitleService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Our Work');

    this.caseStudies$ = this.apiService.getCaseStudies();
  }
}
