import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class AboutPage {
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

  scrollTo(el: ElementFinder) {
    return browser
      .actions()
      .mouseMove(el)
      .perform();
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  getTitle() {
    return browser.getTitle();
  }

  navigateTo() {
    return browser
      .get('/about')
      .then(_ => this.isVisible(this.getPeople().first()));
  }

  getPageTitle() {
    return element(by.css('h1'));
  }

  getIntroImage() {
    return element(by.id('intro-image'));
  }

  getPeople() {
    return element.all(by.css('.person'));
  }

  getPerson() {
    return this.getPeople().first();
  }

  getPersonImage() {
    return this.getPerson().element(by.css('image-component'));
  }

  getPersonName() {
    return this.getPerson().element(by.css('h4'));
  }

  getPersonPosition() {
    return this.getPerson().element(by.css('span'));
  }
}
