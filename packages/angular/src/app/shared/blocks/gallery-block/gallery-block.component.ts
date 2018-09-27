import { Component, Input } from '@angular/core';

import { Generic } from 'shared';

@Component({
  selector: 'gallery-block',
  templateUrl: './gallery-block.component.html',
  styleUrls: ['./gallery-block.component.scss']
})
export class GalleryBlockComponent {
  @Input()
  data: Generic.Image[];
}
