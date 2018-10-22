import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class Header {
  constructor() {
    this.navigateTo('/');
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

  setWindowSize(width = 800, height = 600) {
    return browser.driver
      .manage()
      .window()
      .setSize(width, height);
  }

  navigateTo(url: string) {
    return browser
      .get(url)
      .then(_ => this.isVisible(this.getPageLinks().last()));
  }

  getHeader() {
    return element(by.css('header'));
  }

  getHomeLink() {
    return this.getHeader().element(by.css('#nav-logo'));
  }

  getPageLinks() {
    return this.getHeader().all(by.css('#nav-links a'));
  }

  getPageLink() {
    return this.getPageLinks().first();
  }

  getNavToggle() {
    return this.getHeader().element(by.css('#nav-button'));
  }
}
