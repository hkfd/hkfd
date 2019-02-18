import { PostType } from 'shared';

export const isKnownPostType = (type: string): type is PostType =>
  type === 'service' || type === 'work';
