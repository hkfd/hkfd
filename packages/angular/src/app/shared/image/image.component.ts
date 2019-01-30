import { Component, Input } from '@angular/core';

import { Image } from 'generic';

@Component({
  selector: 'image-component',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input()
  image!: Image;
}
