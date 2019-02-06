import { Data } from 'testing';
import { PrismicPipe } from './prismic.pipe';
import { Image, Video } from 'generic';
import { ImageBlockData, GalleryBlockData, VideoBlockData } from 'prismic';
import * as Helpers from './helpers';
import { isImageInput, isVideoInput } from './helpers';

let pipe: PrismicPipe;

jest.spyOn(Helpers, 'isImageInput');
jest.spyOn(Helpers, 'isVideoInput');
jest.spyOn(Helpers, 'isArrayInput');

describe('PrismicPipe', () => {
  beforeEach(() => (pipe = new PrismicPipe()));

  it('should create pipe', () => {
    expect(pipe).toBeTruthy();
  });

  describe('`transform`', () => {
    describe('Image', () => {
      it('should call `isImageInput` with `val` arg', () => {
        const data = {
          image: {
            proxy: {},
            xs: { dimensions: {} },
            sm: { dimensions: {} },
            md: { dimensions: {} },
            lg: { dimensions: {} },
            dimensions: {}
          }
        };

        pipe.transform(data as ImageBlockData);

        expect(isImageInput).toHaveBeenCalledWith(data);
      });

      it('should return `Generic.Image`', () => {
        const res = pipe.transform({
          image: {
            proxy: {},
            xs: { dimensions: {} },
            sm: { dimensions: {} },
            md: { dimensions: {} },
            lg: { dimensions: {} },
            dimensions: {}
          }
        } as ImageBlockData);

        expect(Data.Generic.isImage(res)).toBeTruthy();
      });
    });

    describe('Video', () => {
      it('should call `isVideoInput` with `val` arg', () => {
        pipe.transform({
          video: {}
        } as VideoBlockData);

        expect(isVideoInput).toHaveBeenCalledWith({ video: {} });
      });

      it('should return `Generic.Video`', () => {
        const res = pipe.transform({ video: {} } as VideoBlockData);

        expect(Data.Generic.isVideo(res)).toBeTruthy();
      });
    });

    describe('Array', () => {
      it('should call `isImageInput` with `val` arg', () => {
        const data = [
          {
            image: {
              proxy: {},
              xs: { dimensions: {} },
              sm: { dimensions: {} },
              md: { dimensions: {} },
              lg: { dimensions: {} },
              dimensions: {}
            }
          }
        ];
        pipe.transform(data as GalleryBlockData);

        expect(isImageInput).toHaveBeenCalledWith(data);
      });

      it('should return `Generic.Image` array', () => {
        const [res] = pipe.transform([
          {
            image: {
              proxy: {},
              xs: { dimensions: {} },
              sm: { dimensions: {} },
              md: { dimensions: {} },
              lg: { dimensions: {} },
              dimensions: {}
            }
          }
        ] as GalleryBlockData);

        expect(Data.Generic.isImage(res)).toBeTruthy();
      });
    });

    it('should throw error by default', () => {
      expect(() => pipe.transform({ test: 'test' } as any)).toThrowError(
        'Unknown type'
      );
    });
  });

  describe('`transformImage`', () => {
    let res: Image;

    beforeEach(
      () => (res = pipe.transform({ image: Data.Prismic.getImage() }))
    );

    describe('`src`', () => {
      it('should be set', () => {
        expect(res.src).toBeDefined();
      });

      it('should be set as `proxy.url`', () => {
        expect(res.src).toBe(Data.Prismic.getImage().proxy.url);
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
          expect(res.srcset.val.length).toBe(5);
        });

        it('should be set with `xs.url`', () => {
          expect(res.srcset.val.join()).toContain(
            Data.Prismic.getImage().xs.url
          );
        });

        it('should be set with `sm.url`', () => {
          expect(res.srcset.val.join()).toContain(
            Data.Prismic.getImage().sm.url
          );
        });

        it('should be set with `md.url`', () => {
          expect(res.srcset.val.join()).toContain(
            Data.Prismic.getImage().md.url
          );
        });

        it('should be set with `lg.url`', () => {
          expect(res.srcset.val.join()).toContain(
            Data.Prismic.getImage().lg.url
          );
        });

        it('should be set with `url`', () => {
          expect(res.srcset.val.join()).toContain(Data.Prismic.getImage().url);
        });
      });
    });

    describe('`alt`', () => {
      it('should be set`', () => {
        expect(res.alt).toBeDefined();
      });

      it('should set as `alt` if `alt`', () => {
        res = pipe.transform({
          image: { ...Data.Prismic.getImage(), alt: 'Alt' }
        });

        expect(res.alt).toBe('Alt');
      });

      it('should set as `` if no `alt`', () => {
        res = pipe.transform({
          image: { ...Data.Prismic.getImage(), alt: undefined }
        });

        expect(res.alt).toBe('');
      });
    });
  });

  describe('`transformVideo`', () => {
    let res: Video;

    beforeEach(
      () => (res = pipe.transform({ video: Data.Prismic.getVideo() }))
    );

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

        it('should be set as `url`', () => {
          const [val] = res.src.val;

          expect(val).toBe(Data.Prismic.getVideo().url);
        });
      });
    });
  });
});
