import {
  Component,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  Input,
  HostListener,
  NgZone
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

  @Input() random: boolean = false;
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

  constructor(private zone: NgZone) {}

  changeImage(offset: number = 1) {
    const index = this.currentIndex + offset;

    if (index < 0) return (this.currentIndex = this.images.length - 1);
    if (index >= this.images.length) return (this.currentIndex = 0);

    this.currentIndex = index;
  }

  startTimer() {
    if (this.autoplay)
      this.zone.runOutsideAngular(
        _ =>
          (this.timer = window.setInterval(
            _ => this.zone.run(this.changeImage.bind(this)),
            this.delay
          ))
      );
  }

  endTimer() {
    this.zone.runOutsideAngular(_ => window.clearInterval(this.timer));
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
