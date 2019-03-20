import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Subscription } from 'rxjs';
import { RichText } from 'prismic-dom';

import { MetaService, PrismicService, NotificationService } from 'shared';
import { Post } from 'prismic';
import { NewsAnimations } from './news.animations';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations: NewsAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent implements OnInit, OnDestroy {
  richText = RichText;

  post$: Subscription | undefined;
  posts: Post[] = [];
  hasNextPage: boolean | undefined;

  notificationSub: Subscription | undefined;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private prismicService: PrismicService,
    private metaService: MetaService,
    private notificationService: NotificationService
  ) {}

  postTrackBy(_index: number, { id }: Post) {
    return id;
  }

  getPosts(onInit?: boolean) {
    this.post$ = this.prismicService.getPosts(onInit).subscribe(
      ({ results, next_page }) => {
        this.posts = this.posts.concat(results);
        this.hasNextPage = !!next_page;
        this.changeDetectorRef.markForCheck();
      },
      _ =>
        (this.notificationSub = this.notificationService
          .displayMessage(`Couldn't load more posts`, { action: 'Retry' })
          .subscribe(this.getPosts.bind(this)))
    );
  }

  ngOnInit() {
    this.metaService.setMetaTags({ title: 'News', url: 'news' });

    this.getPosts(true);
  }

  ngOnDestroy() {
    if (this.post$) this.post$.unsubscribe();
    this.notificationSub && this.notificationSub.unsubscribe();
  }
}
