import { Image } from './image.po';

describe('Image', () => {
  let page: Image;

  beforeEach(() => {
    page = new Image();
    page.navigateTo();
  });

  it('should be present', () => {
    expect(
      page
        .getImages()
        .first()
        .isPresent()
    ).toBe(true);
  });

  it('should display image img', () => {
    expect(
      page
        .getImgs()
        .first()
        .isDisplayed()
    ).toBe(true);
  });

  describe('Lazyload', () => {
    it('should have loaded first img', () => {
      expect(
        page
          .getImgs()
          .first()
          .getAttribute('srcset')
      ).toBeTruthy();
    });

    it('should not have loaded last img', () => {
      expect(
        page
          .getImgs()
          .last()
          .getAttribute('srcset')
      ).toBeFalsy();
    });
  });
});
