import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription, of } from 'rxjs';
import { switchMap, map, filter } from 'rxjs/operators';

import { ApiService, Post } from 'shared';
import { isCaseStudy, isKnownPostType } from 'shared/api.helpers';
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
    this.post$ = this.route.paramMap
      .pipe(
        map((params: ParamMap) => ({
          type: params.get('type'),
          id: params.get('id')
        })),
        filter(
          (res): res is { type: string; id: string } =>
            res.type !== null && res.id !== null
        ),
        switchMap(({ type, id }) => {
          if (!isKnownPostType(type)) return of(null);

          return this.apiService.getPost(type, id);
        })
      )
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
