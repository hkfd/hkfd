import { Observable, of } from 'rxjs';

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
    return of(Data.Prismic.postsResponse);
  }

  getPost(): Observable<Prismic.Post> {
    return of(Data.Prismic.posts[0]);
  }
}
