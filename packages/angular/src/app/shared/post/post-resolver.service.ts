import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { environment } from 'environment';
import { MetaService } from '../meta.service';
import { ApiService } from '../api.service';
import { Api } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<Api.Post> {
  constructor(
    private router: Router,
    private metaService: MetaService,
    private apiService: ApiService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Api.Post> {
    const type = route.paramMap.get('type') || route.parent.routeConfig.path;
    const id = route.paramMap.get('id');

    return this.apiService.getPost(type, id).pipe(
      take(1),
      tap(
        post =>
          post
            ? this.metaService.setMetaTags({
                type: 'article',
                title: post.title,
                description: post.intro[0],
                url: `${type}/${id}`,
                image: `https://res.cloudinary.com/${
                  environment.cloudinaryName
                }/image/upload/w_2400,h_ih,c_limit,q_auto,f_auto/${
                  post.thumbnail.image.name
                }`
              })
            : undefined
      ),
      map(post => {
        if (post) return post;

        this.router.navigate(['/']);
        return null;
      })
    );
  }
}
