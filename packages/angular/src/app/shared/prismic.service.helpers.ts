import { MetaTags } from 'shared';
import { Post } from 'prismic';

export const createNewsPostMetaTags = (
  post: Post | null
): Partial<MetaTags> => {
  if (!post) return { title: 'Page not found' };

  const {
    uid,
    data: { title, description, image }
  } = post;

  return {
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
  };
};
