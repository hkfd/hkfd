import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { RichText } from 'prismic-dom';

import { MetaService, PrismicService } from 'shared';
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
  richText = RichText;
  images = CareersImages;

  constructor(
    private metaService: MetaService,
    private prismicService: PrismicService
  ) {}

  careerTrackBy(_index: number, { id }: CareerPost) {
    return id;
  }

  ngOnInit() {
    this.metaService.setMetaTags({ title: 'Careers', url: 'careers' });

    this.careers$ = this.prismicService.getPosts('career');
  }
}
