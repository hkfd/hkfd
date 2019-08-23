import { MetaTags } from 'shared';

export const createMetaTags = (
  url: string
): Pick<MetaTags, 'title' | 'url'> | Partial<MetaTags> | undefined => {
  if (url.startsWith('/news/page/')) return { title: 'News', url: 'news' };

  switch (url) {
    case '/about':
      return { title: 'About', url: 'about' };
    case '/careers':
      return { title: 'Careers', url: 'careers' };
    case '/contact':
      return { title: 'Contact', url: 'contact' };
    case '/news':
      return { title: 'News', url: 'news' };
    case '/work':
      return { title: 'Our Work', url: 'work' };
    case '/':
      return {};
    default:
      return undefined;
  }
};
