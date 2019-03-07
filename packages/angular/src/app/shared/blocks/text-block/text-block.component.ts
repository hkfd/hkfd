import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { TextBlock } from 'api';

@Component({
  selector: 'text-block',
  templateUrl: './text-block.component.html',
  styleUrls: ['./text-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBlockComponent {
  @Input()
  data: TextBlock | undefined;
}
