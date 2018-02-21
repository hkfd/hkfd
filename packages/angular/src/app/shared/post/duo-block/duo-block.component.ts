import { Component, Input } from '@angular/core';

import { DuoBlock } from '../../shared.module';

@Component({
  selector: 'duo-block',
  templateUrl: './duo-block.component.html',
  styleUrls: ['./duo-block.component.scss']
})
export class DuoBlockComponent {
  @Input() data: DuoBlock;
}
