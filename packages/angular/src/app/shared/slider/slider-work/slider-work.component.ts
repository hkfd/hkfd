import { Component, Input, NgZone } from '@angular/core';

import { SliderComponent } from '../slider.component';
import { ServerPipe } from '../../pipes/server.pipe';
import { Server } from '../../shared.module';

@Component({
  selector: 'slider-work',
  templateUrl: './slider-work.component.html',
  styleUrls: ['../slider.component.scss', './slider-work.component.scss']
})
export class SliderWorkComponent extends SliderComponent {
  private _caseStudies: Server.CaseStudy[];

  constructor(zone: NgZone, private serverPipe: ServerPipe) {
    super(zone);
  }

  @Input()
  set caseStudies(caseStudies: Server.CaseStudy[]) {
    if (!caseStudies) return;

    this._caseStudies = caseStudies;
    this.images = caseStudies.map(
      caseStudy =>
        (caseStudy.thumbnail = this.serverPipe.transform(caseStudy.thumbnail))
    );

    this.sliderInit();
  }
  get caseStudies(): Server.CaseStudy[] {
    return this._caseStudies;
  }
}
