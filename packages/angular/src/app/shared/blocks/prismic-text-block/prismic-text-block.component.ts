import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RichText } from 'prismic-dom';

import { NewsPost, CareerPost, Text } from 'prismic';

@Component({
  selector: 'prismic-text-block',
  templateUrl: './prismic-text-block.component.html',
  styleUrls: [
    '../text-block/text-block.component.scss',
    './prismic-text-block.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrismicTextBlockComponent {
  richText = RichText;

  @Input()
  data: Text[] | undefined;

  linkResolver({ type, uid }: NewsPost | CareerPost): string {
    switch (type) {
      case 'news':
        return `/news/${uid}`;
      case 'career':
        return `/careers/${uid}`;
      default:
        return '/';
    }
  }
}
