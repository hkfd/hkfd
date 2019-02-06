import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { MetaService, ApiService, ApiPipe } from 'shared';
import { CaseStudy } from 'api';
import { WorkAnimations } from './work.animations';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  animations: WorkAnimations
})
export class WorkComponent implements OnInit, OnDestroy {
  caseStudies$!: Subscription;
  caseStudies: CaseStudy[] | undefined;

  constructor(
    private metaService: MetaService,
    private apiService: ApiService,
    private apiPipe: ApiPipe
  ) {}

  ngOnInit() {
    this.metaService.setMetaTags({ title: 'Our Work', url: 'work' });

    this.caseStudies$ = this.apiService.getCaseStudies().subscribe(
      caseStudies =>
        (this.caseStudies = caseStudies.map(caseStudy => ({
          ...caseStudy,
          thumbnail: this.apiPipe.transform(caseStudy.thumbnail) as any
        })))
    );
  }

  ngOnDestroy() {
    this.caseStudies$.unsubscribe();
  }
}
