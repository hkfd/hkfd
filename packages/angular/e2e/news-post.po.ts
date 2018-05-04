import { browser, by, element } from 'protractor';

export class NewsPostPage {
  sleep(time: number = 500) {
    return browser.sleep(time);
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  navigateTo() {
    return browser
      .get('/news/how-to-build-an-online-campaign')
      .then(_ => this.sleep());
  }

  getPostDate() {
    return element(by.id('info-date')).getText();
  }

  getPostTitle() {
    return element(by.css('h1')).getText();
  }

  getPostThumbnail() {
    return element.all(by.css('image-component')).first();
  }
}
