import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Audio } from 'generic';

@Component({
  selector: 'audio-block',
  templateUrl: './audio-block.component.html',
  styleUrls: ['./audio-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioBlockComponent {
  @Input()
  data!: Audio;
}
