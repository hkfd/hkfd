import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class ContactPage {
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
    return browser
      .get('/contact')
      .then(_ => this.isVisible(this.getContactForm()));
  }

  getPageTitle() {
    return element(by.css('h1'));
  }

  getTelLink() {
    return element(by.id('page-intro')).element(by.css('a'));
  }

  getContactForm() {
    return element(by.css('app-form'));
  }

  getContactImage() {
    return element(by.css('#contact-image image-component img'));
  }
}
