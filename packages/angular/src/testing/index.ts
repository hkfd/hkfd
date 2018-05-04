export * from './api.service.mock';
export * from './prismic.service.mock';
export * from './title.service.mock';
export * from './server.pipe.mock';
export * from './prismic.pipe.mock';
export * from './router';
export * from './native';

import { Generic as GenericData } from './data.generic';
import { Server as ServerData } from './data.server';
import { Prismic as PrismicData } from './data.prismic';

export namespace Data {
  export const Generic = GenericData;
  export const Server = ServerData;
  export const Prismic = PrismicData;
}
