import { Data } from 'testing';

import { Image, Video } from 'generic';
import * as PrismicHelpers from './prismic.helpers';
import {
  transformImage,
  transformVideo,
  transformArray
} from './prismic.helpers';

jest.spyOn(PrismicHelpers, 'transformImage');

describe('`transformImage`', () => {
  let res: Image;

  beforeEach(() => (res = transformImage(Data.Prismic.getImage())));

  describe('`src`', () => {
    it('should be set', () => {
      expect(res.src).toBeDefined();
    });

    it('should be set as `proxy.url`', () => {
      expect(res.src).toBe(Data.Prismic.getImage().proxy.url);
    });
  });

  it('should set `srcset`', () => {
    expect(res.srcset).toBe(`image-xs -399w,
  image-sm -399w,
  image-md -399w,
  image-lg -399w,
  image -399w`);
  });

  describe('`alt`', () => {
    it('should be set`', () => {
      expect(res.alt).toBeDefined();
    });

    it('should set as `alt` if `alt`', () => {
      res = transformImage({ ...Data.Prismic.getImage(), alt: 'Alt' });

      expect(res.alt).toBe('Alt');
    });

    it('should set as `` if no `alt`', () => {
      res = transformImage({ ...Data.Prismic.getImage(), alt: undefined });

      expect(res.alt).toBe('');
    });
  });
});

describe('`transformVideo`', () => {
  let res: Video;

  beforeEach(() => (res = transformVideo(Data.Prismic.getVideo())));

  it('should set `src`', () => {
    expect(res.src).toBe(Data.Prismic.getVideo().url);
  });
});

describe('`transformArray`', () => {
  let res: Image[];

  beforeEach(() => (res = transformArray(Data.Prismic.getDuoBlockData())));

  it('should call `transformImage` with mapped `image` arg', () => {
    expect(transformImage).toHaveBeenCalledWith(
      Data.Prismic.getDuoBlockData()[0].image
    );
    expect(transformImage).toHaveBeenCalledWith(
      Data.Prismic.getDuoBlockData()[1].image
    );
  });
});
