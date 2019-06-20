import { Observable, of } from 'rxjs';
import { find, flatMap, map } from 'rxjs/operators';

import { Data } from './';
import { PostsResponse, NewsPost } from 'prismic';
import { PostReturn } from 'shared';

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

  getPost(uid: string): Observable<PostReturn<'news'>> {
    return of(Data.Prismic.getNewsPosts<void>()).pipe(
      flatMap(posts => posts),
      find(post => post.uid === uid),
      map((post: any) => ({ post }))
    );
  }
}
