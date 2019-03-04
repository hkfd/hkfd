import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

const removeImgTransform = () => {
  const css = `div[_ngcontent-c5], img[_ngcontent-c5] {
    -webkit-transform: none !important;
    transform: none !important;
    -webkit-transition: none !important;
    transition: none !important;
  }`;
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');

  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
};

export class SliderWork {
  constructor() {
    this.navigateTo();
    browser.driver.executeScript(removeImgTransform);
  }

  isVisible(el: ElementFinder) {
    const isVisible = ExpectedConditions.visibilityOf(el);
    return browser.wait(isVisible, 3000);
  }

  isNotVisible(el: ElementFinder) {
    const isNotVisible = ExpectedConditions.invisibilityOf(el);
    return browser.wait(isNotVisible, 3000);
  }

  isClickable(el: ElementFinder) {
    const isClickable = ExpectedConditions.elementToBeClickable(el);
    return browser.wait(isClickable, 10000);
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  scrollTo(el: ElementFinder) {
    return browser
      .actions()
      .mouseMove(el)
      .perform();
  }

  navigateTo() {
    return browser
      .get('/')
      .then(() => this.isVisible(this.getSlider()))
      .then(_ => this.scrollTo(this.getSlider()));
  }

  getSlider() {
    return element(by.css('slider-work'));
  }

  getSliderPrevArrow() {
    return this.getSlider().element(by.css('.slider-prev'));
  }

  getSliderNextArrow() {
    return this.getSlider().element(by.css('.slider-next'));
  }

  getSlides() {
    return this.getSlider().all(by.css('.slide'));
  }

  getActiveSlide() {
    return this.getSlides()
      .filter(el => el.isDisplayed())
      .last();
  }

  getSliderImage() {
    return this.getActiveSlide().element(by.css('image-component'));
  }

  getSlideTitle() {
    return this.getActiveSlide().element(by.css('.info-meta a'));
  }

  getSlideSector() {
    return this.getActiveSlide().element(by.css('.info-meta span'));
  }

  getSlideLink() {
    return this.getActiveSlide().element(by.css('.button'));
  }
}
