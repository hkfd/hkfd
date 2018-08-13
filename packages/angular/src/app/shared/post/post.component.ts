import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Api } from 'shared';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post$: Subscription;
  post: Api.Post;

  @HostBinding('class') layout: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.post$ = this.route.data.subscribe(
      ({ post }: { post: Api.Post }) => (this.post = post)
    );

    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    this.layout = `layout-${randomInt(1, 3)}`;
  }

  ngOnDestroy() {
    this.post$.unsubscribe();
  }
}
