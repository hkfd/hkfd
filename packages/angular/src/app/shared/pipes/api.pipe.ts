import { Pipe, PipeTransform } from '@angular/core';

import {
  ImageBlockData,
  DuoBlockData,
  GalleryBlockData,
  VideoBlockData,
  AudioBlockData
} from 'api';
import {
  isImageInput,
  isVideoInput,
  isAudioInput,
  isArrayInput,
  PipeReturn
} from './helpers';
import {
  transformImage,
  transformVideo,
  transformAudio,
  transformArray
} from './api.helpers';

export type ApiPipeInput =
  | ImageBlockData
  | DuoBlockData
  | GalleryBlockData
  | VideoBlockData
  | AudioBlockData;

@Pipe({
  name: 'api'
})
export class ApiPipe implements PipeTransform {
  transform<T extends ApiPipeInput>(val: T): PipeReturn<T> {
    if (isImageInput<ImageBlockData>(val)) {
      return transformImage(val.image) as PipeReturn<T>;
    }
    if (isVideoInput<VideoBlockData>(val)) {
      return transformVideo(val.video) as PipeReturn<T>;
    }
    if (isAudioInput<AudioBlockData>(val)) {
      return transformAudio(val.audio) as PipeReturn<T>;
    }
    if (isArrayInput<DuoBlockData | GalleryBlockData>(val)) {
      return transformArray(val) as PipeReturn<T>;
    }

    throw new Error('Unknown type');
  }
}
