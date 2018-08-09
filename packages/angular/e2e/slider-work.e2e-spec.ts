import { SliderWork } from './slider-work.po';

describe('SliderWork', () => {
  let page: SliderWork;

  beforeEach(() => {
    page = new SliderWork();
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

  it('should display previous arrow', () => {
    expect(page.getPrevArrow().isDisplayed()).toBe(true);
  });

  it('should display next arrow', () => {
    expect(page.getNextArrow().isDisplayed()).toBe(true);
  });

  xit('should display title', () => {
    expect(page.getTitle().getText()).toBeTruthy();
  });

  xit('should display sector', () => {
    expect(page.getSector().getText()).toBeTruthy();
  });

  it('should have link', () => {
    expect(page.getLink().isPresent()).toBe(true);
  });
});
