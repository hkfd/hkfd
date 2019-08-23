import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from 'shared';
import { Team } from 'api';
import { AboutImages } from './about.images';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  team$: Observable<Team[]> | undefined;

  images = AboutImages;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.team$ = this.apiService.getTeam();
  }
}
