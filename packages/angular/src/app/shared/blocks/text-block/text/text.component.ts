import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Sentence } from 'api';

@Component({
  selector: 'text',
  templateUrl: './text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent {
  @Input()
  text: Sentence | undefined;
}
