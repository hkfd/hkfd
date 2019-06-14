import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';

import { PrismicService } from 'shared';
import { CareerPost } from 'prismic';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerComponent implements OnInit, OnDestroy {
  careerSub: Subscription | undefined;
  career: CareerPost | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private prismicService: PrismicService
  ) {}

  ngOnInit() {
    this.careerSub = this.route.paramMap
      .pipe(
        map((params: ParamMap) => params.get('uid')),
        filter((uid): uid is string => Boolean(uid)),
        switchMap(uid => this.prismicService.getPost('career', uid))
      )
      .subscribe(career => {
        this.career = career;
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy() {
    this.careerSub && this.careerSub.unsubscribe();
  }
}
