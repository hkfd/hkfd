import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Career } from 'api';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerComponent implements OnInit, OnDestroy {
  career$: Subscription | undefined;
  career: Career | undefined;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.career$ = this.route.data.subscribe(({ career }) => {
      this.career = career;
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.career$ && this.career$.unsubscribe();
  }
}
