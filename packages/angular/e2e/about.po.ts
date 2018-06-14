import { protractor, browser, by, element, ElementFinder } from 'protractor';

export class AboutPage {
  isVisible(el: ElementFinder = this.getPeople().first()) {
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
    return browser.get('/about').then(_ => this.isVisible());
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
