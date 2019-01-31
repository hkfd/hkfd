import { Observable, of } from 'rxjs';
import { find, catchError, flatMap } from 'rxjs/operators';

import { Data } from './';
import { PostsResponse, Post } from 'prismic';

export class MockPrismicService {
  constructor() {
    jest.spyOn(this, 'getRef');
    jest.spyOn(this, 'getPosts');
    jest.spyOn(this, 'getPost');
  }

  getRef(): Observable<string> {
    return of('abc');
  }

  getPosts(): Observable<PostsResponse> {
    return of(Data.Prismic.getPostsResponse());
  }

  getPost(uid: string): Observable<Post | undefined> {
    return of(Data.Prismic.getPosts<void>()).pipe(
      flatMap(posts => posts),
      find(post => post.uid === uid),
      catchError(_ => of(undefined))
    );
  }
}
