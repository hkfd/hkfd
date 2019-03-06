import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Image } from 'generic';

@Component({
  selector: 'image-block',
  templateUrl: './image-block.component.html',
  styleUrls: ['./image-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageBlockComponent {
  @Input()
  data!: Image;
}
