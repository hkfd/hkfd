import { Component, Input } from '@angular/core';

import {
  Sentence as ApiSentence,
  CaseStudy as ApiCaseStudy,
  TextBlock as ApiTextBlock
} from 'api';
import { Text as PrismicText } from 'prismic';
import {
  Image as GenericImage,
  Video as GenericVideo,
  Audio as GenericAudio
} from 'generic';

@Component({
  selector: 'image-component',
  template: ''
})
export class StubImageComponent {
  @Input()
  image!: GenericImage;
}

@Component({
  selector: 'text',
  template: ''
})
export class StubTextComponent {
  @Input()
  text!: ApiSentence;
}

@Component({
  selector: 'prismic-text-block',
  template: ''
})
export class StubPrismicTextBlockComponent {
  @Input()
  data!: PrismicText[];
}

@Component({
  selector: 'image-block',
  template: ''
})
export class StubImageBlockComponent {
  @Input()
  data!: GenericImage;
}

@Component({
  selector: 'duo-block',
  template: ''
})
export class StubDuoBlockComponent {
  @Input()
  data!: GenericImage[];
}

@Component({
  selector: 'gallery-block',
  template: ''
})
export class StubGalleryBlockComponent {
  @Input()
  data!: GenericImage[];
}

@Component({
  selector: 'video-block',
  template: ''
})
export class StubVideoBlockComponent {
  @Input()
  data!: GenericVideo;
}

@Component({
  selector: 'audio-block',
  template: ''
})
export class StubAudioBlockComponent {
  @Input()
  data!: GenericAudio;
}

@Component({
  selector: 'slider',
  template: ''
})
export class StubSliderComponent {
  @Input()
  random = false;
  @Input()
  autoplay = false;
  @Input()
  delay = 2000;
  @Input()
  images!: GenericImage[];
}

@Component({
  selector: 'slider-work',
  template: ''
})
export class StubSliderWorkComponent extends StubSliderComponent {
  @Input()
  caseStudies!: ApiCaseStudy[];
}

@Component({
  selector: 'app-form',
  template: ''
})
export class StubFormComponent {}

@Component({
  selector: 'text-block',
  template: ''
})
export class StubTextBlockComponent {
  @Input()
  data!: ApiTextBlock;
}
