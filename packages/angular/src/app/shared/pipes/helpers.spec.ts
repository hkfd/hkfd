import { Data } from 'testing';

import {
  isImageInput,
  isVideoInput,
  isAudioInput,
  isArrayInput
} from './helpers';

describe('`isImageInput`', () => {
  it('should return `true` if passed `Api` `ImageBlockData` arg', () => {
    const res = isImageInput(Data.Api.getImageBlockData());

    expect(res).toBe(true);
  });

  it('should return `true` if passed `Prismic` `ImageBlockData` arg', () => {
    const res = isImageInput(Data.Prismic.getImageBlockData());

    expect(res).toBe(true);
  });

  it('should return `false` if passed `Api` `VideoBlockData` arg', () => {
    const res = isImageInput(Data.Api.getVideoBlockData());

    expect(res).toBe(false);
  });

  it('should return `false` if passed `Prismic` `VideoBlockData` arg', () => {
    const res = isImageInput(Data.Prismic.getVideoBlockData());

    expect(res).toBe(false);
  });
});

describe('`isVideoInput`', () => {
  it('should return `true` if passed `Api` `VideoBlockData` arg', () => {
    const res = isVideoInput(Data.Api.getVideoBlockData());

    expect(res).toBe(true);
  });

  it('should return `true` if passed `Prismic` `VideoBlockData` arg', () => {
    const res = isVideoInput(Data.Prismic.getVideoBlockData());

    expect(res).toBe(true);
  });

  it('should return `false` if passed `Api` `ImageBlockData` arg', () => {
    const res = isVideoInput(Data.Api.getImageBlockData());

    expect(res).toBe(false);
  });

  it('should return `false` if passed `Prismic` `ImageBlockData` arg', () => {
    const res = isVideoInput(Data.Prismic.getImageBlockData());

    expect(res).toBe(false);
  });
});

describe('`isAudioInput`', () => {
  it('should return `true` if passed `Api` `AudioBlockData` arg', () => {
    const res = isAudioInput(Data.Api.getAudioBlockData());

    expect(res).toBe(true);
  });

  it('should return `false` if passed `Api` `ImageBlockData` arg', () => {
    const res = isAudioInput(Data.Api.getImageBlockData());

    expect(res).toBe(false);
  });
});

describe('`isArrayInput`', () => {
  it('should return `true` if passed `Api` `DuoBlockData` arg', () => {
    const res = isArrayInput(Data.Api.getDuoBlockData());

    expect(res).toBe(true);
  });

  it('should return `true` if passed `Prismic` `DuoBlockData` arg', () => {
    const res = isArrayInput(Data.Prismic.getDuoBlockData());

    expect(res).toBe(true);
  });

  it('should return `true` if passed `Api` `GalleryBlockData` arg', () => {
    const res = isArrayInput(Data.Api.getGalleryBlockData());

    expect(res).toBe(true);
  });

  it('should return `true` if passed `Prismic` `GalleryBlockData` arg', () => {
    const res = isArrayInput(Data.Prismic.getGalleryBlockData());

    expect(res).toBe(true);
  });

  it('should return `false` if passed `Api` `ImageBlockData` arg', () => {
    const res = isArrayInput(Data.Api.getImageBlockData());

    expect(res).toBe(false);
  });

  it('should return `false` if passed `Prismic` `ImageBlockData` arg', () => {
    const res = isArrayInput(Data.Prismic.getImageBlockData());

    expect(res).toBe(false);
  });
});
