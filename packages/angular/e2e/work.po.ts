import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class WorkPage {
  isVisible(el: ElementFinder = this.getCaseStudies().first()) {
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
    return browser.get('/work').then(_ => this.isVisible());
  }

  getTitle() {
    return browser.getTitle();
  }

  getMetaTagTitle() {
    return browser.driver
      .findElement(by.xpath('//meta[@property="og:title"]'))
      .getAttribute('content');
  }

  getPageTitle() {
    return element(by.css('h1')).getText();
  }

  getCaseStudies() {
    return element.all(by.css('.case-study'));
  }

  getCaseStudyTitle() {
    return this.getCaseStudies()
      .first()
      .element(by.css('h2'))
      .getText();
  }

  getCaseStudyImage() {
    return this.getCaseStudies()
      .first()
      .element(by.css('image-component'));
  }
}
