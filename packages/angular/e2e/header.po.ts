import { browser, by, element } from 'protractor';

export class Header {
  sleep(time: number = 500) {
    return browser.sleep(time);
  }

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

  setSize(width: number = 800, height: number = 600) {
    return browser.driver
      .manage()
      .window()
      .setSize(width, height);
  }

  getToggle() {
    return element(by.css('nav')).element(by.css('button'));
  }

  getNavLinks() {
    return element(by.id('nav-links'));
  }
}
