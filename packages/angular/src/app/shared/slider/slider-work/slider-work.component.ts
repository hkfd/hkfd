import { Component, Input, NgZone } from '@angular/core';

import { SliderComponent } from '../slider.component';
import { ApiPipe } from '../../pipes/api.pipe';
import { Api } from '../../shared.module';

@Component({
  selector: 'slider-work',
  templateUrl: './slider-work.component.html',
  styleUrls: ['../slider.component.scss', './slider-work.component.scss']
})
export class SliderWorkComponent extends SliderComponent {
  private _caseStudies: Api.CaseStudy[];

  constructor(zone: NgZone, private apiPipe: ApiPipe) {
    super(zone);
  }

  @Input()
  set caseStudies(caseStudies: Api.CaseStudy[]) {
    if (!caseStudies) return;

    this._caseStudies = caseStudies;
    this.images = caseStudies.map(
      caseStudy =>
        (caseStudy.thumbnail = this.apiPipe.transform(caseStudy.thumbnail))
    );

    this.sliderInit();
  }
  get caseStudies(): Api.CaseStudy[] {
    return this._caseStudies;
  }
}
