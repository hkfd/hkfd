import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class Footer {
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
    return browser.get('/').then(_ => this.isVisible(this.getFooter()));
  }

  getFooter() {
    return element(by.css('footer'));
  }

  getCTA() {
    return this.getFooter().element(by.css('#cta'));
  }

  getFooterFooter() {
    return this.getFooter().element(by.css('#footer'));
  }

  getFooterFooterTitle() {
    return this.getFooterFooter().element(by.css('h4'));
  }

  getFooterFooterLocations() {
    return this.getFooterFooter().all(by.css('.location'));
  }

  getLocationTitles() {
    return this.getFooterFooter().all(by.css('.location h5'));
  }

  getLocationTels() {
    return this.getFooterFooter().all(by.css('.location a:first-of-type'));
  }

  getLocationEmails() {
    return this.getFooterFooter().all(by.css('.location a:last-of-type'));
  }

  getLocationAddresses() {
    return this.getFooterFooter().all(by.css('.location address'));
  }

  getLegal() {
    return this.getFooterFooter().element(by.css('small'));
  }

  getLegalLinks() {
    return this.getFooterFooter().all(by.css('small a'));
  }

  getSocialLinks() {
    return this.getFooterFooter().all(by.css('.social-link a'));
  }

  getSocialLink() {
    return this.getSocialLinks().first();
  }
}
