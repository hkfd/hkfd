import { Banner } from './banner.po';

describe('Banner', () => {
  let page: Banner;

  beforeEach(() => (page = new Banner()));

  it('should not be displayed', () => {
    expect(page.getBanner().isDisplayed()).toBeFalsy();
  });
});
