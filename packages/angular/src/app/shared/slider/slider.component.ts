import {
  Component,
  OnDestroy,
  Input,
  HostListener,
  NgZone,
  Inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { Image } from 'generic';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnDestroy {
  private timer: number | undefined;
  private _images!: Image[];
  slidesCount: number | undefined;
  currentIndex = 0;

  @Input()
  random = false;
  @Input()
  autoplay = false;
  @Input()
  delay = 2000;
  @Input()
  set images(images: Image[] | undefined) {
    if (!images) return;

    this._images = images;
    this.slidesCount = images.length;
    this.sliderInit();
  }
  get images(): Image[] | undefined {
    return this._images;
  }

  @HostListener('mouseenter')
  mouseEnter() {
    this.endTimer();
  }
  @HostListener('mouseleave')
  mouseLeave() {
    if (this.images) this.startTimer();
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  changeImage(offset = 1) {
    if (!this.slidesCount) throw new Error('No `slidesCount`');

    this.changeDetectorRef.markForCheck();
    const index = this.currentIndex + offset;

    if (index < 0) return (this.currentIndex = this.slidesCount - 1);
    if (index >= this.slidesCount) return (this.currentIndex = 0);

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
    if (!this.slidesCount) throw new Error('No `slidesCount`');

    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min) + min);

    if (this.random) this.currentIndex = randomInt(0, this.slidesCount);
    this.startTimer();
  }

  ngOnDestroy() {
    this.endTimer();
  }
}
