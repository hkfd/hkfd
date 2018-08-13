import { Observable, of } from 'rxjs';

import { Data } from './';
import { Prismic } from 'shared';

export class MockPrismicService {
  constructor() {
    this.getPosts = spyOn(this, 'getPosts').and.callThrough();
    this.getPost = spyOn(this, 'getPost').and.callThrough();
  }

  getPosts(_firstLoad: boolean = false): Promise<Prismic.PostsResponse> {
    return Promise.resolve(Data.Prismic.postsResponse);
  }

  getPost(_uid: string): Observable<Prismic.Post> {
    return of(Data.Prismic.posts[0]);
  }
}
