import { Component, Input } from '@angular/core';

import { Sentence } from 'api';

@Component({
  selector: 'text',
  templateUrl: './text.component.html'
})
export class TextComponent {
  @Input()
  text!: Sentence;
}
