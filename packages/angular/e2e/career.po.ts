import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class CareerPage {
  constructor(url?: string) {
    url ? browser.get(url) : this.navigateTo();
  }

  isVisible(el: ElementFinder) {
    const isVisible = ExpectedConditions.visibilityOf(el);
    return browser.wait(isVisible, 5000);
  }

  isClickable(el: ElementFinder) {
    const isClickable = ExpectedConditions.elementToBeClickable(el);
    return browser.wait(isClickable, 3000);
  }

  getTitle() {
    return browser.getTitle();
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  navigateTo() {
    const el = this.getCareers().last();

    return browser
      .get('/careers')
      .then(() => this.isClickable(el))
      .then(() => el.click())
      .then(_ => this.isVisible(this.getPageTitle()));
  }

  private getCareers() {
    return element.all(by.css('.career'));
  }

  getCareer() {
    return element(by.css('app-career'));
  }

  getError() {
    return this.getCareer().element(by.css('error'));
  }

  getErrorLink() {
    return this.getError().element(by.css('a'));
  }

  getPageTitle() {
    return this.getCareer().element(by.css('h1'));
  }

  getSections() {
    return this.getCareer().all(by.css('section'));
  }

  getSection() {
    return this.getSections().get(-1);
  }

  getSectionTitle() {
    return this.getSection().element(by.css('h2'));
  }

  getBenefitsSection() {
    return this.getSections().last();
  }

  getBenefitsSectionTitle() {
    return this.getBenefitsSection().element(by.css('h2'));
  }

  getBenefitsSectionContent() {
    return this.getBenefitsSection()
      .all(by.css('ul li'))
      .first();
  }

  getApplyButton() {
    return this.getCareer().element(by.css('a'));
  }
}
