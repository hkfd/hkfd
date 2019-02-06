import { Pipe, PipeTransform } from '@angular/core';

import { Image as GenericImage, Video as GenericVideo } from 'generic';
import {
  Image as PrismicImage,
  Video as PrismicVideo,
  ImageBlockData,
  DuoBlockData,
  GalleryBlockData,
  VideoBlockData
} from 'prismic';
import {
  isImageInput,
  isVideoInput,
  isArrayInput,
  PipeReturn
} from './helpers';

export type PrismicPipeInput =
  | ImageBlockData
  | DuoBlockData
  | GalleryBlockData
  | VideoBlockData;

@Pipe({
  name: 'prismic'
})
export class PrismicPipe implements PipeTransform {
  private transformImage(image: PrismicImage): GenericImage {
    return {
      src: image.proxy.url,
      srcset: {
        attr: 'srcset',
        val: [
          `${image.xs.url} ${image.xs.dimensions.width - 400}w`,
          `${image.sm.url} ${image.sm.dimensions.width - 400}w`,
          `${image.md.url} ${image.md.dimensions.width - 400}w`,
          `${image.lg.url} ${image.lg.dimensions.width - 400}w`,
          `${image.url} ${image.dimensions.width - 400}w`
        ]
      },
      alt: image.alt || ''
    };
  }

  private transformVideo({ url }: PrismicVideo): GenericVideo {
    return {
      src: {
        attr: 'src',
        val: [url]
      }
    };
  }

  transform<T extends PrismicPipeInput>(val: T): PipeReturn<T> {
    if (isImageInput<ImageBlockData>(val)) {
      return this.transformImage(val.image) as PipeReturn<T>;
    }
    if (isVideoInput<VideoBlockData>(val)) {
      return this.transformVideo(val.video) as PipeReturn<T>;
    }
    if (isArrayInput<DuoBlockData | GalleryBlockData>(val)) {
      return val.map(({ image }) => this.transformImage(image)) as PipeReturn<
        T
      >;
    }

    throw new Error('Unknown type');
  }
}
