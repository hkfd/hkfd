import { Image } from './image.po';

describe('Image', () => {
  let page: Image;

  beforeEach(() => (page = new Image()));

  describe('Visible', () => {
    it('should display img', () => {
      expect(page.getImagesImg(0).isDisplayed()).toBeTruthy();
    });

    it('should display high res img', () => {
      expect(page.getImagesImg(0).getAttribute('srcset')).toBeTruthy();
    });
  });

  describe('Not visible', () => {
    it('should not have img', async () => {
      expect(
        page.getImagesImg((await page.getImages().count()) - 1).isPresent()
      ).toBeFalsy();
    });

    describe('-> visible', () => {
      beforeEach(() => page.scrollTo(page.getImages().last()));

      it('should display img', async () => {
        expect(
          page.getImagesImg((await page.getImages().count()) - 1).isDisplayed()
        ).toBeTruthy();
      });

      it('should display high res img', async () => {
        expect(
          page
            .getImagesImg((await page.getImages().count()) - 1)
            .getAttribute('srcset')
        ).toBeTruthy();
      });
    });
  });
});
