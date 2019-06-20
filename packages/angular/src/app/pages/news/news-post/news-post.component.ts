import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';

import { PrismicService, PostReturn } from 'shared';

@Component({
  selector: 'app-news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['./news-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPostComponent implements OnInit {
  news$: Observable<PostReturn<'news'>> | undefined;

  constructor(
    private route: ActivatedRoute,
    private prismicService: PrismicService
  ) {}

  ngOnInit() {
    this.news$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('uid')),
      filter((uid): uid is string => Boolean(uid)),
      switchMap(uid => this.prismicService.getPost('news', uid))
    );
  }
}
