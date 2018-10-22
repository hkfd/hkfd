import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class Image {
  constructor() {
    this.navigateTo();
  }

  isVisible(el: ElementFinder) {
    const isVisible = ExpectedConditions.visibilityOf(el);
    return browser.wait(isVisible, 3000);
  }

  scrollTo(el: ElementFinder) {
    return browser
      .actions()
      .mouseMove(el)
      .perform();
  }

  navigateTo() {
    return browser
      .get('/work')
      .then(_ => this.isVisible(this.getImages().first()));
  }

  getImages() {
    return element.all(by.css('image-component'));
  }

  getImagesImg() {
    return this.getImages().all(by.css('img'));
  }
}
