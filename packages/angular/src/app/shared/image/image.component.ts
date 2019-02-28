import { Component, Input } from '@angular/core';

import { Image } from 'generic';
import { createPlaceholderImg } from './image.helpers';

@Component({
  selector: 'image-component',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  private _image: Image | undefined;
  @Input()
  set image(image: Image | undefined) {
    if (!image) return;

    this._image = image;
    this.img = createPlaceholderImg(image);
  }
  get image() {
    return this._image;
  }

  img: Partial<Image> | undefined;

  handleVisible() {
    this.img = this.image;
  }
}
