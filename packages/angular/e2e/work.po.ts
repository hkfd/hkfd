import { browser, by, element } from 'protractor';

export class WorkPage {
  sleep(time: number = 500) {
    return browser.sleep(time);
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  navigateTo() {
    return browser.get('/work');
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
