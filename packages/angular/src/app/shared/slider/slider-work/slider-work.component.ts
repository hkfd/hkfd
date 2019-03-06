import {
  Component,
  Input,
  NgZone,
  Inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { SliderComponent } from '../slider.component';
import { ApiPipe } from 'shared';
import { CaseStudy } from 'api';

@Component({
  selector: 'slider-work',
  templateUrl: './slider-work.component.html',
  styleUrls: ['../slider.component.scss', './slider-work.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderWorkComponent extends SliderComponent {
  private _caseStudies!: CaseStudy[];

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    zone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object,
    private apiPipe: ApiPipe
  ) {
    super(changeDetectorRef, zone, platformId);
  }

  @Input()
  set caseStudies(caseStudies: CaseStudy[]) {
    if (!caseStudies) return;

    this._caseStudies = caseStudies.map(caseStudy => ({
      ...caseStudy,
      thumbnail: this.apiPipe.transform(caseStudy.thumbnail) as any
    }));
    this.slidesCount = caseStudies.length;

    this.sliderInit();
  }
  get caseStudies() {
    return this._caseStudies;
  }
}
