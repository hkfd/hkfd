import { ApiPipeInput } from './api.pipe';
import { PrismicPipeInput } from './prismic.pipe';
import {
  Image as GenericImage,
  Video as GenericVideo,
  Audio as GenericAudio
} from 'generic';
import {
  ImageBlockData as ApiImageBlockData,
  VideoBlockData as ApiVideoBlockData,
  AudioBlockData as ApiAudioBlockData
} from 'api';
import {
  ImageBlockData as PrismicImageBlockData,
  VideoBlockData as PrismicVideoBlockData
} from 'prismic';

export type PipeReturn<T> = T extends ApiImageBlockData | PrismicImageBlockData
  ? GenericImage
  : T extends ApiVideoBlockData | PrismicVideoBlockData
  ? GenericVideo
  : T extends ApiAudioBlockData
  ? GenericAudio
  : T extends ApiImageBlockData[] | PrismicImageBlockData[]
  ? GenericImage[]
  : never;

export const isImageInput = <
  T extends ApiImageBlockData | PrismicImageBlockData
>(
  val: ApiPipeInput | PrismicPipeInput
): val is T => val.hasOwnProperty('image');

export const isVideoInput = <
  T extends ApiVideoBlockData | PrismicVideoBlockData
>(
  val: ApiPipeInput | PrismicPipeInput
): val is T => val.hasOwnProperty('video');

export const isAudioInput = <T extends ApiAudioBlockData>(
  val: ApiPipeInput
): val is T => val.hasOwnProperty('audio');

export const isArrayInput = <
  T extends ApiImageBlockData[] | PrismicImageBlockData[]
>(
  val: ApiPipeInput | PrismicPipeInput
): val is T => Array.isArray(val);
