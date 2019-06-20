import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, flatMap, tap } from 'rxjs/operators';

import { LoggerService } from './logger.service';
import { MetaService } from './meta.service';
import { NotificationService } from './notification.service';
import { catchNetworkError } from './errors';
import { RefResponse, PostsResponse, PostTypes } from 'prismic';
import { environment } from 'environment';
import {
  createPostMetaTags,
  getPostsArgs,
  PostsReturn,
  PostReturn,
  PostTypeReturn
} from './prismic.service.helpers';
import { getMasterRef, getPostParams, getPostsParams } from './prismic.helpers';

export const URL = `${environment.prismic.endpoint}/documents/search`;

@Injectable({
  providedIn: 'root'
})
export class PrismicService {
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

  getPosts<T extends 'career'>(type: T): Observable<PostsReturn<T>>;
  getPosts<T extends 'news'>(
    type: T,
    temp: getPostsArgs<T>
  ): Observable<PostsReturn<T>>;
  getPosts<T extends PostTypes>(
    type: T,
    args?: getPostsArgs<T>
  ): Observable<PostsReturn<T>> {
    return this.getRef().pipe(
      flatMap(ref =>
        this.http.get<PostsResponse<PostTypeReturn<T>>>(URL, {
          params: getPostsParams({ type, ref, page: args && args.page })
        })
      ),
      catchNetworkError(() =>
        this.notificationService.displayMessage(`Couldn't load posts`, {
          action: 'Retry'
        })
      ),
      tap(postsRes => this.logger.log('getPosts', postsRes))
    ) as Observable<PostsReturn<T>>;
  }

  getPost<T extends PostTypes>(
    type: T,
    uid: string
  ): Observable<PostReturn<T>> {
    return this.getRef().pipe(
      flatMap(ref =>
        this.http.get<PostsResponse<PostTypeReturn<T>>>(URL, {
          params: getPostParams({ type, ref, uid })
        })
      ),
      catchNetworkError(() =>
        this.notificationService.displayMessage(`Couldn't load post`, {
          action: 'Retry'
        })
      ),
      map(({ results }) => ({ post: results[0] || null })),
      tap(({ post }) => {
        this.logger.log('getPost', post);
        this.metaService.setMetaTags(createPostMetaTags(post));
      })
    ) as Observable<PostReturn<T>>;
  }
}
