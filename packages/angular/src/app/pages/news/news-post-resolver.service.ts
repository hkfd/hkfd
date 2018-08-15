import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { MetaService, PrismicService, Prismic } from 'shared';

@Injectable()
export class NewsPostResolver implements Resolve<Prismic.Post> {
  constructor(
    private metaService: MetaService,
    private prismicService: PrismicService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Prismic.Post> {
    return this.prismicService.getPost(route.paramMap.get('uid')).pipe(
      take(1),
      tap(
        post =>
          post
            ? this.metaService.setMetaTags({
                type: 'article',
                ...(post.data.title &&
                  post.data.title[0] &&
                  post.data.title[0].text && {
                    title: post.data.title[0].text
                  }),
                ...(post.data.description && {
                  description: post.data.description
                }),
                url: `news/${post.uid}`,
                ...(post.data.image &&
                  post.data.image.lg &&
                  post.data.image.lg.url && { image: post.data.image.lg.url })
              })
            : undefined
      )
    );
  }
}
