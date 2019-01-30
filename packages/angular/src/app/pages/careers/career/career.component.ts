import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Career } from 'api';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit, OnDestroy {
  career$!: Subscription;
  career: Career | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.career$ = this.route.data.subscribe(
      ({ career }) => (this.career = career)
    );
  }

  ngOnDestroy() {
    this.career$.unsubscribe();
  }
}
