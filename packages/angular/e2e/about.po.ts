import { browser, by, element } from 'protractor';

export class AboutPage {
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
      .element(by.css('h4'));
  }

  getPersonPosition() {
    return this.getPeople()
      .first()
      .element(by.css('span'));
  }

  getJoinTeam() {
    return element(by.id('join'));
  }

  getJoinTeamLink() {
    return this.getJoinTeam().element(by.css('a'));
  }
}
