import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class SliderWork {
  isVisible(el: ElementFinder = this.getSlider()) {
    const isVisible = ExpectedConditions.visibilityOf(el);
    return browser.wait(isVisible, 3000);
  }

  navigateTo() {
    return browser.get('/').then(_ => this.isVisible());
  }

  getSlider() {
    return element(by.css('slider-work'));
  }

  getImages() {
    return this.getSlider().all(by.css('image-component'));
  }

  getPrevArrow() {
    return this.getSlider().element(by.css('.slider-prev'));
  }

  getNextArrow() {
    return this.getSlider().element(by.css('.slider-next'));
  }

  getTitle() {
    return this.getSlider()
      .all(by.css('.info-meta'))
      .first()
      .element(by.css('a'));
  }

  getSector() {
    return this.getSlider()
      .all(by.css('.info-meta'))
      .first()
      .element(by.css('span'));
  }

  getLink() {
    return this.getSlider()
      .all(by.css('.button'))
      .first();
  }
}
