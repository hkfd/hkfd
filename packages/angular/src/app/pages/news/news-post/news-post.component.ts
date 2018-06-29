import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RichText } from 'prismic-dom';

import {
  TitleService,
  LoggerService,
  Prismic
} from '../../../shared/shared.module';

@Component({
  selector: 'app-news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['./news-post.component.scss']
})
export class NewsPostComponent implements OnInit, OnDestroy {
  richText = RichText;

  post$: Subscription;
  post: Prismic.Post;

  constructor(
    private route: ActivatedRoute,
    private titleService: TitleService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.post$ = this.route.data
      .pipe(tap(post => this.logger.log('getPost', post)))
      .subscribe(({ post }: { post: Prismic.Post }) => {
        if (!post) return;

        this.post = post;
        this.titleService.setTitle(this.richText.asText(post.data.title));
      });
  }

  ngOnDestroy() {
    this.post$.unsubscribe();
  }
}
