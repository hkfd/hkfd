import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class Image {
  isVisible(el: ElementFinder = this.getImages().first()) {
    const isVisible = ExpectedConditions.visibilityOf(el);
    return browser.wait(isVisible, 3000);
  }

  navigateTo() {
    return browser.get('/work').then(_ => this.isVisible());
  }

  getImages() {
    return element.all(by.css('image-component'));
  }

  getImgs() {
    return this.getImages().all(by.css('img'));
  }
}
