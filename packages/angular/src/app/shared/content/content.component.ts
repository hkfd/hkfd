import { Component, Input } from '@angular/core';

import { Content } from '../shared.module';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Input() content: Content;
}
