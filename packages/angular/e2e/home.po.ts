import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class HomePage {
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
      .get('/')
      .then(() => this.isVisible(this.getIntroSlider()))
      .then(() => this.isVisible(this.getServices().first()))
      .then(() => this.isVisible(this.getCaseStudiesSlider()))
      .then(_ => this.isVisible(this.getClients().first()));
  }

  getPageTitle() {
    return element(by.css('h1'));
  }

  getIntroSlider() {
    return element(by.css('slider'));
  }

  getIntroSliderLogo() {
    return this.getIntroSlider().element(by.id('icon-40'));
  }

  getHelpSection() {
    return element(by.css('#help'));
  }

  getHelpSectionTitle() {
    return this.getHelpSection().element(by.css('h2'));
  }

  getHelpSectionLink() {
    return this.getHelpSection().element(by.css('a'));
  }

  getServicesSection() {
    return element(by.css('#services'));
  }

  getServicesSectionTitle() {
    return this.getServicesSection().element(by.css('h2'));
  }

  getServices() {
    return this.getServicesSection().all(by.css('.service'));
  }

  getService() {
    return this.getServices().first();
  }

  getServiceThumbnail() {
    return this.getService().element(by.css('image-component'));
  }

  getServiceTitle() {
    return this.getService().element(by.css('h3'));
  }

  getServiceDescription() {
    return this.getService().element(by.css('p'));
  }

  getCaseStudiesSlider() {
    return element(by.css('slider-work'));
  }

  getClientsSection() {
    return element(by.css('#clients'));
  }

  getClientsSectionTitle() {
    return this.getClientsSection().element(by.css('h2'));
  }

  getClients() {
    return this.getClientsSection().all(by.css('.client'));
  }

  getClient() {
    return this.getClients().first();
  }

  getClientSector() {
    return this.getClient();
  }

  getClientNames() {
    return this.getClient().all(by.css('ul li'));
  }
}
