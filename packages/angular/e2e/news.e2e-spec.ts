import { NewsPage } from './news.po';

describe('News', () => {
  let page: NewsPage;

  beforeEach(() => {
    page = new NewsPage();
    page.navigateTo();
  });

  it('should display title', () => {
    expect(page.getPageTitle()).toBeTruthy();
  });

  describe('Posts', () => {
    it('should have post', () => {
      expect(
        page
          .getPosts()
          .first()
          .isPresent()
      ).toBe(true);
    });

    it('should display post', () => {
      expect(
        page
          .getPosts()
          .first()
          .isDisplayed()
      ).toBe(true);
    });

    it('should have more than 1 post', () => {
      expect(page.getPosts().count()).toBeGreaterThan(1);
    });

    it('should display post image', () => {
      expect(page.getPostImage().isDisplayed()).toBe(true);
    });

    it('should display post date', () => {
      expect(page.getPostDate()).toBeTruthy();
    });

    it('should display post title', () => {
      expect(page.getPostTitle()).toBeTruthy();
    });

    it('should display uppercase post title', () => {
      page.getPostTitle().then(title => {
        expect(title).toEqual(title.toUpperCase());
      });
    });

    it('should route on click', () => {
      const originalUrl = page.getUrl();
      page.sleep();

      page
        .getPosts()
        .first()
        .click()
        .then(_ => page.sleep())
        .then(_ => expect(page.getUrl()).not.toBe(originalUrl));
    });
  });

  it('should have 9 initial posts', () => {
    expect(page.getPosts().count()).toBe(9);
  });

  it('should display load more button', () => {
    expect(page.getLoadMoreButton().isDisplayed()).toBe(true);
  });

  it('should load more posts on button click', () => {
    page.sleep();

    page
      .getLoadMoreButton()
      .click()
      .then(_ => page.sleep())
      .then(_ => expect(page.getPosts().count()).toBeGreaterThan(9));
  });
});
