import { environment } from 'environment';
import { PostType } from './api.service';

export const SERVICES = `${environment.api.url}services.json`;
export const CASE_STUDIES = `${environment.api.url}case-studies.json`;

export const getPostUrl = (type: PostType): string => {
  switch (type) {
    case 'service':
      return SERVICES;
    case 'work':
      return CASE_STUDIES;
  }
};
