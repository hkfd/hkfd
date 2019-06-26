import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

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
    const uid = this.route.snapshot.paramMap.get('uid');
    if (!uid) throw new Error('No `uid`');

    this.news$ = this.prismicService.getPost('news', uid);
  }
}
