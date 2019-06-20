import { MetaTags } from 'shared';
import { NewsPost, CareerPost, PostsResponse } from 'prismic';

export type PostsReturn<T> = PostsResponse<PostTypeReturn<T>>;
export interface PostReturn<T> {
  post: PostTypeReturn<T> | null;
}

export type PostTypeReturn<T> = T extends 'news'
  ? NewsPost
  : T extends 'career'
  ? CareerPost
  : never;

export type getPostsArgs<T> = T extends 'news'
  ? { page: string }
  : T extends 'career'
  ? never
  : never;

export const createNewsPostMetaTags = ({
  uid,
  data: { title, description, image }
}: NewsPost): Partial<MetaTags> => ({
  type: 'article',
  ...(title &&
    title[0] &&
    title[0].text && {
      title: title[0].text
    }),
  ...(description && {
    description
  }),
  url: `news/${uid}`,
  ...(image && image.lg && image.lg.url && { image: image.lg.url })
});

export const createCareerPostMetaTags = ({
  uid,
  data: { title, salary }
}: CareerPost): Partial<MetaTags> => ({
  type: 'article',
  ...(title &&
    title[0] &&
    title[0].text && {
      title: title[0].text
    }),
  ...(salary && {
    description: salary
  }),
  url: `careers/${uid}`
});

export const createPostMetaTags = (
  post: NewsPost | CareerPost | null
): Partial<MetaTags> => {
  if (!post) return { title: 'Page not found' };

  switch (post.type) {
    case 'news':
      return createNewsPostMetaTags(post);
    case 'career':
      return createCareerPostMetaTags(post);
    default:
      throw new Error('Unsupported `type`');
  }
};
