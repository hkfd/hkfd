import { Component, OnInit } from '@angular/core';

import { RichText } from 'prismic-dom';

import { MetaService, PrismicService, Prismic } from 'shared';
import { NewsAnimations } from './news.animations';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations: NewsAnimations
})
export class NewsComponent implements OnInit {
  richText = RichText;

  posts: Prismic.Post[] = [];
  hasNextPage: boolean | undefined;

  constructor(
    private prismicService: PrismicService,
    private metaService: MetaService
  ) {}

  getPosts(onInit?: boolean) {
    this.prismicService.getPosts(onInit).subscribe(({ results, next_page }) => {
      this.posts = this.posts.concat(results);
      this.hasNextPage = !!next_page;
    });
  }

  ngOnInit() {
    this.metaService.setMetaTags({ title: 'News', url: 'news' });

    this.getPosts(true);
  }
}
