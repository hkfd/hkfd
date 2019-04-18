import * as PrismicHelpers from './prismic.helpers';
import {
  getNewPageSize,
  getNewPage,
  POST_PAGE_SIZE,
  getMasterRef,
  getPostsParams,
  getPostParams
} from './prismic.helpers';

jest.spyOn(PrismicHelpers, 'getNewPage');
jest.spyOn(PrismicHelpers, 'getNewPageSize');

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

describe('`getMasterRef`', () => {
  it('should return `ref.ref` if has `ref` with `isMasterRef` as `true`', () => {
    const res = getMasterRef({
      refs: [
        { ref: 'not-master-ref', isMasterRef: false },
        { ref: 'is-master-ref', isMasterRef: true }
      ]
    } as any);

    expect(res).toBe('is-master-ref');
  });

  it('should throw error if does not have `ref` with `isMasterRef` as `true`', () => {
    const res = () =>
      getMasterRef({
        refs: [
          { ref: 'not-master-ref', isMasterRef: false },
          { ref: 'not-master-ref', isMasterRef: false }
        ]
      } as any);

    expect(res).toThrowError('No `masterRef`');
  });
});

describe('`getPostsParams`', () => {
  it('should call `getNewPageSize` with `firstLoad` and `postPage` args', () => {
    getPostsParams({
      ref: 'ref',
      firstLoad: 'firstLoad',
      postPage: 'postPage'
    } as any);

    expect(getNewPageSize).toHaveBeenCalledWith('firstLoad', 'postPage');
  });

  it('should call `getNewPage` with `firstLoad` and `postPage` args', () => {
    getPostsParams({
      ref: 'ref',
      firstLoad: 'firstLoad',
      postPage: 'postPage'
    } as any);

    expect(getNewPage).toHaveBeenCalledWith('firstLoad', 'postPage');
  });

  it('should return `HttpParams`', () => {
    (getNewPageSize as jest.Mock).mockReturnValue('getNewPageSizeReturn');
    (getNewPage as jest.Mock).mockReturnValue('getNewPageReturn');

    const res = getPostsParams({
      ref: 'ref',
      firstLoad: 'firstLoad',
      postPage: 'postPage'
    } as any);

    expect(res.toString()).toEqual(
      // tslint:disable-next-line:max-line-length
      'ref=ref&q=%5B%5Bat(document.type,%22news%22)%5D%5D&orderings=%5Bdocument.first_publication_date%20desc%5D&pageSize=getNewPageSizeReturn&page=getNewPageReturn'
    );
  });
});

describe('`getPostParams`', () => {
  it('should return `HttpParams`', () => {
    const res = getPostParams({
      ref: 'ref',
      uid: 'uid'
    } as any);

    expect(res.toString()).toBe(
      'ref=ref&q=%5B%5Bat(my.news.uid,%22uid%22)%5D%5D'
    );
  });
});
