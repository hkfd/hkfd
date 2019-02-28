import {
  Directive,
  AfterViewInit,
  OnDestroy,
  Output,
  ElementRef,
  Inject,
  EventEmitter,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Directive({
  selector: '[lazy]'
})
export class LazyDirective implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | undefined;
  @Output() isVisible = new EventEmitter<true>();

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  disconnectObserver() {
    if (this.observer) this.observer.disconnect();
  }

  intersectionCallback([{ isIntersecting }]: [IntersectionObserverEntry]) {
    if (!isIntersecting) return;

    this.isVisible.emit(true);
    this.disconnectObserver();
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
    this.disconnectObserver();
  }
}
