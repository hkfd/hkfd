import { createMetaTags } from './app.component.helpers';

beforeEach(jest.clearAllMocks);

describe('`createMetaTags', () => {
  it('should return about `MetaTags` if passed about url', () => {
    const res = createMetaTags('/about');

    expect(res).toEqual({ title: 'About', url: 'about' });
  });

  it('should return careers `MetaTags` if passed careers url', () => {
    const res = createMetaTags('/careers');

    expect(res).toEqual({ title: 'Careers', url: 'careers' });
  });

  it('should return `undefined` if passed service career url', () => {
    const res = createMetaTags('/careers/career');

    expect(res).toBe(undefined);
  });

  it('should return contact `MetaTags` if passed contact url', () => {
    const res = createMetaTags('/contact');

    expect(res).toEqual({ title: 'Contact', url: 'contact' });
  });

  it('should return news `MetaTags` if passed news url', () => {
    const res = createMetaTags('/news');

    expect(res).toEqual({ title: 'News', url: 'news' });
  });

  it('should return news `MetaTags` if passed paginated news url', () => {
    const res = createMetaTags('/news/page/1');

    expect(res).toEqual({ title: 'News', url: 'news' });
  });

  it('should return `undefined` if passed news post url', () => {
    const res = createMetaTags('/news/post');

    expect(res).toBe(undefined);
  });

  it('should return work `MetaTags` if passed work url', () => {
    const res = createMetaTags('/work');

    expect(res).toEqual({ title: 'Our Work', url: 'work' });
  });

  it('should return `undefined` if passed work case study url', () => {
    const res = createMetaTags('/work/case-study');

    expect(res).toBe(undefined);
  });

  it('should return blank `MetaTags` if passed root url', () => {
    const res = createMetaTags('/');

    expect(res).toEqual({});
  });

  it('should return `undefined` if passed service case study url', () => {
    const res = createMetaTags('/service/service');

    expect(res).toBe(undefined);
  });

  it('should return `undefined` if passed unknown url', () => {
    const res = createMetaTags('/no-page');

    expect(res).toBe(undefined);
  });
});
