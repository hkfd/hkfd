import { environment } from 'environment';
import { PostType, MetaTags, Post } from 'shared';

export const isKnownPostType = (type: string): type is PostType =>
  type === 'service' || type === 'work';

export const createMetaTags = (
  type: PostType,
  id: string,
  {
    title,
    intro,
    thumbnail: {
      image: { name }
    }
  }: Post
): MetaTags => ({
  type: 'article',
  title,
  description: intro[0],
  url: `${type}/${id}`,
  image: `https://res.cloudinary.com/${
    environment.cloudinaryName
  }/image/upload/w_2400,h_ih,c_limit,q_auto,f_auto/${name}`
});
