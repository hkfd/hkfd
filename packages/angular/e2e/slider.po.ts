import { browser, by, element } from 'protractor';

export class Slider {
  sleep(time: number = 500) {
    return browser.sleep(time);
  }

  navigateTo() {
    return browser.get('/');
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
    return this.getSlider().all(by.css('image'));
  }

  getPrevArrow() {
    return this.getSlider().element(by.css('.slider-prev'));
  }

  getNextArrow() {
    return this.getSlider().element(by.css('.slider-next'));
  }
}
