import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { TitleService, ApiService, Server } from '../../shared/shared.module';
import { AboutImages } from './about.images';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  team$: Subscription;
  team: Server.Team[];

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
