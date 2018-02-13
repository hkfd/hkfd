import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { ApiService, Team, Image } from '../../shared/shared.module';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  team$: Subscription;
  team: Team[];

  introImage: Image = {
    name: 'heckford-studio',
    alt: 'Heckford studio'
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.team$ = this.apiService
      .getTeam()
      .subscribe((team: Team[]) => (this.team = team));
  }

  ngOnDestroy() {
    this.team$.unsubscribe();
  }
}
