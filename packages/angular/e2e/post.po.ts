import { browser, by, element } from 'protractor';

export class PostPage {
  getUrl() {
    return browser.getCurrentUrl();
  }

  navigateTo(url: string = '/work/tomy') {
    return browser.get(url);
  }

  getPageTitle() {
    return element(by.css('h1')).getText();
  }

  getPageIntro() {
    return element(by.id('info-text'))
      .all(by.css('p'))
      .first()
      .getText();
  }

  getOverview() {
    return element(by.id('info-overview'));
  }

  getOverviewTitle() {
    return this.getOverview()
      .element(by.css('span'))
      .getText();
  }

  getOverviewList() {
    return this.getOverview().all(by.css('li'));
  }

  getSections() {
    return element.all(by.css('section'));
  }

  getSectionTitle() {
    return this.getSections()
      .get(1)
      .element(by.css('h2'))
      .getText();
  }
}
