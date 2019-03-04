import { Data } from 'testing';

import { createPlaceholderImg, createFullImg } from './image.helpers';

describe('`createPlaceholderImg`', () => {
  it('should return `PlaceholderImg`', () => {
    const res = createPlaceholderImg(Data.Generic.getImage());

    expect(res).toEqual({
      state: 'loading-placeholder',
      src: Data.Generic.getImage().src,
      alt: Data.Generic.getImage().alt
    });
  });
});

describe('`createFullImg`', () => {
  it('should return `FullImg`', () => {
    const res = createFullImg(Data.Generic.getImage());

    expect(res).toEqual({
      state: 'loading-full',
      src: Data.Generic.getImage().src,
      srcset: Data.Generic.getImage().srcset,
      alt: Data.Generic.getImage().alt
    });
  });
});
