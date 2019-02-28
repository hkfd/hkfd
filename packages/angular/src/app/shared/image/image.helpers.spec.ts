import { Data } from 'testing';

import { createPlaceholderImg } from './image.helpers';

describe('`createPlaceholderImg`', () => {
  it('should return partial `Image`', () => {
    const res = createPlaceholderImg(Data.Generic.getImage());

    expect(res).toEqual({
      src: Data.Generic.getImage().src,
      alt: Data.Generic.getImage().alt
    });
  });
});
