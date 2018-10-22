import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class WorkPage {
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
      .get('/work')
      .then(_ => this.isVisible(this.getCaseStudies().last()));
  }

  getPageTitle() {
    return element(by.css('h1'));
  }

  getCaseStudies() {
    return element.all(by.css('.case-study'));
  }

  getCaseStudy() {
    return this.getCaseStudies().first();
  }

  getCaseStudyTitle() {
    return this.getCaseStudy().element(by.css('h2'));
  }

  getCaseStudyThumbnail() {
    return this.getCaseStudy().element(by.css('img'));
  }
}
