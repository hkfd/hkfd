import { HttpParams } from '@angular/common/http';

import { RefResponse } from './prismic';

export const getMasterRef = ({ refs }: RefResponse): string => {
  const masterRef = refs.find(({ isMasterRef }) => isMasterRef);
  if (!masterRef) throw new Error('No `masterRef`');

  return masterRef.ref;
};

export const getPostsParams = ({
  ref,
  page
}: {
  ref: string;
  page: string;
}): HttpParams =>
  new HttpParams()
    .append('ref', ref)
    .append('q', '[[at(document.type,"news")]]')
    .append('orderings', '[document.first_publication_date desc]')
    .append('pageSize', '9')
    .append('page', page);

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
