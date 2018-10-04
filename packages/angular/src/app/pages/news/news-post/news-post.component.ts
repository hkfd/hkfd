import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { RichText } from 'prismic-dom';

import { Prismic } from 'shared';

@Component({
  selector: 'app-news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['./news-post.component.scss']
})
export class NewsPostComponent implements OnInit, OnDestroy {
  richText = RichText;

  post$!: Subscription;
  post: Prismic.Post | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.post$ = this.route.data.subscribe(({ post }) => (this.post = post));
  }

  ngOnDestroy() {
    this.post$.unsubscribe();
  }
}
