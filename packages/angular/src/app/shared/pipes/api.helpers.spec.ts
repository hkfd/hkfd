import { Data } from 'testing';

import { environment } from 'environment';
import { Image, Video, Audio } from 'generic';
import * as ApiHelpers from './api.helpers';
import {
  transformImage,
  transformVideo,
  transformAudio,
  transformArray,
  Sizes
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

  describe('`srcset`', () => {
    it('should be set', () => {
      expect(res.srcset).toBeDefined();
    });

    it('should set `attr`', () => {
      expect(res.srcset.attr).toBe('srcset');
    });

    describe('`val`', () => {
      it('should be set', () => {
        expect(res.srcset.val.length).toBe(Sizes.length);
      });

      it('should be set with `environment.cloudinaryName`', () => {
        res.srcset.val.forEach((val: any) =>
          expect(val).toContain(environment.cloudinaryName)
        );
      });

      it('should be set with `name`', () => {
        res.srcset.val.forEach((val: any) =>
          expect(val).toContain(Data.Api.getImage().name)
        );
      });

      it('should be set with `Sizes` `width`', () => {
        Sizes.forEach((size, i) =>
          expect(res.srcset.val[i]).toContain(`w_${size.width}`)
        );
      });

      it('should be set with `Sizes` `height`', () => {
        Sizes.forEach((size, i) =>
          expect(res.srcset.val[i]).toContain(`h_${size.height}`)
        );
      });
    });

    it('should set `alt`', () => {
      expect(res.alt).toBeDefined();
    });

    it('should set `alt` as `alt`', () => {
      expect(res.alt).toBe(Data.Api.getImage().alt);
    });
  });
});

describe('`transformVideo`', () => {
  let res: Video;

  beforeEach(() => (res = transformVideo(Data.Api.getVideo())));

  describe('`src`', () => {
    it('should be set', () => {
      expect(res.src).toBeDefined();
    });

    it('should set `attr`', () => {
      expect(res.src.attr).toBe('src');
    });

    describe('`val`', () => {
      it('should be set', () => {
        expect(res.src.val).toBeDefined();
      });

      it('should be set with `id`', () => {
        const [val] = res.src.val;

        expect(val).toContain(Data.Api.getVideo().id);
      });
    });
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
