import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class CareersPage {
  isVisible(el: ElementFinder = this.getCareers().first()) {
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

  navigateTo() {
    return browser.get('/careers').then(_ => this.isVisible());
  }

  getTitle() {
    return browser.getTitle();
  }

  getMetaTagTitle() {
    return browser.driver
      .findElement(by.xpath('//meta[@property="og:title"]'))
      .getAttribute('content');
  }

  getPageTitle() {
    return element(by.css('h1')).getText();
  }

  getIntroImage() {
    return element.all(by.css('image-component')).first();
  }

  getCareers() {
    return element.all(by.css('.career'));
  }

  getCareerTitle() {
    return this.getCareers()
      .last()
      .getText();
  }

  getCareerSalary() {
    return this.getCareers()
      .last()
      .element(by.css('span'))
      .getText();
  }

  getCareersImage() {
    return element(by.id('careers')).element(by.css('image-component'));
  }
}
