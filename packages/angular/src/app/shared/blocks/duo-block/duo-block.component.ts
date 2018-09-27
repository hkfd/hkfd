import { Component, Input } from '@angular/core';

import { Generic } from 'shared';

@Component({
  selector: 'duo-block',
  templateUrl: './duo-block.component.html',
  styleUrls: ['./duo-block.component.scss']
})
export class DuoBlockComponent {
  @Input()
  data: Generic.Image[];
}
