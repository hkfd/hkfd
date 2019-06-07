import { HttpParams } from '@angular/common/http';

import { RefResponse, PostTypes } from './prismic';

export const getMasterRef = ({ refs }: RefResponse): string => {
  const masterRef = refs.find(({ isMasterRef }) => isMasterRef);
  if (!masterRef) throw new Error('No `masterRef`');

  return masterRef.ref;
};

export const getPostsParams = ({
  type,
  ref,
  page
}: {
  type: PostTypes;
  ref: string;
  page?: string;
}): HttpParams =>
  new HttpParams()
    .append('ref', ref)
    .append('q', `[[at(document.type,"${type}")]]`)
    .append('orderings', '[document.first_publication_date desc]')
    .append('pageSize', type === 'news' ? '9' : '99')
    .append('page', page ? page : '1');

export const getPostParams = ({
  type,
  ref,
  uid
}: {
  type: 'news' | 'career';
  ref: string;
  uid: string;
}): HttpParams =>
  new HttpParams()
    .append('ref', ref)
    .append('q', `[[at(my.${type}.uid,"${uid}")]]`);
