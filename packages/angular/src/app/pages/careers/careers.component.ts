import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { PrismicService } from 'shared';
import { PostsResponse, CareerPost } from 'prismic';
import { CareersImages } from './careers.images';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareersComponent implements OnInit {
  careers$: Observable<PostsResponse<CareerPost>> | undefined;
  images = CareersImages;

  constructor(private prismicService: PrismicService) {}

  careerTrackBy(_index: number, { id }: CareerPost) {
    return id;
  }

  ngOnInit() {
    this.careers$ = this.prismicService.getPosts('career');
  }
}
