import { Component, Input } from '@angular/core';

import { ImageBlock } from '../../shared.module';

@Component({
  selector: 'image-block',
  templateUrl: './image-block.component.html',
  styleUrls: ['./image-block.component.scss']
})
export class ImageBlockComponent {
  @Input() data: ImageBlock;
}
