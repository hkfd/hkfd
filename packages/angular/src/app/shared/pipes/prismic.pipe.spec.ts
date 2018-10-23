import { Data } from 'testing';
import { PrismicPipe } from './prismic.pipe';

let pipe: PrismicPipe;

describe('PrismicPipe', () => {
  beforeEach(() => (pipe = new PrismicPipe()));

  it('should create an instance', () => expect(pipe).toBeTruthy());

  describe('transform', () => {
    it('should call transformImage if image', () => {
      const res = pipe.transform({ image: Data.Prismic.getImage() });

      expect(res).toEqual({
        src: jasmine.anything(),
        srcset: jasmine.anything(),
        alt: jasmine.anything()
      });
    });

    it('should call transformVideo if video', () => {
      const res = pipe.transform({ video: Data.Prismic.getVideo() });

      expect(res).toEqual({
        src: { attr: jasmine.anything(), val: jasmine.anything() }
      });
    });

    it('should call map transformImage if array', () => {
      const res = pipe.transform([{ image: Data.Prismic.getImage() }]);

      expect(res).toEqual([
        {
          src: jasmine.anything(),
          srcset: jasmine.anything(),
          alt: jasmine.anything()
        }
      ]);
    });

    it('should return unchanged input if no compatible structure', () => {
      const res = pipe.transform({ test: 'test' });

      expect(res).toEqual({ test: 'test' });
    });
  });

  describe('transformImage', () => {
    it('should set proxy url as src', () => {
      const res = pipe.transform({ image: Data.Prismic.getImage() });

      expect(res.src).toBe(Data.Prismic.getImage().proxy.url);
    });

    it('should set srcset', () => {
      const res = pipe.transform({ image: Data.Prismic.getImage() });

      expect(res.srcset).toBeDefined();
    });

    it('should set srcset attr as `srcset`', () => {
      const res = pipe.transform({ image: Data.Prismic.getImage() });

      expect(res.srcset.attr).toBe('srcset');
    });

    it('should set srcset val as image url array', () => {
      const res = pipe.transform({ image: Data.Prismic.getImage() });

      expect(res.srcset.val.join()).toContain(Data.Prismic.getImage().xs.url);
      expect(res.srcset.val.join()).toContain(Data.Prismic.getImage().sm.url);
      expect(res.srcset.val.join()).toContain(Data.Prismic.getImage().md.url);
      expect(res.srcset.val.join()).toContain(Data.Prismic.getImage().lg.url);
      expect(res.srcset.val.join()).toContain(Data.Prismic.getImage().url);
    });

    it('should set alt', () => {
      const res = pipe.transform({ image: Data.Prismic.getImage() });

      expect(res.alt).toBe(Data.Prismic.getImage().alt);
    });
  });

  describe('transformVideo', () => {
    it('should set src', () => {
      const res = pipe.transform({ video: Data.Prismic.getVideo() });

      expect(res.src).toBeDefined();
    });

    it('should set src attr as `src`', () => {
      const res = pipe.transform({ video: Data.Prismic.getVideo() });

      expect(res.src.attr).toBe('src');
    });

    it('should set src val as video url', () => {
      const res = pipe.transform({ video: Data.Prismic.getVideo() });

      expect(res.src.val).toEqual([Data.Prismic.getVideo().url]);
    });
  });
});
