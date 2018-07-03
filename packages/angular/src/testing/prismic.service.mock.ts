import { Data } from './';
import { Prismic } from 'shared';

export class MockPrismicService {
  constructor() {
    this.getPosts = spyOn(this, 'getPosts').and.callThrough();
    this.getPost = spyOn(this, 'getPost').and.callThrough();
  }

  getPosts(firstLoad: boolean = false): Promise<Prismic.PostsResponse> {
    return Promise.resolve(Data.Prismic.postsResponse);
  }

  getPost(uid: string): Promise<Prismic.Post> {
    return Promise.resolve(Data.Prismic.posts[0]);
  }
}
