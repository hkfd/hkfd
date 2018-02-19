import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { VideoBlock } from '../../shared.module';

@Component({
  selector: 'video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.scss']
})
export class VideoBlockComponent implements OnChanges {
  @Input() data: VideoBlock;
  url: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.data.currentValue || !changes.data.currentValue.id) return;

    const url = `https://www.youtube.com/embed/${
      this.data.id
    }?&origin=https://hkfd.co.uk`;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
