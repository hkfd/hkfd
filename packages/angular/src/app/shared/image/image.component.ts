import { Component, Input } from '@angular/core';

import { Image } from 'generic';
import { createPlaceholderImg, createFullImg } from './image.helpers';

export interface PlaceholderImg {
  state: 'loading-placeholder';
  src: string;
  alt: string | null;
}

export type FullImg = Omit<PlaceholderImg, 'state'> & {
  state: 'loading-full' | 'loaded';
  srcset: string;
};

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

  img: PlaceholderImg | FullImg | undefined;
  isVisible = false;
  hasLoadedPlaceholderImage = false;
  hasLoadedFullImage = false;

  handleImgLoad() {
    if (!this.img) throw new Error('No `img`');

    switch (this.img.state) {
      case 'loading-placeholder':
        this.hasLoadedPlaceholderImage = true;
        return this.displayImage();
      case 'loading-full':
        this.hasLoadedFullImage = true;
        return this.displayImage();
    }
  }

  handleImgVisible() {
    this.isVisible = true;
    this.displayImage();
  }

  displayPlaceHolderImage() {
    if (!this.image) throw new Error('No `image`');
    if (!this.isVisible || !this.hasLoadedPlaceholderImage) return;

    this.img = createFullImg(this.image);
  }

  displayFullImage() {
    if (!this.img) throw new Error('No `img`');
    if (!this.hasLoadedFullImage) return;

    this.img.state = 'loaded';
  }

  displayImage() {
    if (!this.img) throw new Error('No `img`');

    switch (this.img.state) {
      case 'loading-placeholder':
        return this.displayPlaceHolderImage();
      case 'loading-full':
        return this.displayFullImage();
    }
  }
}
