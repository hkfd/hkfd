import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { ApiService } from '../../shared/shared.module';
import { Team } from '../../shared/shared.module';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  team: Team[];
  team$: Subscription;

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
