import {
  Directive,
  AfterViewInit,
  OnDestroy,
  Input,
  Renderer2,
  ElementRef
} from '@angular/core';

import { Lazy } from './shared.module';

@Directive({
  selector: '[lazy]'
})
export class LazyDirective implements AfterViewInit, OnDestroy {
  @Input('lazy') data: Lazy;
  private observer: IntersectionObserver;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  intersectionCallback([entry, ...rest]) {
    if (!entry.isIntersecting) return;

    this.renderer.setAttribute(
      this.el.nativeElement,
      this.data.attr,
      this.data.value.join()
    );

    this.observer.disconnect();
  }

  ngAfterViewInit() {
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
