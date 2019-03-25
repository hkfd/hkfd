import { MetaTags } from 'shared';
import { Career } from 'api';

export const createMetaTags = ({
  title,
  salary,
  id
}: Career): Partial<MetaTags> => ({
  type: 'article',
  title,
  description: salary,
  url: `careers/${id}`
});
