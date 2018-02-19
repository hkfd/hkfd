import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import {
  TitleService,
  ApiService,
  CaseStudy,
  Service
} from '../../shared/shared.module';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post$: Subscription;
  post: CaseStudy | Service;

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
      .subscribe((post: CaseStudy | Service) => {
        this.post = post;
        this.titleService.setTitle(post.title);
      });
  }

  ngOnDestroy() {
    this.post$.unsubscribe();
  }
}
