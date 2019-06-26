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

import { ApiService, Post, PostType } from 'shared';
import { isCaseStudy } from 'shared/api.helpers';
import { CaseStudy } from 'api';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit, OnDestroy {
  post$: Subscription | undefined;
  private _post: Post | null | undefined;
  set post(post: Post | null | undefined) {
    this._post = post;
    if (post && isCaseStudy(post)) this.overview = post.overview;
  }
  get post() {
    return this._post;
  }
  overview: PickFlat<CaseStudy, 'overview'> | undefined;

  @HostBinding('class')
  layout: string | undefined;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const type = this.route.snapshot.paramMap.get('type');
    const id = this.route.snapshot.paramMap.get('id');
    if (!type || !id) throw new Error('No param');

    this.post$ = this.apiService
      .getPost(type as PostType, id)
      .subscribe(post => {
        this.post = post;
        this.changeDetectorRef.markForCheck();
      });

    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    this.layout = `layout-${randomInt(1, 3)}`;
  }

  ngOnDestroy() {
    this.post$ && this.post$.unsubscribe();
  }
}
