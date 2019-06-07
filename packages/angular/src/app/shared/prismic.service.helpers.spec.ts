import { Data } from 'testing';

import {
  createNewsPostMetaTags,
  createCareerPostMetaTags,
  createPostMetaTags
} from './prismic.service.helpers';
import * as PrismicServiceHelpers from './prismic.service.helpers';
import { NewsPost, CareerPost } from 'prismic';

describe('`createNewsPostMetaTags`', () => {
  it('should return partial `MetaTags`', () => {
    const res = createNewsPostMetaTags(Data.Prismic.getNewsPost());

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
      ...Data.Prismic.getNewsPost(),
      data: { ...Data.Prismic.getNewsPost().data, title: null as any }
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
      ...Data.Prismic.getNewsPost(),
      data: { ...Data.Prismic.getNewsPost().data, description: null as any }
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
      ...Data.Prismic.getNewsPost(),
      data: { ...Data.Prismic.getNewsPost().data, image: null as any }
    });

    expect(res).toEqual({
      type: 'article',
      title: 'Post 1',
      description: 'Post 1 description',
      url: 'news/post-1'
    });
  });
});

describe('`createCareerPostMetaTags`', () => {
  it('should return partial `MetaTags`', () => {
    const res = createCareerPostMetaTags(Data.Prismic.getCareerPost());

    expect(res).toEqual({
      type: 'article',
      title: 'Post',
      description: 'Post salary',
      url: 'careers/post'
    });
  });

  it('should not return `title` if not passed `data.title`', () => {
    const res = createCareerPostMetaTags({
      ...Data.Prismic.getCareerPost(),
      data: { ...Data.Prismic.getCareerPost().data, title: null as any }
    });

    expect(res).toEqual({
      type: 'article',
      description: 'Post salary',
      url: 'careers/post'
    });
  });

  it('should not return `description` if not passed `data.salary`', () => {
    const res = createCareerPostMetaTags({
      ...Data.Prismic.getCareerPost(),
      data: { ...Data.Prismic.getCareerPost().data, salary: null as any }
    });

    expect(res).toEqual({
      type: 'article',
      title: 'Post',
      url: 'careers/post'
    });
  });
});

describe('`createPostMetaTags`', () => {
  beforeEach(() => {
    jest
      .spyOn(PrismicServiceHelpers, 'createNewsPostMetaTags')
      .mockReturnValue('createNewsPostMetaTagsReturn');
    jest
      .spyOn(PrismicServiceHelpers, 'createCareerPostMetaTags')
      .mockReturnValue('createCareerPostMetaTagsReturn');
  });

  describe('`post` is `null`', () => {
    it('should return 404 `MetaTags`', () => {
      const res = createPostMetaTags(null);

      expect(res).toEqual({ title: 'Page not found' });
    });
  });

  describe('`post` is `NewsPost`', () => {
    it('should call `createNewsPostMetaTags` with `post` arg', () => {
      createPostMetaTags({ type: 'news' } as NewsPost);

      expect(createNewsPostMetaTags).toHaveBeenCalledWith({ type: 'news' });
    });

    it('should return `createNewsPostMetaTags`', () => {
      const res = createPostMetaTags({ type: 'news' } as NewsPost);

      expect(res).toBe('createNewsPostMetaTagsReturn');
    });
  });

  describe('`post` is `CareerPost`', () => {
    it('should call `createCareerPostMetaTags` with `post` arg', () => {
      createPostMetaTags({ type: 'career' } as CareerPost);

      expect(createCareerPostMetaTags).toHaveBeenCalledWith({ type: 'career' });
    });

    it('should return `createCareerPostMetaTags`', () => {
      const res = createPostMetaTags({ type: 'career' } as CareerPost);

      expect(res).toBe('createCareerPostMetaTagsReturn');
    });
  });

  describe('`post` is unknown', () => {
    it('should throw error', () => {
      expect(() => createPostMetaTags({ type: 'unknown' } as any)).toThrowError(
        'Unsupported'
      );
    });
  });
});
