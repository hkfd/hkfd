import {
  browser,
  by,
  element,
  ElementFinder,
  ExpectedConditions
} from 'protractor';

export class PostPage {
  constructor(url?: string) {
    url ? browser.get(url) : this.navigateTo('/work/wainhomes');
  }

  isVisible(el: ElementFinder) {
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

  getTitle() {
    return browser.getTitle();
  }

  navigateTo(url: string) {
    return browser.get(url).then(_ => this.isVisible(this.getPageIntro()));
  }

  getPost() {
    return element(by.css('app-post'));
  }

  getError() {
    return this.getPost().element(by.css('error'));
  }

  getErrorLink() {
    return this.getPost().element(by.css('a'));
  }

  getPageTitle() {
    return element(by.css('h1'));
  }

  getPageIntro() {
    return element(by.css('#text-intro'));
  }

  getOverview() {
    return element(by.css('#info-overview'));
  }

  getOverviewTitle() {
    return this.getOverview().element(by.css('span'));
  }

  getOverviewList() {
    return this.getOverview().all(by.css('li'));
  }

  getSections() {
    return element.all(by.css('section'));
  }

  getSection() {
    return this.getSections().last();
  }

  getSectionTitle() {
    return this.getSection().element(by.css('h2'));
  }
}
