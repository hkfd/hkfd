import { Component, Input } from '@angular/core';

import { Api } from '../../../shared.module';

@Component({
  selector: 'text',
  templateUrl: './text.component.html'
})
export class TextComponent {
  @Input() text: Api.Sentence;
}
