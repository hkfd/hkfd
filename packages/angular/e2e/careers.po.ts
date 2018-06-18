import { protractor, browser, by, element, ElementFinder } from 'protractor';

export class CareersPage {
  isVisible(el: ElementFinder = this.getCareers().first()) {
    const isVisible = protractor.ExpectedConditions.visibilityOf(el);
    return browser.wait(isVisible, 3000);
  }

  isClickable(el: ElementFinder) {
    const isClickable = protractor.ExpectedConditions.elementToBeClickable(el);
    return browser.wait(isClickable, 3000);
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  navigateTo() {
    return browser.get('/careers').then(_ => this.isVisible());
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
