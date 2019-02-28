import { Image as GenericImage, Video as GenericVideo } from 'generic';
import {
  Image as PrismicImage,
  Video as PrismicVideo,
  DuoBlockData,
  GalleryBlockData
} from 'prismic';

export const transformImage = (image: PrismicImage): GenericImage => ({
  src: image.proxy.url,
  srcset: `${image.xs.url} ${image.xs.dimensions.width - 400}w,
  ${image.sm.url} ${image.sm.dimensions.width - 400}w,
  ${image.md.url} ${image.md.dimensions.width - 400}w,
  ${image.lg.url} ${image.lg.dimensions.width - 400}w,
  ${image.url} ${image.dimensions.width - 400}w`,
  alt: image.alt || ''
});

export const transformVideo = ({ url: src }: PrismicVideo): GenericVideo => ({
  src
});

export const transformArray = (
  val: DuoBlockData | GalleryBlockData
): GenericImage[] => val.map(({ image }) => transformImage(image));
