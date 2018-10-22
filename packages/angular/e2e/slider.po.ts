import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class Slider {
  constructor() {
    this.navigateTo();
  }

  isVisible(el: ElementFinder) {
    const isVisible = ExpectedConditions.visibilityOf(el);
    return browser.wait(isVisible, 3000);
  }

  isClickable(el: ElementFinder) {
    const isClickable = ExpectedConditions.elementToBeClickable(el);
    return browser.wait(isClickable, 3000);
  }

  moveMouse(el: ElementFinder) {
    return browser
      .actions()
      .mouseMove(el)
      .perform();
  }

  navigateTo() {
    return browser.get('/').then(_ => this.isVisible(this.getSlider()));
  }

  getHeader() {
    return element(by.css('header'));
  }

  getSlider() {
    return element(by.css('slider'));
  }

  getSliderPrevArrow() {
    return this.getSlider().element(by.css('.slider-prev'));
  }

  getSliderNextArrow() {
    return this.getSlider().element(by.css('.slider-next'));
  }

  getSliderImages() {
    return this.getSlider().all(by.css('image-component'));
  }
}
