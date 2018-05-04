import { Data } from '../../../testing';
import { PrismicPipe } from './prismic.pipe';

let pipe: PrismicPipe;

describe('PrismicPipe', () => {
  beforeEach(() => (pipe = new PrismicPipe()));

  it('should create an instance', () => expect(pipe).toBeTruthy());

  describe('transform', () => {
    it('should call transformImage if image', () => {
      const res = pipe.transform({ image: Data.Prismic.image });

      expect(res).toEqual({
        src: jasmine.anything(),
        srcset: jasmine.anything(),
        alt: jasmine.anything()
      });
    });

    it('should call transformVideo if video', () => {
      const res = pipe.transform({ video: Data.Prismic.video });

      expect(res).toEqual({
        src: { attr: jasmine.anything(), val: jasmine.anything() }
      });
    });

    it('should call map transformImage by default', () => {
      const res = pipe.transform([{ image: Data.Prismic.image }]);

      expect(res).toEqual([
        {
          src: jasmine.anything(),
          srcset: jasmine.anything(),
          alt: jasmine.anything()
        }
      ]);
    });
  });

  describe('transformImage', () => {
    it('should set proxy url as src', () => {
      const res = pipe.transform({ image: Data.Prismic.image });

      expect(res.src).toBe(Data.Prismic.image.proxy.url);
    });

    it('should set srcset', () => {
      const res = pipe.transform({ image: Data.Prismic.image });

      expect(res.srcset).toBeDefined();
    });

    it(`should set srcset attr as 'srcset'`, () => {
      const res = pipe.transform({ image: Data.Prismic.image });

      expect(res.srcset.attr).toBe('srcset');
    });

    it('should set srcset val as image url array', () => {
      const res = pipe.transform({ image: Data.Prismic.image });

      expect(res.srcset.val.join()).toContain(Data.Prismic.image.xs.url);
      expect(res.srcset.val.join()).toContain(Data.Prismic.image.sm.url);
      expect(res.srcset.val.join()).toContain(Data.Prismic.image.md.url);
      expect(res.srcset.val.join()).toContain(Data.Prismic.image.lg.url);
      expect(res.srcset.val.join()).toContain(Data.Prismic.image.url);
    });

    it('should set alt', () => {
      const res = pipe.transform({ image: Data.Prismic.image });

      expect(res.alt).toBe(Data.Prismic.image.alt);
    });
  });

  describe('transformVideo', () => {
    it('should set src', () => {
      const res = pipe.transform({ video: Data.Prismic.video });

      expect(res.src).toBeDefined();
    });

    it(`should set src attr as 'src'`, () => {
      const res = pipe.transform({ video: Data.Prismic.video });

      expect(res.src.attr).toBe('src');
    });

    it('should set src val as video url ', () => {
      const res = pipe.transform({ video: Data.Prismic.video });

      expect(res.src.val).toEqual([Data.Prismic.video.url]);
    });
  });
});
