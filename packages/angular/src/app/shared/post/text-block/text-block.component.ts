import { Component, Input } from '@angular/core';

import { Server } from '../../shared.module';

@Component({
  selector: 'text-block',
  templateUrl: './text-block.component.html',
  styleUrls: ['./text-block.component.scss']
})
export class TextBlockComponent {
  @Input() data: Server.Blocks.TextBlock;
}
