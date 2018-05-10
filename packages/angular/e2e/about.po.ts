import { protractor, browser, by, element, ElementFinder } from 'protractor';

export class AboutPage {
  isClickable(el: ElementFinder) {
    const isClickable = protractor.ExpectedConditions.elementToBeClickable(el);
    return browser.wait(isClickable, 3000);
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  navigateTo() {
    return browser.get('/about');
  }

  getPageTitle() {
    return element(by.css('h1')).getText();
  }

  getIntroImage() {
    return element(by.id('intro-image'));
  }

  getPeople() {
    return element.all(by.css('.person'));
  }

  getPersonImage() {
    return this.getPeople()
      .first()
      .element(by.css('img'));
  }

  getPersonName() {
    return this.getPeople()
      .first()
      .element(by.css('h4'))
      .getText();
  }

  getPersonPosition() {
    return this.getPeople()
      .first()
      .element(by.css('span'))
      .getText();
  }
}
