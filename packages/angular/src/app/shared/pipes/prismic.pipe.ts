import { Pipe, PipeTransform } from '@angular/core';

import {
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
import {
  transformImage,
  transformVideo,
  transformArray
} from './prismic.helpers';

export type PrismicPipeInput =
  | ImageBlockData
  | DuoBlockData
  | GalleryBlockData
  | VideoBlockData;

@Pipe({
  name: 'prismic'
})
export class PrismicPipe implements PipeTransform {
  transform<T extends PrismicPipeInput>(val: T): PipeReturn<T> {
    if (isImageInput<ImageBlockData>(val)) {
      return transformImage(val.image) as PipeReturn<T>;
    }
    if (isVideoInput<VideoBlockData>(val)) {
      return transformVideo(val.video) as PipeReturn<T>;
    }
    if (isArrayInput<DuoBlockData | GalleryBlockData>(val)) {
      return transformArray(val) as PipeReturn<T>;
    }

    throw new Error('Unknown type');
  }
}
