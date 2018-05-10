import { protractor, browser, by, element, ElementFinder } from 'protractor';

export class NewsPostPage {
  isVisible(el: ElementFinder = this.getPostDate()) {
    const isVisible = protractor.ExpectedConditions.visibilityOf(el);
    return browser.wait(isVisible, 3000);
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  navigateTo() {
    return browser
      .get('/news/how-to-build-an-online-campaign')
      .then(_ => this.isVisible());
  }

  getPostDate() {
    return element(by.id('info-date'));
  }

  getPostTitle() {
    return element(by.css('h1')).getText();
  }

  getPostThumbnail() {
    return element.all(by.css('image-component')).first();
  }
}
