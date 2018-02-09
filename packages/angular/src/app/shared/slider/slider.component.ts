import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

import { Slider } from '../shared.module';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnChanges {
  private _images: Slider[];
  currentIndex: number;

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

  changeImage(direction: string) {
    console.log('changeImage', `direction: ${direction}`);

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
  }
}
