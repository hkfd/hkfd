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

export class Slider {
  constructor() {
    this.navigateTo();
    browser.driver.executeScript(removeImgTransform);
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
