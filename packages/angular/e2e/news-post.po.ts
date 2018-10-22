import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class NewsPostPage {
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

  getUrl() {
    return browser.getCurrentUrl();
  }

  getTitle() {
    return browser.getTitle();
  }

  navigateTo() {
    const el = this.getNewsPost();

    return browser
      .get('/news')
      .then(() => this.isClickable(el))
      .then(() => el.click())
      .then(_ => this.isVisible(this.getPostDate()));
  }

  private getNewsPost() {
    return element.all(by.css('.post')).last();
  }

  getPost() {
    return element(by.css('app-news-post'));
  }

  getPostDate() {
    return this.getPost().element(by.css('#info-date'));
  }

  getPostTitle() {
    return this.getPost().element(by.css('h1'));
  }

  getPostThumbnail() {
    return this.getPost()
      .all(by.css('img'))
      .first();
  }
}
