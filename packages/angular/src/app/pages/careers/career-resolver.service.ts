import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { ApiService, Api } from 'shared';

@Injectable()
export class CareerResolver implements Resolve<Api.Career> {
  constructor(private router: Router, private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Api.Career> {
    return this.apiService.getCareer(route.paramMap.get('id')).pipe(
      take(1),
      map(career => {
        if (career) return career;

        this.router.navigate(['/careers']);
        return null;
      })
    );
  }
}
