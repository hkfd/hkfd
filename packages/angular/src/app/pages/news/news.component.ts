import { Component, OnInit } from '@angular/core';

import { RichText } from 'prismic-dom';

import {
  PrismicService,
  TitleService,
  LoggerService,
  Prismic
} from '../../shared/shared.module';
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
  hasNextPage: boolean;

  constructor(
    private prismicService: PrismicService,
    private titleService: TitleService,
    private logger: LoggerService
  ) {}

  getPosts(onInit?: boolean) {
    this.prismicService.getPosts(onInit).then(({ results, next_page }) => {
      this.logger.log('getPosts', results);
      this.posts = this.posts.concat(results);
      this.hasNextPage = !!next_page;
    });
  }

  ngOnInit() {
    this.titleService.setTitle('News');

    this.getPosts(true);
  }
}
