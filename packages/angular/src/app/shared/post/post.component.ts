import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { TitleService, ApiService, Post } from '../../shared/shared.module';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post$: Subscription;
  post: Post;

  @HostBinding('class') layout: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: TitleService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.post$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.apiService.getPost(params.get('type'), params.get('id'))
      )
      .subscribe((post: Post) => {
        this.post = post;
        this.titleService.setTitle(post.title);
      });

    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min) + min);

    this.layout = `layout-${randomInt(1, 3)}`;
  }

  ngOnDestroy() {
    this.post$.unsubscribe();
  }
}
