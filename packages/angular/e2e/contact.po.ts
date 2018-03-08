import { browser, by, element } from 'protractor';

export class ContactPage {
  getUrl() {
    return browser.getCurrentUrl();
  }

  navigateTo() {
    return browser.get('/contact');
  }

  getPageTitle() {
    return element(by.css('h1')).getText();
  }

  getTelLink() {
    return element(by.id('intro'))
      .all(by.css('a'))
      .first();
  }

  getEmailLink() {
    return element(by.css('.button'));
  }

  getContactImage() {
    return element(by.css('image'));
  }
}
