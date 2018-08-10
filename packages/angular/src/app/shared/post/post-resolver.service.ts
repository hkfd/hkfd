import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { ApiService } from '../api.service';
import { Api } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<Api.Post> {
  constructor(private router: Router, private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Api.Post> {
    return this.apiService
      .getPost(
        route.paramMap.get('type') || route.parent.routeConfig.path,
        route.paramMap.get('id')
      )
      .pipe(
        take(1),
        map(post => {
          if (post) return post;

          this.router.navigate(['/']);
          return null;
        })
      );
  }
}
