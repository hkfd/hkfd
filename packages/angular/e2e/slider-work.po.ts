import { browser, by, element } from 'protractor';

export class SliderWork {
  navigateTo() {
    return browser.get('/');
  }

  getSlider() {
    return element(by.css('slider-work'));
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

  getTitle() {
    return this.getSlider()
      .all(by.css('.info-meta'))
      .first()
      .element(by.css('a'));
  }

  getSector() {
    return this.getSlider()
      .all(by.css('.info-meta'))
      .first()
      .element(by.css('span'));
  }

  getLink() {
    return this.getSlider()
      .all(by.css('.button'))
      .first();
  }
}
