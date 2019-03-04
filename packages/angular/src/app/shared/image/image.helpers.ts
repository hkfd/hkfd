import { Image } from 'generic';
import { PlaceholderImg, FullImg } from './image.component';

export const createPlaceholderImg = ({ src, alt }: Image): PlaceholderImg => ({
  state: 'loading-placeholder',
  src,
  alt
});

export const createFullImg = ({ src, srcset, alt }: Image): FullImg => ({
  state: 'loading-full',
  src,
  srcset,
  alt
});
