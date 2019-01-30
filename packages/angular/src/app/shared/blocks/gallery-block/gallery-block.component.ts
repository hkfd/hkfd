import { Component, Input } from '@angular/core';

import { Image } from 'generic';

@Component({
  selector: 'gallery-block',
  templateUrl: './gallery-block.component.html',
  styleUrls: ['./gallery-block.component.scss']
})
export class GalleryBlockComponent {
  @Input()
  data!: Image[];
}
