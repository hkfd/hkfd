import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';
import { map, flatMap, tap, catchError } from 'rxjs/operators';

import { LoggerService } from './logger.service';
import { Post, RefResponse, PostsResponse } from 'prismic';
import { environment } from 'environment';

const REF_KEY = makeStateKey<string>('prismic-ref');
const POST_KEY = makeStateKey<Post>('prismic-post');

@Injectable({
  providedIn: 'root'
})
export class PrismicService {
  private postPage = 1;
  private postPageSize = 9;

  constructor(
    private http: HttpClient,
    private state: TransferState,
    private logger: LoggerService
  ) {}

  getRef(): Observable<string> {
    const cache = this.state.get<string | null>(REF_KEY, null);
    if (cache) {
      return of(cache).pipe(
        tap(ref => this.logger.log('getRef', 'cache', ref))
      );
    }

    return this.http.get<RefResponse>(environment.prismic.endpoint).pipe(
      map(({ refs }) => refs.find(ref => ref.isMasterRef)),
      map(ref => (ref ? ref.ref : '')),
      tap(ref => this.logger.log('getRef', ref)),
      tap(ref => this.state.set(REF_KEY, ref)),
      catchError(this.handleError<string>('getRef'))
    );
  }

  getPosts(firstLoad: boolean = false): Observable<PostsResponse> {
    if (!firstLoad) this.postPage++;

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

        return this.http.get<PostsResponse>(
          `${environment.prismic.endpoint}/documents/search`,
          { params }
        );
      }),
      tap(postsRes => this.logger.log('getPosts', postsRes)),
      catchError(this.handleError<PostsResponse>('getPosts'))
    );
  }

  getPost(uid: string): Observable<Post> {
    this.logger.log(`getPost ${uid}`);

    const cache = this.state.get<Post | null>(POST_KEY, null);
    if (cache && cache.uid === uid) {
      return of(cache).pipe(
        tap(post => this.logger.log('getPost', 'cache', post))
      );
    }

    return this.getRef().pipe(
      flatMap(ref => {
        const params = new HttpParams()
          .append('ref', ref)
          .append('q', `[[at(my.news.uid,"${uid}")]]`);

        return this.http.get<PostsResponse>(
          `${environment.prismic.endpoint}/documents/search`,
          { params }
        );
      }),
      map(({ results }) => results[0]),
      tap(post => this.logger.log('getPost', post)),
      tap(post => this.state.set(POST_KEY, post)),
      catchError(this.handleError<Post>('getPost'))
    );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(operation, error);
      return of(result as T);
    };
  }
}
