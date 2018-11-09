import { Component, Input } from '@angular/core';

import { Api, Prismic, Generic } from 'shared';

@Component({
  selector: 'image-component',
  template: ''
})
export class StubImageComponent {
  @Input()
  image!: Generic.Image;
}

@Component({
  selector: 'text',
  template: ''
})
export class StubTextComponent {
  @Input()
  text!: Api.Sentence;
}

@Component({
  selector: 'prismic-text-block',
  template: ''
})
export class StubPrismicTextBlockComponent {
  @Input()
  data!: Prismic.Text[];
}

@Component({
  selector: 'image-block',
  template: ''
})
export class StubImageBlockComponent {
  @Input()
  data!: Generic.Image;
}

@Component({
  selector: 'duo-block',
  template: ''
})
export class StubDuoBlockComponent {
  @Input()
  data!: Generic.Image[];
}

@Component({
  selector: 'gallery-block',
  template: ''
})
export class StubGalleryBlockComponent {
  @Input()
  data!: Generic.Image[];
}

@Component({
  selector: 'video-block',
  template: ''
})
export class StubVideoBlockComponent {
  @Input()
  data!: Generic.Video;
}

@Component({
  selector: 'audio-block',
  template: ''
})
export class StubAudioBlockComponent {
  @Input()
  data!: Generic.Audio;
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
  images!: Generic.Image[];
}

@Component({
  selector: 'slider-work',
  template: ''
})
export class StubSliderWorkComponent extends StubSliderComponent {
  @Input()
  caseStudies!: Api.CaseStudy[];
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
  data!: Api.Blocks.TextBlock;
}
