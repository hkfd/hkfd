import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { MetaService, ApiService, Api } from 'shared';

@Injectable()
export class CareerResolver implements Resolve<Api.Career> {
  constructor(
    private router: Router,
    private metaService: MetaService,
    private apiService: ApiService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Api.Career> {
    return this.apiService.getCareer(route.paramMap.get('id')).pipe(
      take(1),
      tap(
        career =>
          career
            ? this.metaService.setMetaTags({
                type: 'article',
                title: career.title,
                description: career.salary,
                url: `careers/${career.id}`
              })
            : undefined
      ),
      map(career => {
        if (career) return career;

        this.router.navigate(['/careers']);
        return null;
      })
    );
  }
}
