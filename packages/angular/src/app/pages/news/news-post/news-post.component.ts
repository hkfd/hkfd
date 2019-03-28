import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RichText } from 'prismic-dom';

import { PrismicService } from 'shared';
import { Post } from 'prismic';

@Component({
  selector: 'app-news-post',
  templateUrl: './news-post.component.html',
  styleUrls: ['./news-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsPostComponent implements OnInit {
  richText = RichText;

  post$: Observable<Post | null> | undefined;
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private prismicService: PrismicService
  ) {}

  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.prismicService.getPost(params.get('uid') || '')
      )
    );
  }
}
