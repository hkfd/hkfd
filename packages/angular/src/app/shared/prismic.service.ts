import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';
import { map, flatMap, tap, catchError } from 'rxjs/operators';

import { LoggerService } from './logger.service';
import { Prismic } from './prismic';
import { environment } from 'environment';

const REF_KEY = makeStateKey<string>('prismic-ref');
const POSTS_KEY = makeStateKey<Prismic.PostsResponse>('prismic-posts');
const POST_KEY = makeStateKey<Prismic.Post>('prismic-post');

@Injectable({
  providedIn: 'root'
})
export class PrismicService {
  private postPage: number = 1;
  private postPageSize: number = 9;

  constructor(
    private http: HttpClient,
    private state: TransferState,
    private logger: LoggerService
  ) {}

  getRef(): Observable<string> {
    const cache = this.state.get<string>(REF_KEY, null);
    if (cache)
      return of(cache).pipe(
        tap(ref => this.logger.log('getRef', 'cache', ref)),
        catchError(this.handleError<string>('getRef'))
      );

    return this.http
      .get<Prismic.RefResponse>(environment.prismic.endpoint)
      .pipe(
        map(({ refs }) => refs.find(ref => ref.isMasterRef).ref),
        tap(ref => this.logger.log('getRef', ref)),
        tap(ref => this.state.set(REF_KEY, ref)),
        catchError(this.handleError<string>('getRef'))
      );
  }

  getPosts(firstLoad: boolean = false): Observable<Prismic.PostsResponse> {
    if (!firstLoad) this.postPage++;

    const cache = this.state.get<Prismic.PostsResponse>(POSTS_KEY, null);
    if (cache && firstLoad)
      return of(cache).pipe(
        tap(postsRes => this.logger.log('getPosts', 'cache', postsRes)),
        catchError(this.handleError<Prismic.PostsResponse>('getPosts'))
      );

    return this.getRef().pipe(
      flatMap(ref => {
        const params = new HttpParams()
          .append('ref', ref)
          .append('q', '[[at(document.type,"news")]]')
          .append('orderings', '[document.first_publication_date desc]')
          .append(
            'pageSize',
            `${
              firstLoad ? this.postPage * this.postPageSize : this.postPageSize
            }`
          )
          .append('page', `${firstLoad ? 1 : this.postPage}`);

        return this.http.get<Prismic.PostsResponse>(
          `${environment.prismic.endpoint}/documents/search`,
          { params }
        );
      }),
      tap(postsRes => this.logger.log('getPosts', postsRes)),
      tap(postsRes => this.state.set(POSTS_KEY, postsRes)),
      catchError(this.handleError<Prismic.PostsResponse>('getPosts'))
    );
  }

  getPost(uid: string): Observable<Prismic.Post> {
    this.logger.log(`getPost ${uid}`);

    const cache = this.state.get<Prismic.Post>(POST_KEY, null);
    if (cache && cache.uid === uid)
      return of(cache).pipe(
        tap(post => this.logger.log('getPost', 'cache', post)),
        catchError(this.handleError<Prismic.Post>('getPost'))
      );

    return this.getRef().pipe(
      flatMap(ref => {
        const params = new HttpParams()
          .append('ref', ref)
          .append('q', `[[at(my.news.uid,"${uid}")]]`);

        return this.http.get<Prismic.PostsResponse>(
          `${environment.prismic.endpoint}/documents/search`,
          { params }
        );
      }),
      map(({ results }) => results[0]),
      tap(post => this.logger.log('getPost', post)),
      tap(post => this.state.set(POST_KEY, post)),
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
