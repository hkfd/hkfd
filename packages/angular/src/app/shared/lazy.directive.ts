import {
  Directive,
  AfterViewInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  Renderer2,
  ElementRef
} from '@angular/core';

import { Lazy } from './images';

@Directive({
  selector: '[lazy]'
})
export class LazyDirective implements AfterViewInit, OnDestroy {
  @Input('lazy') data: Lazy;
  @Output() loaded: EventEmitter<boolean> = new EventEmitter();
  private observer: IntersectionObserver;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  intersectionCallback([entry, ...rest]: [IntersectionObserverEntry, any[]]) {
    if (!entry.isIntersecting) return;

    this.loaded.emit(true);
    this.observer.disconnect();

    if (!this.data || !this.data.attr || !this.data.value) return;

    this.renderer.setAttribute(
      this.el.nativeElement,
      this.data.attr,
      this.data.value.join()
    );
  }

  ngAfterViewInit() {
    if (!this.el || !this.el.nativeElement) return;

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
