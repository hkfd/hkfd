import { Pipe, PipeTransform } from '@angular/core';

import { environment } from 'environment';
import {
  Image as GenericImage,
  Video as GenericVideo,
  Audio as GenericAudio
} from 'generic';
import {
  Image as ApiImage,
  Video as ApiVideo,
  Audio as ApiAudio,
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

export const Sizes = [
  { width: 550, height: 300 },
  { width: 800, height: 533 },
  { width: 1200, height: 800 },
  { width: 1800, height: 1200 },
  { width: 2400, height: 1600 }
];

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
  private transformImage({ name, alt }: ApiImage): GenericImage {
    return {
      src: `https://res.cloudinary.com/${
        environment.cloudinaryName
      }/image/upload/w_64,h_ih,c_limit,q_auto,f_auto/${name}`,
      srcset: {
        attr: 'srcset',
        val: Sizes.map(
          ({ width, height }) =>
            `https://res.cloudinary.com/${
              environment.cloudinaryName
            }/image/upload/w_${width},h_${height},c_limit,q_auto,f_auto/${name} ${width -
              400}w`
        )
      },
      alt
    };
  }

  private transformVideo({ id }: ApiVideo): GenericVideo {
    return {
      src: {
        attr: 'src',
        val: [`https://www.youtube.com/embed/${id}?&origin=https://hkfd.co.uk`]
      }
    };
  }

  private transformAudio({ url }: ApiAudio): GenericAudio {
    return {
      url
    };
  }

  transform<T extends ApiPipeInput>(val: T): PipeReturn<T> {
    if (isImageInput<ImageBlockData>(val)) {
      return this.transformImage(val.image) as PipeReturn<T>;
    }
    if (isVideoInput<VideoBlockData>(val)) {
      return this.transformVideo(val.video) as PipeReturn<T>;
    }
    if (isAudioInput<AudioBlockData>(val)) {
      return this.transformAudio(val.audio) as PipeReturn<T>;
    }
    if (isArrayInput<DuoBlockData | GalleryBlockData>(val)) {
      return val.map(({ image }) => this.transformImage(image)) as PipeReturn<
        T
      >;
    }

    throw new Error('Unknown type');
  }
}
