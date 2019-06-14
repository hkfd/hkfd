import { linkResolver } from './prismic-text.helpers';

describe('`linkResolver`', () => {
  it('should return `/news/$uid` if `type` arg is `news`', () => {
    const res = linkResolver({
      type: 'news',
      uid: 'post'
    } as any);

    expect(res).toBe('/news/post');
  });

  it('should return `/careers/$uid` if `type` arg is `career`', () => {
    const res = linkResolver({
      type: 'career',
      uid: 'post'
    } as any);

    expect(res).toBe('/careers/post');
  });

  it('should return `/` by default', () => {
    const res = linkResolver({} as any);

    expect(res).toBe('/');
  });
});
