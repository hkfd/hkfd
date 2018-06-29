import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TitleService, ApiService, Api } from '../../shared/shared.module';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post$: Subscription;
  post: Api.Post;

  @HostBinding('class') layout: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: TitleService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.post$ = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.apiService.getPost(params.get('type'), params.get('id'))
        )
      )
      .subscribe((post: Api.Post) => {
        if (!post) return this.router.navigateByUrl('/');

        this.post = post;
        this.titleService.setTitle(post.title);
      });

    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    this.layout = `layout-${randomInt(1, 3)}`;
  }

  ngOnDestroy() {
    this.post$.unsubscribe();
  }
}
