import { browser, by, element } from 'protractor';

export class CareersPage {
  getUrl() {
    return browser.getCurrentUrl();
  }

  navigateTo() {
    return browser.get('/careers');
  }

  getPageTitle() {
    return element(by.css('h1')).getText();
  }

  getIntroImage() {
    return element.all(by.css('image')).first();
  }

  getCareers() {
    return element.all(by.css('.career'));
  }

  getCareerTitle() {
    return this.getCareers()
      .first()
      .getText();
  }

  getCareerImage() {
    return this.getCareers()
      .first()
      .element(by.css('image'));
  }
}
