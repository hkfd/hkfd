import { Data } from '../../../testing';
import { ServerPipe, Sizes } from './server.pipe';

let pipe: ServerPipe;

describe('ServerPipe', () => {
  beforeEach(() => (pipe = new ServerPipe()));

  it('should create an instance', () => expect(pipe).toBeTruthy());

  describe('transform', () => {
    it('should call transformImage if image', () => {
      const res = pipe.transform({ image: Data.Server.image });

      expect(res).toEqual({
        src: jasmine.anything(),
        srcset: jasmine.anything(),
        alt: jasmine.anything()
      });
    });

    it('should call transformVideo if video', () => {
      const res = pipe.transform({ video: Data.Server.video });

      expect(res).toEqual({
        src: { attr: jasmine.anything(), val: jasmine.anything() }
      });
    });

    it('should call transformAudio if audio', () => {
      const res = pipe.transform({ audio: Data.Server.audio });

      expect(res).toEqual({ url: jasmine.anything() });
    });

    it('should call map transformImage by default', () => {
      const res = pipe.transform([{ image: Data.Server.image }]);

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
    it('should set src', () => {
      const res = pipe.transform({ image: Data.Server.image });

      expect(res.src).toBeDefined();
    });

    it('should set src with env cloudinaryName', () => {
      const res = pipe.transform({ image: Data.Server.image });

      expect(res.src).toContain('https://res.cloudinary.com/abc/');
    });

    it('should set src with width as 64', () => {
      const res = pipe.transform({ image: Data.Server.image });

      expect(res.src).toContain('w_64');
    });

    it('should set src with image name', () => {
      const res = pipe.transform({ image: Data.Server.image });

      expect(res.src).toContain(Data.Server.image.name);
    });

    it('should set srcset', () => {
      const res = pipe.transform({ image: Data.Server.image });

      expect(res.srcset).toBeDefined();
    });

    it(`should set srcset attr as 'srcset'`, () => {
      const res = pipe.transform({ image: Data.Server.image });

      expect(res.srcset.attr).toBe('srcset');
    });

    it('should set srcset val with env cloudinaryName', () => {
      const res = pipe.transform({ image: Data.Server.image });

      Sizes.forEach((_, i) =>
        expect(res.srcset.val[i]).toContain('https://res.cloudinary.com/abc/')
      );
    });

    it('should set srcset val with Sizes width', () => {
      const res = pipe.transform({ image: Data.Server.image });

      Sizes.forEach((size, i) =>
        expect(res.srcset.val[i]).toContain(`w_${size.width}`)
      );
    });

    it('should set srcset val with Sizes height', () => {
      const res = pipe.transform({ image: Data.Server.image });

      Sizes.forEach((size, i) =>
        expect(res.srcset.val[i]).toContain(`h_${size.height}`)
      );
    });

    it('should set srcset val with image name', () => {
      const res = pipe.transform({ image: Data.Server.image });

      Sizes.forEach((_, i) =>
        expect(res.srcset.val[i]).toContain(Data.Server.image.name)
      );
    });

    it('should set alt', () => {
      const res = pipe.transform({ image: Data.Server.image });

      expect(res.alt).toBe(Data.Server.image.alt);
    });
  });

  describe('transformVideo', () => {
    it('should set src', () => {
      const res = pipe.transform({ video: Data.Server.video });

      expect(res.src).toBeDefined();
    });

    it(`should set src attr as 'src'`, () => {
      const res = pipe.transform({ video: Data.Server.video });

      expect(res.src.attr).toBe('src');
    });

    it('should set src val with video id', () => {
      const res = pipe.transform({ video: Data.Server.video });

      expect(res.src.val.join()).toContain(
        `https://www.youtube.com/embed/${Data.Server.video.id}`
      );
    });
  });

  describe('transformAudio', () => {
    it('should set url as audio url', () => {
      const res = pipe.transform({ audio: Data.Server.audio });

      expect(res.url).toBe(Data.Server.audio.url);
    });
  });
});
