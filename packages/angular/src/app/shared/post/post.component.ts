import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Post } from 'shared';
import { isCaseStudy } from 'shared/api.helpers';
import { CaseStudy } from 'api';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit, OnDestroy {
  post$!: Subscription;
  private _post: Post | undefined;
  set post(post: Post | undefined) {
    if (!post) return;

    this._post = post;
    if (isCaseStudy(post)) this.overview = post.overview;
  }
  get post() {
    return this._post;
  }
  overview: PickFlat<CaseStudy, 'overview'> | undefined;

  @HostBinding('class')
  layout!: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.post$ = this.route.data.subscribe(({ post }) => {
      this.post = post;
      this.changeDetectorRef.markForCheck();
    });

    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    this.layout = `layout-${randomInt(1, 3)}`;
  }

  ngOnDestroy() {
    this.post$.unsubscribe();
  }
}
