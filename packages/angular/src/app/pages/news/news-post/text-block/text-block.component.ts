import { Component, Input } from '@angular/core';

import { RichText } from 'prismic-dom';

import { Prismic } from '../../../../shared/shared.module';

@Component({
  selector: 'prismic-text-block',
  templateUrl: './text-block.component.html',
  styleUrls: [
    '../../../../shared/post/text-block/text-block.component.scss',
    './text-block.component.scss'
  ]
})
export class TextBlockComponent {
  richText = RichText;

  @Input() data: Prismic.Text[];

  linkResolver(post: Prismic.Post) {
    if (post.type === 'news') return `/news/${post.uid}`;

    return '/';
  }
}
