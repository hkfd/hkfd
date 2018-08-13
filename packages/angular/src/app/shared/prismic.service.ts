import { Injectable } from '@angular/core';

import { Observable, from, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { getApi, Predicates } from 'prismic-javascript';

import { LoggerService } from './logger.service';
import { Prismic } from './prismic';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class PrismicService {
  private api = getApi(environment.prismic.endpoint);
  postPage: number = 1;
  postPageSize: number = 9;

  constructor(private logger: LoggerService) {}

  getPosts(firstLoad: boolean = false): Promise<Prismic.PostsResponse> {
    if (!firstLoad) this.postPage++;

    this.logger.log(`getPosts firstLoad: ${firstLoad}`);

    return this.api
      .then<any>(api =>
        api.query(Predicates.at('document.type', 'news'), {
          orderings: '[document.first_publication_date desc]',
          pageSize: firstLoad
            ? this.postPage * this.postPageSize
            : this.postPageSize,
          page: firstLoad ? 1 : this.postPage
        })
      )
      .catch(err => this.logger.error(err));
  }

  getPost(idType: 'id' | 'uid', val: string): Observable<Prismic.Post> {
    this.logger.log(`getPost type: ${idType} ${val}`);

    return from(
      this.api.then<any>(
        api => (idType === 'id' ? api.getByID(val) : api.getByUID('news', val))
      )
    ).pipe(
      tap(post => this.logger.log('getPost', post)),
      catchError(this.handleError<Prismic.Post>('getPost'))
    );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(operation, error);
      return of(result as T);
    };
  }
}
