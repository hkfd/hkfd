import { Observable, of } from 'rxjs';
import { find, catchError, flatMap } from 'rxjs/operators';

import { Data } from './';
import { Prismic } from 'shared';

export class MockPrismicService {
  constructor() {
    this.getRef = spyOn(this, 'getRef').and.callThrough();
    this.getPosts = spyOn(this, 'getPosts').and.callThrough();
    this.getPost = spyOn(this, 'getPost').and.callThrough();
  }

  getRef(): Observable<string> {
    return of('abc');
  }

  getPosts(): Observable<Prismic.PostsResponse> {
    return of(Data.Prismic.getPostsResponse());
  }

  getPost(uid: string): Observable<Prismic.Post | undefined> {
    return of(Data.Prismic.getPosts<void>()).pipe(
      flatMap(posts => posts),
      find(post => post.uid === uid),
      catchError(_ => of(undefined))
    );
  }
}
