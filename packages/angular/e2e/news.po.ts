import { protractor, browser, by, element, ElementFinder } from 'protractor';

export class NewsPage {
  isClickable(el: ElementFinder) {
    const isClickable = protractor.ExpectedConditions.elementToBeClickable(el);
    return browser.wait(isClickable, 3000);
  }

  isVisible(el: ElementFinder) {
    const isVisible = protractor.ExpectedConditions.visibilityOf(el);
    return browser.wait(isVisible, 3000);
  }

  isNotVisible(el: ElementFinder = this.getPosts().first()) {
    const isNotVisible = protractor.ExpectedConditions.invisibilityOf(el);
    return browser.wait(isNotVisible, 3000);
  }

  hasLoadedPosts() {
    const hasLoadedPosts = () =>
      this.getPosts().then(posts => posts.length > 9);

    return browser.wait(hasLoadedPosts, 5000);
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  navigateTo() {
    return browser
      .get('/news')
      .then(_ => this.isVisible(this.getPosts().first()));
  }

  getPageTitle() {
    return element(by.css('h1')).getText();
  }

  getPosts() {
    return element.all(by.css('.post'));
  }

  getPostImage() {
    return this.getPosts()
      .first()
      .element(by.css('image-component'));
  }

  getPostDate() {
    return this.getPosts()
      .first()
      .element(by.css('.post-date'))
      .getText();
  }

  getPostTitle() {
    return this.getPosts()
      .first()
      .element(by.css('h2'))
      .getText();
  }

  getLoadMoreButton() {
    return element(by.id('load-more'));
  }
}
