import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { RichText } from 'prismic-dom';

import { MetaService, PrismicService } from 'shared';
import { Post } from 'prismic';
import { NewsAnimations } from './news.animations';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations: NewsAnimations
})
export class NewsComponent implements OnInit, OnDestroy {
  richText = RichText;

  post$: Subscription | undefined;
  posts: Post[] = [];
  hasNextPage: boolean | undefined;

  constructor(
    private prismicService: PrismicService,
    private metaService: MetaService
  ) {}

  postTrackBy(_index: number, { id }: Post) {
    return id;
  }

  getPosts(onInit?: boolean) {
    this.post$ = this.prismicService
      .getPosts(onInit)
      .subscribe(({ results, next_page }) => {
        this.posts = this.posts.concat(results);
        this.hasNextPage = !!next_page;
      });
  }

  ngOnInit() {
    this.metaService.setMetaTags({ title: 'News', url: 'news' });

    this.getPosts(true);
  }

  ngOnDestroy() {
    if (this.post$) this.post$.unsubscribe();
  }
}
