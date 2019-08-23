import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { PrismicService } from 'shared';
import { PostsResponse, NewsPost } from 'prismic';
import { getPaginationUrl } from './news.helpers';
import { NewsAnimations } from './news.animations';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations: NewsAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit {
  getPaginationUrl = getPaginationUrl;

  posts$: Observable<PostsResponse<NewsPost>> | undefined;

  constructor(
    private route: ActivatedRoute,
    private prismicService: PrismicService
  ) {}

  postTrackBy(_index: number, { id }: NewsPost) {
    return id;
  }

  ngOnInit() {
    this.posts$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('page') || '1'),
      switchMap(page => this.prismicService.getPosts('news', { page }))
    );
  }
}
