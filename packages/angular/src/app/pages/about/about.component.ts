import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { TitleService, ApiService, Api } from 'shared';
import { AboutImages } from './about.images';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  team$: Subscription;
  team: Api.Team[];

  images = AboutImages;

  constructor(
    private titleService: TitleService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('About');

    this.team$ = this.apiService
      .getTeam()
      .subscribe(team => (this.team = team));
  }

  ngOnDestroy() {
    this.team$.unsubscribe();
  }
}
