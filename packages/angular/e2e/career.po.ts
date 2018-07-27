import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class CareerPage {
  isVisible(el: ElementFinder = this.getPageTitle()) {
    const isVisible = ExpectedConditions.visibilityOf(el);
    return browser.wait(isVisible, 5000);
  }

  isClickable(el: ElementFinder) {
    const isClickable = ExpectedConditions.elementToBeClickable(el);
    return browser.wait(isClickable, 3000);
  }

  navigateTo() {
    return browser
      .get('/careers')
      .then(() => this.isClickable(this.getCareers().last()))
      .then(() =>
        this.getCareers()
          .last()
          .click()
      )
      .then(_ => this.isVisible());
  }

  getCareers() {
    return element.all(by.css('.career'));
  }

  getPageTitle() {
    return element(by.css('app-career h1'));
  }

  getSections() {
    return element.all(by.css('app-career section'));
  }

  getSectionTitle() {
    return this.getSections()
      .get(-1)
      .element(by.css('h2'))
      .getText();
  }

  getBenefitsTitle() {
    return this.getSections()
      .last()
      .element(by.css('h2'))
      .getText();
  }

  getApplyButton() {
    return element(by.css('app-career a'));
  }
}
