import { MetaTags } from 'shared';

export const createTitle = ({ title }: Partial<MetaTags>): string =>
  `Heckford${title ? ` – ${title}` : ''}`;
