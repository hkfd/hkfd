import { RichText } from 'prismic-dom';

import { Data } from 'testing';
import { PrismicTextPipe } from './prismic-text.pipe';

let pipe: PrismicTextPipe;

jest.mock('./prismic-text.helpers', () => ({
  linkResolver: 'linkResolver'
}));

jest.spyOn(RichText, 'asText');
jest.spyOn(RichText, 'asHtml');

describe('PrismicTextPipe', () => {
  beforeEach(() => (pipe = new PrismicTextPipe()));

  it('should create pipe', () => {
    expect(pipe).toBeTruthy();
  });

  describe('`transform`', () => {
    describe('`type` is `asText`', () => {
      it('should call `RichText` `asText` with `val` arg', () => {
        (RichText.asText as jest.Mock).mockReturnValueOnce('');
        pipe.transform('val', 'asText');

        expect(RichText.asText).toHaveBeenCalledWith('val');
      });

      it('should return `RichText` `asText`', () => {
        const res = pipe.transform(Data.Prismic.getText(), 'asText');

        expect(res).toBe('This is a sentence. This is a bold sentence.');
      });
    });

    describe('`type` is `asHtml`', () => {
      it('should call `RichText` `asHtml` with `val` and `linkResolver` args', () => {
        (RichText.asHtml as jest.Mock).mockReturnValueOnce('');
        pipe.transform('val', 'asHtml');

        expect(RichText.asHtml).toHaveBeenCalledWith('val', 'linkResolver');
      });

      it('should return `RichText` `asHtml`', () => {
        const res = pipe.transform(Data.Prismic.getText(), 'asHtml');

        expect(res).toBe(
          '<p>This is a sentence.</p><p><strong>This is a bold sentence.</strong></p>'
        );
      });
    });

    describe('`type` is unknown', () => {
      it('should throw error', () => {
        const res = () => pipe.transform('val', 'unknown' as any);

        expect(res).toThrowError('Unsupported `type`');
      });
    });
  });
});
