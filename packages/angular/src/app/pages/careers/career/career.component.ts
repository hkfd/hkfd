import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';

import { PrismicService, PostReturn } from 'shared';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerComponent implements OnInit {
  career$: Observable<PostReturn<'career'>> | undefined;

  constructor(
    private route: ActivatedRoute,
    private prismicService: PrismicService
  ) {}

  ngOnInit() {
    this.career$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('uid')),
      filter((uid): uid is string => Boolean(uid)),
      switchMap(uid => this.prismicService.getPost('career', uid))
    );
  }
}
