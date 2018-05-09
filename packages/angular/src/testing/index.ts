export * from './api.service.mock';
export * from './prismic.service.mock';
export * from './title.service.mock';
export * from './api.pipe.mock';
export * from './prismic.pipe.mock';
export * from './router';
export * from './native';

import { Generic as GenericData } from './data.generic';
import { Api as ApiData } from './data.api';
import { Prismic as PrismicData } from './data.prismic';

export namespace Data {
  export const Generic = GenericData;
  export const Api = ApiData;
  export const Prismic = PrismicData;
}
