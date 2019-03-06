import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Image } from 'generic';

@Component({
  selector: 'duo-block',
  templateUrl: './duo-block.component.html',
  styleUrls: ['./duo-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DuoBlockComponent {
  @Input()
  data!: Image[];
}
