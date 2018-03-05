import { browser, by, element } from 'protractor';

export class HeaderPage {
  getUrl() {
    return browser.getCurrentUrl();
  }

  navigateTo(url: string = '/') {
    return browser.get(url);
  }

  getLinks() {
    return element(by.css('nav')).all(by.css('a'));
  }

  getLinkTitle() {
    return this.getLinks()
      .get(1)
      .getText();
  }

  setMobile() {
    return browser.driver
      .manage()
      .window()
      .setSize(200, 200);
  }

  sleep() {
    return browser.sleep(500);
  }

  getToggle() {
    return element(by.css('nav')).element(by.css('button'));
  }

  getNavLinks() {
    return element(by.id('nav-links'));
  }
}
