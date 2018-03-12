import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

import { CloudinaryPipe } from '../pipes/cloudinary.pipe';
import { Image, Lazy } from '../shared.module';

const Sizes = [
  { width: 550, height: 300 },
  { width: 800, height: 533 },
  { width: 1200, height: 800 },
  { width: 1800, height: 1200 },
  { width: 2400, height: 1600 }
];

@Component({
  selector: 'image-component',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  providers: [CloudinaryPipe]
})
export class ImageComponent implements OnChanges {
  @Input() image: Image;
  src: string;
  srcset: Lazy;

  constructor(private cloudinary: CloudinaryPipe) {}

  imageLoaded() {
    if (this.image) this.image.loaded = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.image.currentValue) return;

    this.src = this.cloudinary.transform(this.image.name, { width: 64 });
    this.srcset = {
      attr: 'srcset',
      value: Sizes.map(
        size =>
          this.cloudinary.transform(this.image.name, size) +
          ` ${size.width - 400}w`
      )
    };
  }
}
