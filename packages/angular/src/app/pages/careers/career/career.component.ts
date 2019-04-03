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

import { ApiService } from 'shared';
import { Career } from 'api';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerComponent implements OnInit, OnDestroy {
  careerSub: Subscription | undefined;
  career: Career | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.careerSub = this.route.paramMap
      .pipe(
        map((params: ParamMap) => params.get('id')),
        filter((id): id is string => Boolean(id)),
        switchMap(id => this.apiService.getCareer(id))
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
