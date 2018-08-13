import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import * as Cookies from 'js-cookie';

import { MetaService, PrismicService, Prismic } from 'shared';

const PREVIEW_EXPIRES = 30 * 60 * 1000;

@Injectable()
export class NewsPostResolver implements Resolve<Prismic.Post> {
  constructor(
    private metaService: MetaService,
    private prismicService: PrismicService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Prismic.Post> {
    const id = route.paramMap.get('id');

    const token = route.queryParamMap.get('token');
    const documentId = route.queryParamMap.get('documentId');

    if (id === 'preview' && token && documentId) {
      Cookies.set('io.prismic.preview', token, { expires: PREVIEW_EXPIRES });

      return this.prismicService.getPost('id', documentId).pipe(take(1));
    }

    return this.prismicService.getPost('uid', id).pipe(
      take(1),
      tap(
        post =>
          post
            ? this.metaService.setMetaTags({
                type: 'article',
                title: post.data.title[0].text,
                url: `news/${post.uid}`,
                image: post.data.image.lg.url
              })
            : undefined
      )
    );
  }
}
