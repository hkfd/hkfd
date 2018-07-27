import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class PostPage {
  isVisible(el: ElementFinder = this.getPageTitle()) {
    const isVisible = ExpectedConditions.visibilityOf(el);
    return browser.wait(isVisible, 5000);
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  navigateTo(url: string = '/work/tomy') {
    return browser.get(url).then(_ => this.isVisible());
  }

  getPageTitle() {
    return element(by.css('h1'));
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
      .last()
      .element(by.css('h2'))
      .getText();
  }
}
