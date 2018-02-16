import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import {
  TitleService,
  ApiService,
  Service
} from '../../../shared/shared.module';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  service$: Subscription;
  service: Service;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: TitleService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.service$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.apiService.getService(params.get('id'))
      )
      .subscribe((service: Service) => {
        this.service = service;
        this.titleService.setTitle(service.title);
      });
  }

  ngOnDestroy() {
    this.service$.unsubscribe();
  }
}
