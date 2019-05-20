import { getMasterRef, getPostsParams, getPostParams } from './prismic.helpers';

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
  it('should return `HttpParams`', () => {
    const res = getPostsParams({
      ref: 'ref',
      page: 'page'
    });

    expect(res.toString()).toEqual(
      // tslint:disable-next-line:max-line-length
      'ref=ref&q=%5B%5Bat(document.type,%22news%22)%5D%5D&orderings=%5Bdocument.first_publication_date%20desc%5D&pageSize=9&page=page'
    );
  });
});

describe('`getPostParams`', () => {
  it('should return `HttpParams`', () => {
    const res = getPostParams({
      ref: 'ref',
      uid: 'uid'
    });

    expect(res.toString()).toBe(
      'ref=ref&q=%5B%5Bat(my.news.uid,%22uid%22)%5D%5D'
    );
  });
});
