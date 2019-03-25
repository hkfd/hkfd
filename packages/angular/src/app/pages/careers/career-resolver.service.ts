import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, tap } from 'rxjs/operators';

import { MetaService, ApiService } from 'shared';
import { Career } from 'api';
import { createMetaTags } from './career-resolver.helpers';

@Injectable()
export class CareerResolver implements Resolve<Career> {
  constructor(
    private router: Router,
    private metaService: MetaService,
    private apiService: ApiService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Career> | Observable<never> {
    return this.apiService.getCareer(route.paramMap.get('id') || '').pipe(
      take(1),
      tap(career =>
        career
          ? this.metaService.setMetaTags(createMetaTags(career))
          : undefined
      ),
      mergeMap(career => {
        if (career) return of(career);

        this.router.navigate(['/careers']);
        return EMPTY;
      })
    );
  }
}
