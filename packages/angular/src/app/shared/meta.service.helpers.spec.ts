import { createTitle, createMetaTags } from './meta.service.helpers';

describe('`createTitle`', () => {
  it('should return default title if not passed `title`', () => {
    const res = createTitle({});

    expect(res).toBe('Heckford');
  });

  it('should return title if passed `title`', () => {
    const res = createTitle({ title: 'Title' });

    expect(res).toBe('Heckford – Title');
  });
});

describe('`createMetaTags`', () => {
  describe('`type`', () => {
    it('should return `type` if passed `tags.type`', () => {
      const { type } = createMetaTags({ type: 'type' as any });

      expect(type).toBe('type');
    });

    it('should return default `type` if passed `tags.type` is `undefined`', () => {
      const { type } = createMetaTags({ type: undefined });

      expect(type).toBe('website');
    });

    it('should return default `type` if not passed `tags.type`', () => {
      const { type } = createMetaTags({});

      expect(type).toBe('website');
    });
  });

  describe('`title`', () => {
    it('should return `title` if passed `tags.title`', () => {
      const { title } = createMetaTags({ title: 'title' as any });

      expect(title).toBe('title');
    });

    it('should return default `title` if passed `tags.title` is `undefined`', () => {
      const { title } = createMetaTags({ title: undefined });

      expect(title).toBe('Heckford');
    });

    it('should return default `title` if not passed `tags.title`', () => {
      const { title } = createMetaTags({});

      expect(title).toBe('Heckford');
    });
  });

  describe('`description`', () => {
    it('should return `description` if passed `tags.description`', () => {
      const { description } = createMetaTags({
        description: 'description' as any
      });

      expect(description).toBe('description');
    });

    it('should return default `description` if passed `tags.description` is `undefined`', () => {
      const { description } = createMetaTags({ description: undefined });

      expect(description).toBe('Independent advertising & marketing agency');
    });

    it('should return default `description` if not passed `tags.description`', () => {
      const { description } = createMetaTags({});

      expect(description).toBe('Independent advertising & marketing agency');
    });
  });

  describe('`image`', () => {
    it('should return `image` if passed `tags.image`', () => {
      const { image } = createMetaTags({
        image: 'image'
      });

      expect(image).toBe('image');
    });

    it('should return default `image` if passed `tags.image` is `undefined`', () => {
      const { image } = createMetaTags({ image: undefined });

      expect(image).toBe('https://testing/assets/heckford.png');
    });

    it('should return default `image` if not passed `tags.image`', () => {
      const { image } = createMetaTags({});

      expect(image).toBe('https://testing/assets/heckford.png');
    });
  });

  describe('`url`', () => {
    it('should return combined `environment.deploy.url` and`url` if passed `tags.url`', () => {
      const { url } = createMetaTags({
        url: 'url'
      });

      expect(url).toBe('https://testing/url');
    });

    it('should return default `url` if passed `tags.url` is `undefined`', () => {
      const { url } = createMetaTags({ url: undefined });

      expect(url).toBe('https://testing/');
    });

    it('should return default `url` if not passed `tags.url`', () => {
      const { url } = createMetaTags({});

      expect(url).toBe('https://testing/');
    });
  });
});
