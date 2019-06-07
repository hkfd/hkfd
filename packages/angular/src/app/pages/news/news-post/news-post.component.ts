import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';
import { RichText } from 'prismic-dom';

import { PrismicService } from 'shared';
import { NewsPost } from 'prismic';

@Component({
  selector: 'app-news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['./news-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPostComponent implements OnInit, OnDestroy {
  richText = RichText;

  postSub: Subscription | undefined;
  post: NewsPost | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private prismicService: PrismicService
  ) {}

  ngOnInit() {
    this.postSub = this.route.paramMap
      .pipe(
        map((params: ParamMap) => params.get('uid')),
        filter((uid): uid is string => Boolean(uid)),
        switchMap(uid => this.prismicService.getPost('news', uid))
      )
      .subscribe(post => {
        this.post = post;
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy() {
    this.postSub && this.postSub.unsubscribe();
  }
}
