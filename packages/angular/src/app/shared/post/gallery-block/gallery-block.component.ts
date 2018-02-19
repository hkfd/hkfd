import { Component, Input } from '@angular/core';

import { GalleryBlock } from '../../shared.module';

@Component({
  selector: 'gallery-block',
  templateUrl: './gallery-block.component.html',
  styleUrls: ['./gallery-block.component.scss']
})
export class GalleryBlockComponent {
  @Input() data: GalleryBlock;
}
