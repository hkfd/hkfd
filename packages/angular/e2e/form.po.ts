import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class Form {
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

  navigateTo() {
    return browser.get('/contact');
  }

  getForm() {
    return element(by.css('app-form'));
  }

  getNameInput() {
    return this.getForm().element(by.id('name'));
  }

  getEmailInput() {
    return this.getForm().element(by.id('email'));
  }

  getMessageInput() {
    return this.getForm().element(by.id('message'));
  }

  getLegalText() {
    return this.getForm().element(by.css('small'));
  }

  getSendButton() {
    return this.getForm().element(by.css('button'));
  }

  getError() {
    return this.getForm().element(by.css('.error'));
  }
}
