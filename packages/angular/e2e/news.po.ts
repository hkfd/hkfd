import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class NewsPage {
  constructor() {
    this.navigateTo();
  }

  isVisible(el: ElementFinder) {
    const isVisible = ExpectedConditions.visibilityOf(el);
    return browser.wait(isVisible, 5000);
  }

  isNotVisible(el: ElementFinder) {
    const isNotVisible = ExpectedConditions.invisibilityOf(el);
    return browser.wait(isNotVisible, 5000);
  }

  isClickable(el: ElementFinder) {
    const isClickable = ExpectedConditions.elementToBeClickable(el);
    return browser.wait(isClickable, 5000);
  }

  hasLoadedPosts() {
    const hasLoadedPosts = () =>
      this.getPosts()
        .count()
        .then(count => count > 9);

    return browser.wait(hasLoadedPosts, 5000);
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  getTitle() {
    return browser.getTitle();
  }

  navigateTo() {
    return browser
      .get('/news')
      .then(_ => this.isVisible(this.getPosts().last()));
  }

  getPageTitle() {
    return element(by.css('h1'));
  }

  getPosts() {
    return element.all(by.css('.post'));
  }

  getPost() {
    return this.getPosts().last();
  }

  getPostThumbnail() {
    return this.getPost().element(by.css('img'));
  }

  getPostDate() {
    return this.getPost().element(by.css('.post-date'));
  }

  getPostTitle() {
    return this.getPost().element(by.css('h2'));
  }

  getLoadMoreButton() {
    return element(by.css('#load-more'));
  }
}
