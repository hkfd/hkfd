import { browser, by, element } from 'protractor';

export class HomePage {
  getUrl() {
    return browser.getCurrentUrl();
  }

  navigateTo() {
    return browser.get('');
  }

  getPageTitle() {
    return element(by.css('h1')).getText();
  }

  getIntroSlider() {
    return element(by.css('slider'));
  }

  getHelpButton() {
    return element(by.id('help')).element(by.css('a'));
  }

  getServices() {
    return element.all(by.css('.service'));
  }

  getServiceThumbnail() {
    return this.getServices()
      .first()
      .element(by.css('image'));
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
    return element.all(by.css('.client'));
  }
}