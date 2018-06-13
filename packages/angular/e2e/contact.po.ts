import { browser, by, element } from 'protractor';

export class ContactPage {
  constructor() {
    browser.waitForAngularEnabled(false);
  }

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
    return element(by.id('page-intro'))
      .all(by.css('a'))
      .first();
  }

  getContactForm() {
    return element(by.css('app-form'));
  }

  getContactImage() {
    return element(by.css('image-component'));
  }
}
