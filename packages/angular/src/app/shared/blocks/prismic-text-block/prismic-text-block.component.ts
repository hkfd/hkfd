import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Text } from 'prismic';

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
  @Input() data: Text[] | undefined;
}
