import { browser, by, element } from 'protractor';

export class NewsPage {
  sleep(time: number = 500) {
    return browser.sleep(time);
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  navigateTo() {
    return browser.get('/news').then(_ => this.sleep());
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
