import { Data } from 'testing';

import { environment } from 'environment';
import { Image, Video, Audio } from 'generic';
import * as ApiHelpers from './api.helpers';
import {
  transformImage,
  transformVideo,
  transformAudio,
  transformArray
} from './api.helpers';

jest.spyOn(ApiHelpers, 'transformImage');

describe('`transformImage`', () => {
  let res: Image;

  beforeEach(() => (res = transformImage(Data.Api.getImage())));

  describe('`src`', () => {
    it('should be set', () => {
      expect(res.src).toBeDefined();
    });

    it('should be set with `environment.cloudinaryName`', () => {
      expect(res.src).toContain(environment.cloudinaryName);
    });

    it('should be set with `name`', () => {
      expect(res.src).toContain(Data.Api.getImage().name);
    });
  });

  it('should set `srcset`', () => {
    expect(res.srcset).toContain(
      'https://res.cloudinary.com/dv8oeiozq/image/upload/w_550,h_300,c_limit,q_auto,f_auto/image 150w,'
    );
    expect(res.srcset).toContain(
      'https://res.cloudinary.com/dv8oeiozq/image/upload/w_800,h_533,c_limit,q_auto,f_auto/image 400w,'
    );
    expect(res.srcset).toContain(
      'https://res.cloudinary.com/dv8oeiozq/image/upload/w_1200,h_800,c_limit,q_auto,f_auto/image 800w,'
    );
    expect(res.srcset).toContain(
      'https://res.cloudinary.com/dv8oeiozq/image/upload/w_1800,h_1200,c_limit,q_auto,f_auto/image 1400w,'
    );
    expect(res.srcset).toContain(
      'https://res.cloudinary.com/dv8oeiozq/image/upload/w_2400,h_1600,c_limit,q_auto,f_auto/image 2000w'
    );
  });

  it('should set `alt`', () => {
    expect(res.alt).toBeDefined();
  });

  it('should set `alt` as `alt`', () => {
    expect(res.alt).toBe(Data.Api.getImage().alt);
  });
});

describe('`transformVideo`', () => {
  let res: Video;

  beforeEach(() => (res = transformVideo(Data.Api.getVideo())));

  it('should set src', () => {
    expect(res.src).toBe(
      'https://www.youtube.com/embed/123?&origin=https://hkfd.co.uk'
    );
  });
});

describe('`transformAudio`', () => {
  let res: Audio;

  beforeEach(() => (res = transformAudio(Data.Api.getAudio())));

  describe('`url`', () => {
    it('should be set', () => {
      expect(res.url).toBeDefined();
    });

    it('should be set as `url`', () => {
      expect(res.url).toBe(Data.Api.getAudio().url);
    });
  });
});

describe('`transformArray`', () => {
  let res: Image[];

  beforeEach(() => (res = transformArray(Data.Api.getDuoBlockData())));

  it('should call `transformImage` with mapped `image` arg', () => {
    expect(transformImage).toHaveBeenCalledWith(
      Data.Api.getDuoBlockData()[0].image
    );
    expect(transformImage).toHaveBeenCalledWith(
      Data.Api.getDuoBlockData()[1].image
    );
  });
});
