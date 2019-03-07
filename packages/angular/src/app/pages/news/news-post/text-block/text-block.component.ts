import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RichText } from 'prismic-dom';

import { Post, Text } from 'prismic';

@Component({
  selector: 'prismic-text-block',
  templateUrl: './text-block.component.html',
  styleUrls: [
    '../../../../shared/blocks/text-block/text-block.component.scss',
    './text-block.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBlockComponent {
  richText = RichText;

  @Input()
  data: Text[] | undefined;

  linkResolver({ type, uid }: Post) {
    if (type === 'news') return `/news/${uid}`;

    return '/';
  }
}
