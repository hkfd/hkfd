import {
  Component,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  Input,
  HostListener
} from '@angular/core';

import { Image } from '../shared.module';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnChanges {
  private timer: number;
  currentIndex: number = 0;

  @Input() autoplay: boolean = false;
  @Input() delay: number = 2000;
  @Input() images: Image[];

  @HostListener('mouseenter')
  mouseEnter() {
    this.endTimer();
  }
  @HostListener('mouseleave')
  mouseLeave() {
    if (this.images) this.startTimer();
  }

  changeImage(offset: number = 1) {
    const index = this.currentIndex + offset;

    if (index < 0) return (this.currentIndex = this.images.length - 1);
    if (index >= this.images.length) return (this.currentIndex = 0);

    this.currentIndex = index;
  }

  startTimer() {
    if (this.autoplay)
      this.timer = setInterval(this.changeImage.bind(this), this.delay);
  }

  endTimer() {
    clearInterval(this.timer);
  }

  sliderInit() {
    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min) + min);

    this.currentIndex = randomInt(0, this.images.length);
    this.startTimer();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.images && changes.images.currentValue) this.sliderInit();
  }

  ngOnDestroy() {
    this.endTimer();
  }
}
