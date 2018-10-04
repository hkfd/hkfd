import { Component, Input } from '@angular/core';

import { Generic } from 'shared';

@Component({
  selector: 'image-block',
  templateUrl: './image-block.component.html',
  styleUrls: ['./image-block.component.scss']
})
export class ImageBlockComponent {
  @Input()
  data!: Generic.Image;
}
