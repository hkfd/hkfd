import { Component, Input } from '@angular/core';

import { Api } from 'shared';

@Component({
  selector: 'text-block',
  templateUrl: './text-block.component.html',
  styleUrls: ['./text-block.component.scss']
})
export class TextBlockComponent {
  @Input() data: Api.Blocks.TextBlock;
}
