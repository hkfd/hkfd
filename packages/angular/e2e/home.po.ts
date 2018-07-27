import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class HomePage {
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

  navigateTo() {
    return browser
      .get('/')
      .then(() => this.isVisible(this.getIntroSlider()))
      .then(() => this.isVisible(this.getServices().first()))
      .then(() => this.isVisible(this.getCaseStudiesSlider()))
      .then(_ => this.isVisible(this.getClients().first()));
  }

  getPageTitle() {
    return element(by.css('h1')).getText();
  }

  getIntroSlider() {
    return element(by.css('slider'));
  }

  getIntroSliderLogo() {
    return element(by.id('icon-40'));
  }

  getHelpButton() {
    return element(by.id('help-container')).element(by.css('a'));
  }

  getServices() {
    return element.all(by.css('.service'));
  }

  getServiceThumbnail() {
    return this.getServices()
      .first()
      .element(by.css('image-component'));
  }

  getServiceTitle() {
    return this.getServices()
      .first()
      .element(by.css('h3'))
      .getText();
  }

  getServiceDescription() {
    return this.getServices()
      .first()
      .element(by.css('p'))
      .getText();
  }

  getCaseStudiesSlider() {
    return element(by.css('slider-work'));
  }

  getClients() {
    return element(by.id('client-list')).all(by.css('.client'));
  }

  getClientSector() {
    return this.getClients();
  }

  getClientNames() {
    return this.getClients()
      .first()
      .element(by.css('ul'))
      .all(by.css('li'));
  }
}
