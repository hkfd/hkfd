import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Image } from 'generic';

@Component({
  selector: 'gallery-block',
  templateUrl: './gallery-block.component.html',
  styleUrls: ['./gallery-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryBlockComponent {
  @Input()
  data: Image[] | undefined;
}
