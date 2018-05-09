import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import * as Cookies from 'js-cookie';

import { PrismicService } from '../../shared/prismic.service';
import { Prismic } from '../../shared/prismic';

const PREVIEW_EXPIRES = 30 * 60 * 1000;

@Injectable()
export class NewsPostResolver implements Resolve<Prismic.Post> {
  constructor(private prismicService: PrismicService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Promise<Prismic.Post> {
    const id = route.paramMap.get('id');

    const token = route.queryParamMap.get('token');
    const documentId = route.queryParamMap.get('documentId');

    if (id === 'preview' && token && documentId) {
      Cookies.set('io.prismic.preview', token, { expires: PREVIEW_EXPIRES });

      return this.prismicService.getPost('id', documentId);
    }

    return this.prismicService.getPost('uid', id);
  }
}