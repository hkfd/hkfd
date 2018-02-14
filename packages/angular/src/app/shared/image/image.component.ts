import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
  Input,
  ViewChild,
  Renderer2,
  ElementRef
} from '@angular/core';

import { CloudinaryPipe } from '../pipes/cloudinary.pipe';
import { Image } from '../shared.module';

const Sizes = [
  { width: 800, height: 533 },
  { width: 1200, height: 800 },
  { width: 1800, height: 1200 },
  { width: 2400, height: 1600 }
];

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  providers: [CloudinaryPipe]
})
export class ImageComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() image: Image;
  @ViewChild('img') img: ElementRef;
  private observer: IntersectionObserver;
  src: string;
  srcset: string[];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cloudinary: CloudinaryPipe
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.image.currentValue) return;

    this.src = this.cloudinary.transform(this.image.name, { width: '64' });
    this.srcset = Sizes.map(
      size =>
        this.cloudinary.transform(this.image.name, size) +
        ` ${size.width - 400}w`
    );
  }

  intersectionCallback([entry, ...rest]) {
    if (!entry.isIntersecting) return;

    this.image.loaded = true;
    this.renderer.setAttribute(
      this.img.nativeElement,
      'srcset',
      this.srcset.join()
    );
    this.renderer.removeAttribute(this.img.nativeElement, 'data-srcset');

    this.observer.disconnect();
  }

  ngAfterViewInit() {
    if (this.img && this.img.nativeElement)
      this.observer.observe(this.img.nativeElement);
  }

  ngOnInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    };
    this.observer = new IntersectionObserver(
      this.intersectionCallback.bind(this),
      options
    );
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }
}
