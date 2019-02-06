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
        expect(res.srcset.val.join()).toContain(Data.Prismic.getImage().xs.url);
      });

      it('should be set with `sm.url`', () => {
        expect(res.srcset.val.join()).toContain(Data.Prismic.getImage().sm.url);
      });

      it('should be set with `md.url`', () => {
        expect(res.srcset.val.join()).toContain(Data.Prismic.getImage().md.url);
      });

      it('should be set with `lg.url`', () => {
        expect(res.srcset.val.join()).toContain(Data.Prismic.getImage().lg.url);
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
