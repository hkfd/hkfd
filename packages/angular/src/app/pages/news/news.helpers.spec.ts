import { PostsResponse } from 'prismic';

import { getPaginationUrl } from './news.helpers';

describe('`getPaginationUrl`', () => {
  describe('Next', () => {
    it('should return `page + 1`', () => {
      const res = getPaginationUrl({ page: 1 } as PostsResponse, 'next');

      expect(res).toBe('/news/page/2');
    });
  });

  describe('Prev', () => {
    it('should return `page - 1` if `page` is bigger than `2`', () => {
      const res = getPaginationUrl({ page: 3 } as PostsResponse, 'prev');

      expect(res).toBe('/news/page/2');
    });

    it('should return news page if `page` is `2`', () => {
      const res = getPaginationUrl({ page: 2 } as PostsResponse, 'prev');

      expect(res).toBe('/news');
    });

    it('should return news page if `page` is less than `2`', () => {
      const res = getPaginationUrl({ page: 1 } as PostsResponse, 'prev');

      expect(res).toBe('/news');
    });
  });
});
