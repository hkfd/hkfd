import { Component, Input } from '@angular/core';

import { Sentence } from '../../../shared.module';

@Component({
  selector: 'text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  @Input() text: Sentence;
}
