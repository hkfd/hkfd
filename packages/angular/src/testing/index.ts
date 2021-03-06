export * from './api.service.mock';
export * from './prismic.service.mock';
export * from './email.service.mock';
export * from './meta.service.mock';
export * from './logger.service.mock';
export * from './notification.service.mock';
export * from './api.pipe.mock';
export * from './prismic.pipe.mock';
export * from './router';
export * from './sanitizer';
export * from './material';
export * from './prismic-text.pipe.mock';

export * from './directives';
export * from './components';

import { Generic as GenericData } from './data.generic';
import { Api as ApiData } from './data.api';
import { Prismic as PrismicData } from './data.prismic';

export namespace Data {
  export const Generic = GenericData;
  export const Api = ApiData;
  export const Prismic = PrismicData;
}
