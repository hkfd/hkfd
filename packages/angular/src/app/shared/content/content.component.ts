import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { Content } from '../shared.module';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Input() content: Content;
  @HostBinding('class') layout: string;

  ngOnInit() {
    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min) + min);

    this.layout = `layout-${randomInt(1, 3)}`;
  }
}
