import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { RichText } from 'prismic-dom';

import { MetaService, PrismicService } from 'shared';
import { Post, PostsResponse } from 'prismic';
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
  richText = RichText;
  getPaginationUrl = getPaginationUrl;

  posts$: Observable<PostsResponse> | undefined;

  constructor(
    private route: ActivatedRoute,
    private prismicService: PrismicService,
    private metaService: MetaService
  ) {}

  postTrackBy(_index: number, { id }: Post) {
    return id;
  }

  ngOnInit() {
    this.metaService.setMetaTags({ title: 'News', url: 'news' });

    this.posts$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('page') || '1'),
      switchMap(page => this.prismicService.getPosts(page))
    );
  }
}
