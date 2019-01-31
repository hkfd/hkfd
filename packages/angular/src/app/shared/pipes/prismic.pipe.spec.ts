import { Data } from 'testing';
import { PrismicPipe } from './prismic.pipe';

let pipe: PrismicPipe;

describe('PrismicPipe', () => {
  beforeEach(() => (pipe = new PrismicPipe()));

  it('should create pipe', () => {
    expect(pipe).toBeTruthy();
  });

  describe('`transform`', () => {
    it('should return `Generic.Image` if passed `image` arg', () => {
      const res = pipe.transform({
        image: {
          proxy: {},
          xs: { dimensions: {} },
          sm: { dimensions: {} },
          md: { dimensions: {} },
          lg: { dimensions: {} },
          dimensions: {}
        }
      });

      expect(Data.Generic.isImage(res)).toBeTruthy();
    });

    it('should return `Generic.Video` if passed `video` arg', () => {
      const res = pipe.transform({ video: {} });

      expect(Data.Generic.isVideo(res)).toBeTruthy();
    });

    it('should return `Generic.Image` array if passed `[]` arg', () => {
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
      ]);

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
    let res: any;

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
