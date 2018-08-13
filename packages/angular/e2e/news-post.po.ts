import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class NewsPostPage {
  isVisible(el: ElementFinder = this.getPostDate()) {
    const isVisible = ExpectedConditions.visibilityOf(el);
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

  getTitle() {
    return browser.getTitle();
  }

  getMetaTagTitle() {
    return browser.driver
      .findElement(by.xpath("//meta[@property='og:title']"))
      .getAttribute('content');
  }

  getPostDate() {
    return element(by.id('info-date'));
  }

  getPostTitle() {
    return element(by.css('h1'));
  }

  getPostThumbnail() {
    return element.all(by.css('image-component')).first();
  }
}
