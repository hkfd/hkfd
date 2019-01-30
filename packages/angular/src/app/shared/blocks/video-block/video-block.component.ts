import { Component, Input } from '@angular/core';

import { Video } from 'generic';

@Component({
  selector: 'video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.scss']
})
export class VideoBlockComponent {
  @Input()
  data!: Video;
}
