import { Data } from 'testing';
import { ApiPipe, Sizes } from './api.pipe';
import { Image, Video, Audio } from 'generic';
import {
  ImageBlockData,
  GalleryBlockData,
  VideoBlockData,
  AudioBlockData
} from 'api';
import * as Helpers from './helpers';
import {
  isImageInput,
  isVideoInput,
  isAudioInput,
  isArrayInput
} from './helpers';

import { environment } from 'environment';

let pipe: ApiPipe;

jest.spyOn(Helpers, 'isImageInput');
jest.spyOn(Helpers, 'isVideoInput');
jest.spyOn(Helpers, 'isAudioInput');
jest.spyOn(Helpers, 'isArrayInput');

describe('ApiPipe', () => {
  beforeEach(() => (pipe = new ApiPipe()));

  it('should create pipe', () => {
    expect(pipe).toBeTruthy();
  });

  describe('`transform`', () => {
    it('should throw error by default', () => {
      expect(() => pipe.transform({ test: 'test' } as any)).toThrowError(
        'Unknown type'
      );
    });

    describe('Image', () => {
      it('should call `isImageInput` with `val` arg', () => {
        pipe.transform({ image: {} } as ImageBlockData);

        expect(isImageInput).toHaveBeenCalledWith({ image: {} });
      });

      it('should return `Generic.Image`', () => {
        const res = pipe.transform({ image: {} } as ImageBlockData);

        expect(Data.Generic.isImage(res)).toBeTruthy();
      });
    });

    describe('Video', () => {
      it('should call `isVideoInput` with `val` arg', () => {
        pipe.transform({ video: {} } as VideoBlockData);

        expect(isVideoInput).toHaveBeenCalledWith({ video: {} });
      });

      it('should return `Generic.Video`', () => {
        const res = pipe.transform({ video: {} } as VideoBlockData);

        expect(Data.Generic.isVideo(res)).toBeTruthy();
      });
    });

    describe('Audio', () => {
      it('should call `isAudioInput` with `val` arg', () => {
        pipe.transform({ audio: {} } as AudioBlockData);

        expect(isAudioInput).toHaveBeenCalledWith({ audio: {} });
      });

      it('should return `Generic.Audio`', () => {
        const res = pipe.transform({ audio: {} } as AudioBlockData);

        expect(Data.Generic.isAudio(res)).toBeTruthy();
      });
    });

    describe('Array', () => {
      it('should call `isArrayInput` with `val` arg', () => {
        pipe.transform([{ image: {} }] as GalleryBlockData);

        expect(isArrayInput).toHaveBeenCalledWith([{ image: {} }]);
      });

      it('should return `Generic.Image` array', () => {
        const [res] = pipe.transform([{ image: {} }] as GalleryBlockData);

        expect(Data.Generic.isImage(res)).toBeTruthy();
      });
    });
  });

  describe('`transformImage`', () => {
    let res: Image;

    beforeEach(() => (res = pipe.transform({ image: Data.Api.getImage() })));

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

    beforeEach(() => (res = pipe.transform({ video: Data.Api.getVideo() })));

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

    beforeEach(() => (res = pipe.transform({ audio: Data.Api.getAudio() })));

    describe('`url`', () => {
      it('should be set', () => {
        expect(res.url).toBeDefined();
      });

      it('should be set as `url`', () => {
        expect(res.url).toBe(Data.Api.getAudio().url);
      });
    });
  });
});
