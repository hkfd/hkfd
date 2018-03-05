import { browser, by, element } from 'protractor';

export class Image {
  navigateTo() {
    return browser.get('/work');
  }

  getImages() {
    return element.all(by.css('image'));
  }

  getImgs() {
    return this.getImages().all(by.css('img'));
  }
}
