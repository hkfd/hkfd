import { Component, OnInit, OnDestroy } from '@angular/core';

import * as LazyLoad from 'vanilla-lazyload';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit, OnDestroy {
  lazy: any;

  ngOnInit() {
    if (!this.lazy) this.lazy = new LazyLoad();
    this.lazy.update();
  }

  ngOnDestroy() {
    if (this.lazy) this.lazy.destroy();
  }
}
