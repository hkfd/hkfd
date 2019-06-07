import { Observable, of } from 'rxjs';
import { find, catchError, flatMap } from 'rxjs/operators';

import { Data } from './';
import { PostsResponse, NewsPost } from 'prismic';

export class MockPrismicService {
  constructor() {
    jest.spyOn(this, 'getRef');
    jest.spyOn(this, 'getPosts');
    jest.spyOn(this, 'getPost');
  }

  getRef(): Observable<string> {
    return of('abc');
  }

  getPosts(): Observable<PostsResponse<NewsPost>> {
    return of(Data.Prismic.getNewsPostsResponse());
  }

  getPost(uid: string): Observable<NewsPost | undefined> {
    return of(Data.Prismic.getNewsPosts<void>()).pipe(
      flatMap(posts => posts),
      find(post => post.uid === uid),
      catchError(_ => of(undefined))
    );
  }
}
