import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, tap } from 'rxjs/operators';

import { MetaService, PrismicService } from 'shared';
import { Post } from 'prismic';
import { createMetaTags } from './news-post-resolver.helpers';

@Injectable()
export class NewsPostResolver implements Resolve<Post> {
  constructor(
    private metaService: MetaService,
    private prismicService: PrismicService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Post> | Observable<never> {
    return this.prismicService.getPost(route.paramMap.get('uid') || '').pipe(
      take(1),
      tap(post =>
        post ? this.metaService.setMetaTags(createMetaTags(post)) : undefined
      ),
      mergeMap(post => {
        if (post) return of(post);

        return EMPTY;
      })
    );
  }
}
