import { Component, Input } from '@angular/core';

import { Generic } from '../shared.module';

@Component({
  selector: 'image-component',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() image: Generic.Image;
}
