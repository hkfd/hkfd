import { protractor, browser, by, element, ElementFinder } from 'protractor';

export class Slider {
  isVisible(el: ElementFinder = this.getSlider()) {
    const isVisible = protractor.ExpectedConditions.visibilityOf(el);
    return browser.wait(isVisible, 3000);
  }

  sleep(time: number = 500) {
    return browser.sleep(time);
  }

  navigateTo() {
    return browser.get('/').then(_ => this.isVisible());
  }

  getSlider() {
    return element(by.css('slider'));
  }

  sliderHover() {
    return browser
      .actions()
      .mouseMove(this.getSlider())
      .perform();
  }

  getImages() {
    return this.getSlider().all(by.css('image-component'));
  }

  getPrevArrow() {
    return this.getSlider().element(by.css('.slider-prev'));
  }

  getNextArrow() {
    return this.getSlider().element(by.css('.slider-next'));
  }
}
