import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { Subscription } from 'rxjs';

import { ApiService, ApiPipe } from 'shared';
import { CaseStudy } from 'api';
import { WorkAnimations } from './work.animations';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  animations: WorkAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkComponent implements OnInit, OnDestroy {
  caseStudies$: Subscription | undefined;
  caseStudies: Visible<CaseStudy>[] | undefined;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private apiService: ApiService,
    private apiPipe: ApiPipe
  ) {}

  handleVisible(caseStudy: Visible<CaseStudy>) {
    caseStudy.isVisible = true;
  }

  ngOnInit() {
    this.caseStudies$ = this.apiService
      .getCaseStudies()
      .subscribe(caseStudies => {
        this.caseStudies = caseStudies.map(caseStudy => ({
          ...caseStudy,
          thumbnail: this.apiPipe.transform(caseStudy.thumbnail) as any
        }));
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy() {
    this.caseStudies$ && this.caseStudies$.unsubscribe();
  }
}
