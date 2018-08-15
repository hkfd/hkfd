import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, flatMap, tap, catchError } from 'rxjs/operators';

import { LoggerService } from './logger.service';
import { Prismic } from './prismic';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class PrismicService {
  private postPage: number = 1;
  private postPageSize: number = 9;

  constructor(private logger: LoggerService, private http: HttpClient) {}

  getRef(): Observable<string> {
    return this.http
      .get<Prismic.RefResponse>(environment.prismic.endpoint)
      .pipe(
        map(({ refs }) => refs.find(ref => ref.isMasterRef).ref),
        tap(ref => this.logger.log('getRef', ref))
      );
  }

  getPosts(firstLoad: boolean = false): Observable<Prismic.PostsResponse> {
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

        return this.http.get<Prismic.PostsResponse>(
          `${environment.prismic.endpoint}/documents/search`,
          { params }
        );
      }),
      tap(postsRes => this.logger.log('getPosts', postsRes)),
      catchError(this.handleError<Prismic.PostsResponse>('getPosts'))
    );
  }

  getPost(uid: string): Observable<Prismic.Post> {
    this.logger.log(`getPost ${uid}`);

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
