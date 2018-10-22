import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class CareersPage {
  constructor() {
    this.navigateTo();
  }

  isVisible(el: ElementFinder) {
    const isVisible = ExpectedConditions.visibilityOf(el);
    return browser.wait(isVisible, 3000);
  }

  isNotVisible(el: ElementFinder) {
    const isNotVisible = ExpectedConditions.invisibilityOf(el);
    return browser.wait(isNotVisible, 3000);
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
      .get('/careers')
      .then(_ => this.isVisible(this.getCareers().last()));
  }

  getPageTitle() {
    return element(by.css('h1'));
  }

  getIntroImage() {
    return element.all(by.css('img')).first();
  }

  getCareers() {
    return element.all(by.css('.career'));
  }

  getCareer() {
    return this.getCareers().first();
  }

  getCareerTitle() {
    return this.getCareer().element(by.css('h3'));
  }

  getCareerSalary() {
    return this.getCareer().element(by.css('span'));
  }

  getCareersImage() {
    return element(by.id('careers')).element(by.css('img'));
  }
}
