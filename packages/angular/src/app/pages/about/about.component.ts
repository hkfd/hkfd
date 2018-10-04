import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { MetaService, ApiService, Api } from 'shared';
import { AboutImages } from './about.images';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  team$!: Subscription;
  team: Api.Team[] | undefined;

  images = AboutImages;

  constructor(
    private metaService: MetaService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.metaService.setMetaTags({ title: 'About', url: 'about' });

    this.team$ = this.apiService
      .getTeam()
      .subscribe(team => (this.team = team));
  }

  ngOnDestroy() {
    this.team$.unsubscribe();
  }
}
