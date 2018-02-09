import {
  Component,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  Input
} from '@angular/core';

import { SliderAnimations } from './slider.animations';
import { Slider } from '../shared.module';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: SliderAnimations
})
export class SliderComponent implements OnChanges {
  private timer;
  private _images: Slider[];
  directionOffset: number = 1;
  currentIndex: number;

  @Input() autoplay: boolean = false;
  @Input() delay: number = 3000;

  @Input()
  set images(images: Slider[]) {
    this._images = images.map((image: Slider, index, { length }) => {
      image.prev = index === 0 ? length - 1 : index - 1;
      image.next = index === length - 1 ? 0 : index + 1;

      return image;
    });
  }
  get images(): Slider[] {
    return this._images;
  }

  changeImage(offset: number = 1) {
    this.directionOffset = offset;
    const direction = offset === 1 ? 'next' : 'prev';

    this.images[this.currentIndex].active = false;

    this.currentIndex = this.images[this.currentIndex][direction];
    this.images[this.currentIndex].active = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.images.currentValue) return;

    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min) + min);

    this.currentIndex = randomInt(0, this.images.length);
    this.images[this.currentIndex].active = true;

    if (this.autoplay)
      this.timer = setInterval(this.changeImage.bind(this), this.delay);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }
}
