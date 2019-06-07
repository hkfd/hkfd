import { CaseStudy } from 'api';
import { environment } from 'environment';
import { Post, PostType } from './api.service';
import { MetaTags } from './meta';

export const SERVICES = `${environment.api.url}services.json`;
export const CASE_STUDIES = `${environment.api.url}case-studies.json`;

export const isCaseStudy = (post: Post): post is CaseStudy =>
  post.hasOwnProperty('overview');

export const isKnownPostType = (type: string): type is PostType =>
  type === 'service' || type === 'work';

export const getPostUrl = (type: PostType): string => {
  switch (type) {
    case 'service':
      return SERVICES;
    case 'work':
      return CASE_STUDIES;
  }
};

export const createPostMetaTags = (
  type: PostType,
  id: string,
  post: Post | null
): Partial<MetaTags> => {
  if (!post) return { title: 'Page not found' };

  const {
    title,
    intro,
    thumbnail: {
      image: { name }
    }
  } = post;

  return {
    type: 'article',
    title,
    description: intro[0],
    url: `${type}/${id}`,
    image: `https://res.cloudinary.com/${
      environment.cloudinaryName
    }/image/upload/w_2400,h_ih,c_limit,q_auto,f_auto/${name}`
  };
};
