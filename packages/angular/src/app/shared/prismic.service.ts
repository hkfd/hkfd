import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, flatMap, tap } from 'rxjs/operators';

import { LoggerService } from './logger.service';
import { MetaService } from './meta.service';
import { NotificationService } from './notification.service';
import { catchNetworkError } from './errors';
import { Post, RefResponse, PostsResponse } from 'prismic';
import { environment } from 'environment';
import { createNewsPostMetaTags } from './prismic.service.helpers';
import { getMasterRef, getPostsParams, getPostParams } from './prismic.helpers';

export const URL = `${environment.prismic.endpoint}/documents/search`;

@Injectable({
  providedIn: 'root'
})
export class PrismicService {
  private postPage = 1;

  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private metaService: MetaService,
    private notificationService: NotificationService
  ) {}

  getRef(): Observable<string> {
    return this.http.get<RefResponse>(environment.prismic.endpoint).pipe(
      map(getMasterRef),
      tap(ref => this.logger.log('getRef', ref))
    );
  }

  getPosts(firstLoad: boolean = false): Observable<PostsResponse> {
    if (!firstLoad) this.postPage++;

    return this.getRef().pipe(
      flatMap(ref =>
        this.http.get<PostsResponse>(URL, {
          params: getPostsParams({ ref, firstLoad, postPage: this.postPage })
        })
      ),
      catchNetworkError(() =>
        this.notificationService.displayMessage(`Couldn't load posts`, {
          action: 'Retry'
        })
      ),
      tap(postsRes => this.logger.log('getPosts', postsRes))
    );
  }

  getPost(uid: string): Observable<Post | null> {
    this.logger.log(`getPost ${uid}`);

    return this.getRef().pipe(
      flatMap(ref =>
        this.http.get<PostsResponse>(URL, {
          params: getPostParams({ ref, uid })
        })
      ),
      catchNetworkError(() =>
        this.notificationService.displayMessage(`Couldn't load post`, {
          action: 'Retry'
        })
      ),
      map(({ results }) => results[0] || null),
      tap(post => {
        this.logger.log('getPost', post);
        this.metaService.setMetaTags(createNewsPostMetaTags(post));
      })
    );
  }
}
