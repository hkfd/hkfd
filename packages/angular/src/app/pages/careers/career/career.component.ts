import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

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
    const uid = this.route.snapshot.paramMap.get('uid');
    if (!uid) throw new Error('No `uid`');

    this.career$ = this.prismicService.getPost('career', uid);
  }
}
