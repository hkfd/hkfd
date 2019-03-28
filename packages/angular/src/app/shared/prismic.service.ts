import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, flatMap, tap } from 'rxjs/operators';

import { LoggerService } from './logger.service';
import { MetaService } from './meta.service';
import { Post, RefResponse, PostsResponse } from 'prismic';
import { environment } from 'environment';
import { createNewsPostMetaTags } from './prismic.service.helpers';
import { getNewPage, getNewPageSize } from './prismic.helpers';

export const URL = `${environment.prismic.endpoint}/documents/search`;

@Injectable({
  providedIn: 'root'
})
export class PrismicService {
  private postPage = 1;

  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private metaService: MetaService
  ) {}

  getRef(): Observable<string> {
    return this.http.get<RefResponse>(environment.prismic.endpoint).pipe(
      map(({ refs }) => refs.find(ref => ref.isMasterRef)),
      map(ref => (ref ? ref.ref : '')),
      tap(ref => this.logger.log('getRef', ref))
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
          .append('pageSize', `${getNewPageSize(firstLoad, this.postPage)}`)
          .append('page', `${getNewPage(firstLoad, this.postPage)}`);

        return this.http.get<PostsResponse>(URL, { params });
      }),
      tap(postsRes => this.logger.log('getPosts', postsRes))
    );
  }

  getPost(uid: string): Observable<Post | null> {
    this.logger.log(`getPost ${uid}`);

    return this.getRef().pipe(
      flatMap(ref => {
        const params = new HttpParams()
          .append('ref', ref)
          .append('q', `[[at(my.news.uid,"${uid}")]]`);

        return this.http.get<PostsResponse>(URL, { params });
      }),
      map(({ results }) => results[0] || null),
      tap(post => {
        this.logger.log('getPost', post);
        post && this.metaService.setMetaTags(createNewsPostMetaTags(post));
      })
    );
  }
}
