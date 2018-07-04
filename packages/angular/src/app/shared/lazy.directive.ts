import {
  Directive,
  AfterViewInit,
  OnDestroy,
  Input,
  Renderer2,
  ElementRef,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { Generic } from './generic';

@Directive({
  selector: '[lazy]'
})
export class LazyDirective implements AfterViewInit, OnDestroy {
  @Input('lazy') data: Generic.Lazy;
  private observer: IntersectionObserver;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  intersectionCallback([entry, ...rest]: [IntersectionObserverEntry, any[]]) {
    if (!entry.isIntersecting) return;

    this.data.loaded = true;
    if (this.observer) this.observer.disconnect();

    if (!this.data.attr || !this.data.val) return;

    this.renderer.setAttribute(
      this.el.nativeElement,
      this.data.attr,
      this.data.val.join()
    );
  }

  ngAfterViewInit() {
    if (isPlatformServer(this.platformId)) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    };
    this.observer = new IntersectionObserver(
      this.intersectionCallback.bind(this),
      options
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }
}
