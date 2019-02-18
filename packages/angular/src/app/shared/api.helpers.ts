import { CaseStudy } from 'api';
import { environment } from 'environment';
import { Post, PostType } from './api.service';

export const SERVICES = `${environment.api.url}services.json`;
export const CASE_STUDIES = `${environment.api.url}case-studies.json`;

export const isCaseStudy = (post: Post): post is CaseStudy =>
  post.hasOwnProperty('overview');

export const getPostUrl = (type: PostType): string => {
  switch (type) {
    case 'service':
      return SERVICES;
    case 'work':
      return CASE_STUDIES;
  }
};
