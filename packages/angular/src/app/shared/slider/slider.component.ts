import {
  Component,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  Input,
  HostListener,
  NgZone,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { Image } from 'generic';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnChanges, OnDestroy {
  private timer: number | undefined;
  currentIndex = 0;

  @Input()
  random = false;
  @Input()
  autoplay = false;
  @Input()
  delay = 2000;
  @Input()
  images!: Image[];

  @HostListener('mouseenter')
  mouseEnter() {
    this.endTimer();
  }
  @HostListener('mouseleave')
  mouseLeave() {
    if (this.images) this.startTimer();
  }

  constructor(
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  changeImage(offset = 1) {
    const index = this.currentIndex + offset;

    if (index < 0) return (this.currentIndex = this.images.length - 1);
    if (index >= this.images.length) return (this.currentIndex = 0);

    return (this.currentIndex = index);
  }

  intervalChangeImage() {
    this.zone.run(this.changeImage.bind(this));
  }

  setInterval() {
    this.timer = window.setInterval(
      this.intervalChangeImage.bind(this),
      this.delay
    );
  }

  startTimer() {
    if (!this.autoplay || isPlatformServer(this.platformId)) return;

    this.zone.runOutsideAngular(this.setInterval.bind(this));
  }

  clearInterval() {
    window.clearInterval(this.timer);
  }

  endTimer() {
    if (isPlatformServer(this.platformId)) return;

    this.zone.runOutsideAngular(this.clearInterval.bind(this));
  }

  sliderInit() {
    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min) + min);

    if (this.random) this.currentIndex = randomInt(0, this.images.length);
    this.startTimer();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.images && changes.images.currentValue) this.sliderInit();
  }

  ngOnDestroy() {
    this.endTimer();
  }
}
