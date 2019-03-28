import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ApiService } from 'shared';
import { Career } from 'api';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerComponent implements OnInit {
  career$: Observable<Career | null> | undefined;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.career$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.apiService.getCareer(params.get('id') || '')
      )
    );
  }
}
