import { Component, Input } from '@angular/core';

import { TextBlock } from 'api';

@Component({
  selector: 'text-block',
  templateUrl: './text-block.component.html',
  styleUrls: ['./text-block.component.scss']
})
export class TextBlockComponent {
  @Input()
  data!: TextBlock;
}
