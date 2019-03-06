import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Video } from 'generic';

@Component({
  selector: 'video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoBlockComponent {
  @Input()
  data!: Video;
  videoSrc: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  setVideoSrc(src: string) {
    this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(src);
  }

  handleVisible() {
    this.setVideoSrc(this.data.src);
  }
}
