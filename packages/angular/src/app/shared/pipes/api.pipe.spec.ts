import { Data } from 'testing';
import { ApiPipe } from './api.pipe';
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
import * as ApiHelpers from './api.helpers';
import {
  transformImage,
  transformVideo,
  transformAudio,
  transformArray
} from './api.helpers';

let pipe: ApiPipe;

jest.spyOn(Helpers, 'isImageInput');
jest.spyOn(Helpers, 'isVideoInput');
jest.spyOn(Helpers, 'isAudioInput');
jest.spyOn(Helpers, 'isArrayInput');
jest.spyOn(ApiHelpers, 'transformImage');
jest.spyOn(ApiHelpers, 'transformVideo');
jest.spyOn(ApiHelpers, 'transformAudio');
jest.spyOn(ApiHelpers, 'transformArray');

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

      it('should call `transformImage` with `val.image` arg', () => {
        pipe.transform(Data.Api.getImageBlockData());

        expect(transformImage).toHaveBeenCalledWith(
          Data.Api.getImageBlockData().image
        );
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

      it('should call `transformVideo` with `val.video` arg', () => {
        pipe.transform(Data.Api.getVideoBlockData());

        expect(transformVideo).toHaveBeenCalledWith(
          Data.Api.getVideoBlockData().video
        );
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

      it('should call `transformAudio` with `val.audio` arg', () => {
        pipe.transform(Data.Api.getAudioBlockData());

        expect(transformAudio).toHaveBeenCalledWith(
          Data.Api.getAudioBlockData().audio
        );
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

      it('should call `transformArray` with `val` arg', () => {
        pipe.transform(Data.Api.getGalleryBlockData());

        expect(transformArray).toHaveBeenCalledWith(
          Data.Api.getGalleryBlockData()
        );
      });

      it('should return `Generic.Image` array', () => {
        const [res] = pipe.transform([{ image: {} }] as GalleryBlockData);

        expect(Data.Generic.isImage(res)).toBeTruthy();
      });
    });
  });
});
