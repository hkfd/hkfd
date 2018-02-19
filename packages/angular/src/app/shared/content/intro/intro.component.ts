import { Component, Input } from '@angular/core';

import { Content } from '../../shared.module';

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {
  @Input() content: Content;
}
