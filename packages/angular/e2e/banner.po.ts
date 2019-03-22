import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class Banner {
  constructor() {
    this.navigateTo();
  }

  private isVisible(el: ElementFinder) {
    const isVisible = ExpectedConditions.visibilityOf(el);
    return browser.wait(isVisible, 3000);
  }

  navigateTo() {
    return browser.get('/').then(() => this.isVisible(this.getIntroSlider()));
  }

  private getIntroSlider() {
    return element(by.css('slider'));
  }

  getBanner() {
    return element(by.id('banner'));
  }
}
