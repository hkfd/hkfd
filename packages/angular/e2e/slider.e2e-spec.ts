import { Slider } from './slider.po';

describe('Slider', () => {
  let page: Slider;

  beforeEach(() => (page = new Slider()));

  it('should be displayed', () => {
    expect(page.getSlider().isDisplayed()).toBeTruthy();
  });

  it('should display first image', () => {
    page.moveMouse(page.getSlider());

    expect(
      page
        .getSliderImages()
        .first()
        .isDisplayed()
    ).toBeTruthy();
  });

  describe('Autoplay', () => {
    it('should scroll to next image automatically', () => {
      const firstImage = page.getSliderImages().get(0);
      const secondImage = page.getSliderImages().get(1);

      page
        .isVisible(firstImage)
        .then(() => expect(page.isVisible(secondImage)))
        .then(isVisible => expect(isVisible).toBeDefined())
        .catch(isNotVisible => expect(isNotVisible).not.toBeDefined());
    });

    it('should pause scrolling if mouse is hovering on slider', () => {
      const firstImage = page.getSliderImages().get(0);
      const secondImage = page.getSliderImages().get(1);

      page
        .moveMouse(page.getSlider())
        .then(() => page.isVisible(firstImage))
        .then(() => expect(page.isVisible(secondImage)))
        .then(isVisible => expect(isVisible).not.toBeDefined())
        .catch(isNotVisible => expect(isNotVisible).toBeDefined());
    });

    it('should pause and resume scrolling if mouse hovers and leaves', () => {
      const firstImage = page.getSliderImages().get(0);
      const secondImage = page.getSliderImages().get(1);
      const thirdImage = page.getSliderImages().get(2);

      page
        .isVisible(firstImage)
        .then(() => expect(page.isVisible(secondImage)))
        .then(() => page.moveMouse(page.getSlider()))
        .then(() => expect(page.isVisible(thirdImage)))
        .then(isVisible => expect(isVisible).not.toBeDefined())
        .catch(isNotVisible => expect(isNotVisible).toBeDefined())
        .then(() => page.moveMouse(page.getHeader()))
        .then(_ => expect(page.isVisible(thirdImage)));
    });

    it('should pause and resume scrolling on next image if mouse hovers, clicks, then leaves', () => {
      const firstImage = page.getSliderImages().get(0);
      const secondImage = page.getSliderImages().get(1);
      const thirdImage = page.getSliderImages().get(2);
      const fourthImage = page.getSliderImages().get(3);
      const el = page.getSliderNextArrow();

      page
        .isVisible(firstImage)
        .then(() => expect(page.isVisible(secondImage)))
        .then(() => page.moveMouse(page.getSlider()))
        .then(() => page.isClickable(el))
        .then(() => el.click())
        .then(() => expect(page.isVisible(thirdImage)))
        .then(() => page.moveMouse(page.getHeader()))
        .then(_ => expect(page.isVisible(fourthImage)));
    });
  });

  describe('Navigation', () => {
    describe('Previous', () => {
      it('should display arrow', () => {
        expect(page.getSliderPrevArrow().isDisplayed()).toBe(true);
      });

      it('should scroll to previous image on click', () => {
        const firstImage = page.getSliderImages().get(0);
        const secondImage = page.getSliderImages().get(1);
        const prevEl = page.getSliderPrevArrow();
        const nextEl = page.getSliderNextArrow();

        page
          .moveMouse(page.getSlider())
          .then(() => page.isVisible(firstImage))
          .then(() => page.isClickable(nextEl))
          .then(() => nextEl.click())
          .then(() => expect(page.isVisible(secondImage)))
          .then(() => page.isClickable(prevEl))
          .then(() => prevEl.click())
          .then(_ => page.isVisible(firstImage));
      });

      it('should scroll to last image on first image click', () => {
        const firstImage = page.getSliderImages().first();
        const lastImage = page.getSliderImages().last();
        const el = page.getSliderPrevArrow();

        page
          .moveMouse(page.getSlider())
          .then(() => page.isVisible(firstImage))
          .then(() => page.isClickable(el))
          .then(() => el.click())
          .then(_ => expect(page.isVisible(lastImage)));
      });
    });

    describe('Next', () => {
      it('should display arrow', () => {
        expect(page.getSliderNextArrow().isDisplayed()).toBe(true);
      });

      it('should scroll to next image on click', () => {
        const firstImage = page.getSliderImages().get(0);
        const secondImage = page.getSliderImages().get(1);
        const el = page.getSliderNextArrow();

        page
          .moveMouse(page.getSlider())
          .then(() => page.isVisible(firstImage))
          .then(() => page.isClickable(el))
          .then(() => el.click())
          .then(_ => expect(page.isVisible(secondImage)));
      });

      it('should scroll to first image on last image click', () => {
        const firstImage = page.getSliderImages().first();
        const buttonEl = page.getSliderNextArrow();

        page
          .moveMouse(page.getSlider())
          .then(() =>
            page
              .getSliderImages()
              .each(_ =>
                page.isClickable(buttonEl).then(() => buttonEl.click())
              )
          )
          .then(_ => expect(page.isVisible(firstImage)));
      });
    });
  });
});
