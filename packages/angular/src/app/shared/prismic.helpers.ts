import { HttpParams } from '@angular/common/http';

import { RefResponse } from './prismic';

export const POST_PAGE_SIZE = 9;

export const getNewPageSize = (
  firstLoad: boolean,
  currentPage: number
): number => (firstLoad ? currentPage * POST_PAGE_SIZE : POST_PAGE_SIZE);

export const getNewPage = (firstLoad: boolean, currentPage: number): number =>
  firstLoad ? 1 : currentPage;

export const getMasterRef = ({ refs }: RefResponse): string => {
  const masterRef = refs.find(({ isMasterRef }) => isMasterRef);
  if (!masterRef) throw new Error('No `masterRef`');

  return masterRef.ref;
};

export const getPostsParams = ({
  ref,
  firstLoad,
  postPage
}: {
  ref: string;
  firstLoad: boolean;
  postPage: number;
}): HttpParams =>
  new HttpParams()
    .append('ref', ref)
    .append('q', '[[at(document.type,"news")]]')
    .append('orderings', '[document.first_publication_date desc]')
    .append('pageSize', `${getNewPageSize(firstLoad, postPage)}`)
    .append('page', `${getNewPage(firstLoad, postPage)}`);

export const getPostParams = ({
  ref,
  uid
}: {
  ref: string;
  uid: string;
}): HttpParams =>
  new HttpParams()
    .append('ref', ref)
    .append('q', `[[at(my.news.uid,"${uid}")]]`);
