import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { RichText } from 'prismic-dom';

import { Post } from 'prismic';

@Component({
  selector: 'app-news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['./news-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPostComponent implements OnInit, OnDestroy {
  richText = RichText;

  post$!: Subscription;
  post: Post | undefined;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.post$ = this.route.data.subscribe(({ post }) => {
      this.post = post;
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.post$.unsubscribe();
  }
}
