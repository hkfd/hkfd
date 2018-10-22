import { SliderWork } from './slider-work.po';

describe('SliderWork', () => {
  let page: SliderWork;

  beforeEach(() => (page = new SliderWork()));

  it('should be displayed', () => {
    expect(page.getSlider().isDisplayed()).toBeTruthy();
  });

  it('should display previous arrow', () => {
    expect(page.getSliderPrevArrow().isDisplayed()).toBeTruthy();
  });

  it('should display next arrow', () => {
    expect(page.getSliderNextArrow().isDisplayed()).toBeTruthy();
  });

  describe('Slide', () => {
    it('should display image', () => {
      expect(page.getSliderImage().isDisplayed()).toBeTruthy();
    });

    it('should display sector', () => {
      expect(page.getSlideSector().getText()).toBeTruthy();
    });

    describe('Title', () => {
      it('should be displayed', () => {
        expect(page.getSlideTitle().getText()).toBeTruthy();
      });

      it('should route on click', async () => {
        const el = page.getSlideTitle();
        const pageUrl = await page.getSlideLink().getAttribute('href');

        page
          .isClickable(el)
          .then(() => el.click())
          .then(() => page.isNotVisible(page.getSlider()))
          .then(_ => expect(page.getUrl()).toBe(pageUrl));
      });
    });

    describe('Link', () => {
      it('should be displayed', () => {
        expect(page.getSlideLink().isDisplayed()).toBeTruthy();
      });

      it('should route on click', async () => {
        const el = page.getSlideLink();
        const pageUrl = await page.getSlideLink().getAttribute('href');

        page
          .isClickable(el)
          .then(() => el.click())
          .then(() => page.isNotVisible(page.getSlider()))
          .then(_ => expect(page.getUrl()).toBe(pageUrl));
      });
    });
  });
});
