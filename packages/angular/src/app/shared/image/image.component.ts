import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  Input
} from '@angular/core';

import * as LazyLoad from 'vanilla-lazyload';

import { CloudinaryPipe } from '../pipes/cloudinary.pipe';
import { Image } from '../shared.module';

const Sizes = [
  { width: '800', height: '533' },
  { width: '1200', height: '800' },
  { width: '1800', height: '1200' },
  { width: '2400', height: '1600' }
];

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  providers: [CloudinaryPipe]
})
export class ImageComponent implements OnInit, OnChanges, OnDestroy {
  @Input() image: Image;
  private src: string;
  private srcset: string[];
  private lazy: any;

  constructor(private cloudinary: CloudinaryPipe) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.image.currentValue) return;

    this.src = this.cloudinary.transform(this.image.name, { width: '64' });
    this.srcset = Sizes.map(
      size =>
        this.cloudinary.transform(this.image.name, size) + ` ${size.width}w`
    );
  }

  ngOnInit() {
    if (!this.lazy) this.lazy = new LazyLoad();
    this.lazy.update();
  }

  ngOnDestroy() {
    if (this.lazy) this.lazy.destroy();
  }
}
