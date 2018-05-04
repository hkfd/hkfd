import { Component, Input } from '@angular/core';

import { Server } from '../../../shared.module';

@Component({
  selector: 'text',
  templateUrl: './text.component.html'
})
export class TextComponent {
  @Input() text: Server.Sentence;
}
