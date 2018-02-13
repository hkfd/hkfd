import { Component, Input } from '@angular/core';

import { SliderComponent } from '../slider.component';
import { SliderAnimations } from '../slider.animations';
import { CaseStudy } from '../../shared.module';

@Component({
  selector: 'slider-work',
  templateUrl: './slider-work.component.html',
  styleUrls: ['../slider.component.scss', './slider-work.component.scss'],
  animations: SliderAnimations
})
export class SliderWorkComponent extends SliderComponent {
  private _caseStudies: CaseStudy[];

  @Input()
  set caseStudies(caseStudies: CaseStudy[]) {
    if (!caseStudies) return;

    this.images = caseStudies.map(
      (caseStudy: CaseStudy) => caseStudy.thumbnail
    );
    this.sliderInit();
  }
  get caseStudies(): CaseStudy[] {
    return this._caseStudies;
  }
}
