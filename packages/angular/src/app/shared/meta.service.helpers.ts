import { environment } from 'environment';
import { MetaTags } from 'shared';

export const createTitle = ({ title }: Partial<MetaTags>): string =>
  `Heckford${title ? ` – ${title}` : ''}`;

export const createMetaTags = ({
  type = 'website',
  title = 'Heckford',
  description = 'Independent advertising & marketing agency',
  image = `${environment.deployUrl}assets/heckford.png`,
  url = ''
}: Partial<MetaTags>): MetaTags => ({
  type,
  title,
  description,
  image,
  url: `${environment.deployUrl}${url}`
});
