import { Slider } from './slider.po';

describe('Slider', () => {
  let page: Slider;

  beforeEach(() => {
    page = new Slider();
    page.navigateTo();
  });

  it('should be present', () => {
    expect(page.getSlider().isPresent()).toBe(true);
  });

  it('should have image', () => {
    expect(
      page
        .getImages()
        .first()
        .isPresent()
    ).toBe(true);
  });

  it('should have more than 1 image', () => {
    expect(page.getImages().count()).toBeGreaterThan(1);
  });

  it('should display image', () => {
    page.sliderHover();
    expect(
      page
        .getImages()
        .first()
        .isDisplayed()
    ).toBe(true);
  });

  it('should display previous arrow', () => {
    expect(page.getPrevArrow().isDisplayed()).toBe(true);
  });

  it('should display next arrow', () => {
    expect(page.getNextArrow().isDisplayed()).toBe(true);
  });

  it('should pause autoplay on hover', () => {
    expect(
      page
        .getImages()
        .first()
        .isDisplayed()
    ).toBe(true);
    page.sliderHover();

    page.sleep(3000);
    expect(
      page
        .getImages()
        .first()
        .isDisplayed()
    ).toBe(true);
  });

  it('should change image on prev click', () => {
    page.sliderHover();
    expect(
      page
        .getImages()
        .first()
        .isDisplayed()
    ).toBe(true);

    page
      .getPrevArrow()
      .click()
      .then(() => page.sleep())
      .then(_ => {
        expect(
          page
            .getImages()
            .last()
            .isDisplayed()
        ).toBe(true);
      });
  });

  it('should change image on next click', () => {
    page.sliderHover();
    expect(
      page
        .getImages()
        .first()
        .isDisplayed()
    ).toBe(true);

    page
      .getNextArrow()
      .click()
      .then(() => page.sleep())
      .then(_ => {
        expect(
          page
            .getImages()
            .get(1)
            .isDisplayed()
        ).toBe(true);
      });
  });
});
