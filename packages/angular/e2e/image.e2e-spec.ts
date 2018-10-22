import { Image } from './image.po';

describe('Image', () => {
  let page: Image;

  beforeEach(() => (page = new Image()));

  it('should display img', () => {
    expect(
      page
        .getImagesImg()
        .first()
        .isDisplayed()
    ).toBeTruthy();
  });

  describe('Lazyload', () => {
    it('should load visible img', () => {
      expect(
        page
          .getImagesImg()
          .first()
          .getAttribute('srcset')
      ).toBeTruthy();
    });

    it('should not load not visible img', () => {
      expect(
        page
          .getImagesImg()
          .last()
          .getAttribute('srcset')
      ).toBeFalsy();
    });

    it('should load not visible img when it becomes visible', () => {
      page.scrollTo(page.getImages().last()).then(_ =>
        expect(
          page
            .getImagesImg()
            .last()
            .getAttribute('srcset')
        ).toBeTruthy()
      );
    });
  });
});
