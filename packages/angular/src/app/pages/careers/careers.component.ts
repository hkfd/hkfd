import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { MetaService, ApiService } from 'shared';
import { Career } from 'api';
import { CareersImages } from './careers.images';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit {
  careers$!: Observable<Career[]>;

  images = CareersImages;

  constructor(
    private metaService: MetaService,
    private apiService: ApiService
  ) {}

  careerTrackBy(_index: number, { id }: Career) {
    return id;
  }

  ngOnInit() {
    this.metaService.setMetaTags({ title: 'Careers', url: 'careers' });

    this.careers$ = this.apiService.getCareers();
  }
}
