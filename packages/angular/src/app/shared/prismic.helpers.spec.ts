import { getNewPageSize, getNewPage, POST_PAGE_SIZE } from './prismic.helpers';

describe('`getNewPageSize`', () => {
  it('should return `currentPage * POST_PAGE_SIZE` if passed `firstLoad` as `true` arg', () => {
    const res = getNewPageSize(true, 2);

    expect(res).toBe(POST_PAGE_SIZE * 2);
  });

  it('should return `POST_PAGE_SIZE` if passed `firstLoad` as `false` arg', () => {
    const res = getNewPageSize(false, 2);

    expect(res).toBe(POST_PAGE_SIZE);
  });
});

describe('`getNewPage`', () => {
  it('should return `1` if passed `firstLoad` as `true` arg', () => {
    const res = getNewPage(true, 2);

    expect(res).toBe(1);
  });

  it('should return `currentPage` arg if passed `firstLoad` as `false` arg', () => {
    const res = getNewPage(false, 2);

    expect(res).toBe(2);
  });
});
