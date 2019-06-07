import { PostsResponse, NewsPost } from 'prismic';

export const getPaginationUrl = (
  { page }: PostsResponse<NewsPost>,
  direction: 'prev' | 'next'
): string => {
  switch (direction) {
    case 'next':
      return `/news/page/${page + 1}`;
    case 'prev':
      return page <= 2 ? '/news' : `/news/page/${page - 1}`;
  }
};
