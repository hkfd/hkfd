import { NewsPost, CareerPost } from 'prismic';

export const linkResolver = ({ type, uid }: NewsPost | CareerPost): string => {
  switch (type) {
    case 'news':
      return `/news/${uid}`;
    case 'career':
      return `/careers/${uid}`;
    default:
      return '/';
  }
};
