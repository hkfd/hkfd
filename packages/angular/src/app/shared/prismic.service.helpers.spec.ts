import { Data } from 'testing';

import { createNewsPostMetaTags } from './prismic.service.helpers';

describe('`createNewsPostMetaTags`', () => {
  it('should return partial `MetaTags`', () => {
    const res = createNewsPostMetaTags(Data.Prismic.getPost());

    expect(res).toEqual({
      type: 'article',
      title: 'Post 1',
      description: 'Post 1 description',
      url: 'news/post-1',
      image: 'post-1'
    });
  });

  it('should not return `title` if not passed `data.title`', () => {
    const res = createNewsPostMetaTags({
      ...Data.Prismic.getPost(),
      data: { ...Data.Prismic.getPost().data, title: null as any }
    });

    expect(res).toEqual({
      type: 'article',
      description: 'Post 1 description',
      url: 'news/post-1',
      image: 'post-1'
    });
  });

  it('should not return `description` if not passed `data.description`', () => {
    const res = createNewsPostMetaTags({
      ...Data.Prismic.getPost(),
      data: { ...Data.Prismic.getPost().data, description: null as any }
    });

    expect(res).toEqual({
      type: 'article',
      title: 'Post 1',
      url: 'news/post-1',
      image: 'post-1'
    });
  });

  it('should not return `image` if not passed `data.image`', () => {
    const res = createNewsPostMetaTags({
      ...Data.Prismic.getPost(),
      data: { ...Data.Prismic.getPost().data, image: null as any }
    });

    expect(res).toEqual({
      type: 'article',
      title: 'Post 1',
      description: 'Post 1 description',
      url: 'news/post-1'
    });
  });
});
