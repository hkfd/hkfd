import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, tap } from 'rxjs/operators';

import { Post } from 'shared';
import { MetaService } from '../meta.service';
import { ApiService } from '../api.service';
import { isKnownPostType, createMetaTags } from './post-resolver.helpers';

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<Post> {
  constructor(
    private router: Router,
    private metaService: MetaService,
    private apiService: ApiService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Post> | Observable<never> {
    const type =
      route.paramMap.get('type') ||
      (route.parent &&
        route.parent.routeConfig &&
        route.parent.routeConfig.path);
    const id = route.paramMap.get('id');

    if (!type || !id || !isKnownPostType(type)) {
      this.router.navigate(['/']);
      return EMPTY;
    }

    return this.apiService.getPost(type, id).pipe(
      take(1),
      tap(post =>
        post
          ? this.metaService.setMetaTags(createMetaTags(type, id, post))
          : undefined
      ),
      mergeMap(post => {
        if (post) return of(post);

        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }
}
