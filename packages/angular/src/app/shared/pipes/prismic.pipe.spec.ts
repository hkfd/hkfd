import { Data } from 'testing';
import { PrismicPipe } from './prismic.pipe';
import { ImageBlockData, GalleryBlockData, VideoBlockData } from 'prismic';
import * as Helpers from './helpers';
import { isImageInput, isVideoInput } from './helpers';
import * as PrismicHelpers from './prismic.helpers';
import {
  transformImage,
  transformVideo,
  transformArray
} from './prismic.helpers';

let pipe: PrismicPipe;

jest.spyOn(Helpers, 'isImageInput');
jest.spyOn(Helpers, 'isVideoInput');
jest.spyOn(Helpers, 'isArrayInput');
jest.spyOn(PrismicHelpers, 'transformImage');
jest.spyOn(PrismicHelpers, 'transformVideo');
jest.spyOn(PrismicHelpers, 'transformArray');

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

      it('should call `transformImage` with `val.image` arg', () => {
        pipe.transform(Data.Prismic.getImageBlockData());

        expect(transformImage).toHaveBeenCalledWith(
          Data.Prismic.getImageBlockData().image
        );
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

      it('should call `transformVideo` with `val.video` arg', () => {
        pipe.transform(Data.Prismic.getVideoBlockData());

        expect(transformVideo).toHaveBeenCalledWith(
          Data.Prismic.getVideoBlockData().video
        );
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

      it('should call `transformArray` with `val` arg', () => {
        pipe.transform(Data.Prismic.getGalleryBlockData());

        expect(transformArray).toHaveBeenCalledWith(
          Data.Prismic.getGalleryBlockData()
        );
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
});
