import { Image } from 'generic';

export const createPlaceholderImg = ({ src, alt }: Image): Partial<Image> => ({
  src,
  alt
});
