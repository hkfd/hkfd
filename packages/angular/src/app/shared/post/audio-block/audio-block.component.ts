import { Component, Input } from '@angular/core';

import { AudioBlock } from '../../shared.module';

@Component({
  selector: 'audio-block',
  templateUrl: './audio-block.component.html',
  styleUrls: ['./audio-block.component.scss']
})
export class AudioBlockComponent {
  @Input() data: AudioBlock;
}
