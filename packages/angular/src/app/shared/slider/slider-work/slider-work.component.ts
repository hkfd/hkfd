import { Component, Input, NgZone, Inject, PLATFORM_ID } from '@angular/core';

import { SliderComponent } from '../slider.component';
import { ApiPipe, Api } from 'shared';

@Component({
  selector: 'slider-work',
  templateUrl: './slider-work.component.html',
  styleUrls: ['../slider.component.scss', './slider-work.component.scss']
})
export class SliderWorkComponent extends SliderComponent {
  private _caseStudies!: Api.CaseStudy[];

  constructor(
    zone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object,
    private apiPipe: ApiPipe
  ) {
    super(zone, platformId);
  }

  @Input()
  set caseStudies(caseStudies: Api.CaseStudy[]) {
    if (!caseStudies) return;

    this._caseStudies = caseStudies.map(caseStudy => ({
      ...caseStudy,
      thumbnail: this.apiPipe.transform(caseStudy.thumbnail)
    }));
    this.images = caseStudies.map(({ thumbnail }) => thumbnail as any);

    this.sliderInit();
  }
  get caseStudies() {
    return this._caseStudies;
  }
}
