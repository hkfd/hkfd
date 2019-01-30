import { Component, Input } from '@angular/core';

import { Audio } from 'generic';

@Component({
  selector: 'audio-block',
  templateUrl: './audio-block.component.html',
  styleUrls: ['./audio-block.component.scss']
})
export class AudioBlockComponent {
  @Input()
  data!: Audio;
}
