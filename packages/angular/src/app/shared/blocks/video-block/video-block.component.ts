import { Component, Input } from '@angular/core';

import { Generic } from 'shared';

@Component({
  selector: 'video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.scss']
})
export class VideoBlockComponent {
  @Input()
  data!: Generic.Video;
}
