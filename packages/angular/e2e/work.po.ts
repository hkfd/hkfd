import { protractor, browser, by, element, ElementFinder } from 'protractor';

export class WorkPage {
  isVisible(el: ElementFinder = this.getCaseStudies().first()) {
    const isVisible = protractor.ExpectedConditions.visibilityOf(el);
    return browser.wait(isVisible, 3000);
  }

  isClickable(el: ElementFinder) {
    const isClickable = protractor.ExpectedConditions.elementToBeClickable(el);
    return browser.wait(isClickable, 3000);
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  navigateTo() {
    return browser.get('/work').then(_ => this.isVisible());
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
