import { Data } from 'testing';
import { ApiPipe, Sizes } from './api.pipe';

import { environment } from 'environment';

let pipe: ApiPipe;

describe('ApiPipe', () => {
  beforeEach(() => (pipe = new ApiPipe()));

  it('should create pipe', () => {
    expect(pipe).toBeTruthy();
  });

  describe('`transform`', () => {
    it('should return `Generic.Image` if passed `image` arg', () => {
      const res = pipe.transform({ image: {} });

      expect(Data.Generic.isImage(res)).toBeTruthy();
    });

    it('should return `Generic.Video` if passed `video` arg', () => {
      const res = pipe.transform({ video: {} });

      expect(Data.Generic.isVideo(res)).toBeTruthy();
    });

    it('should return `Generic.Audio` if passed `audio` arg', () => {
      const res = pipe.transform({ audio: {} });

      expect(Data.Generic.isAudio(res)).toBeTruthy();
    });

    it('should return `Generic.Image` array if passed `[]` arg', () => {
      const [res] = pipe.transform([{ image: {} }]);

      expect(Data.Generic.isImage(res)).toBeTruthy();
    });

    it('should throw error by default', () => {
      expect(() => pipe.transform({ test: 'test' })).toThrowError(
        'Unknown type'
      );
    });
  });

  describe('`transformImage`', () => {
    let res: any;

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
    let res: any;

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
    let res: any;

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
