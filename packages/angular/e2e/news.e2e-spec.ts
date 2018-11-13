import { NewsPage } from './news.po';

describe('News', () => {
  let page: NewsPage;

  beforeEach(() => (page = new NewsPage()));

  it('should display title', () => {
    expect(page.getTitle()).toBe('Heckford – News');
  });

  it('should display page title', () => {
    expect(page.getPageTitle().getText()).toBeTruthy();
  });

  describe('Posts', () => {
    it('should have 9 initial posts', () => {
      expect(page.getPosts().count()).toBe(9);
    });

    describe('Post', () => {
      it('should be displayed', () => {
        expect(page.getPost().isDisplayed()).toBeTruthy();
      });

      it('should display thumbnail', () => {
        expect(page.getPostThumbnail().isDisplayed()).toBeTruthy();
      });

      it('should display date', () => {
        expect(page.getPostDate().getText()).toBeTruthy();
      });

      it('should display title', () => {
        expect(page.getPostTitle().getText()).toBeTruthy();
      });

      it('should route to post on click', () => {
        const el = page.getPost();

        page
          .isClickable(el)
          .then(() => el.click())
          .then(() => page.isNotVisible(el))
          .then(_ => expect(page.getUrl()).toContain('/news/'));
      });
    });

    describe('Load More', () => {
      it('should be displayed', () => {
        expect(page.getLoadMoreButton().isDisplayed()).toBeTruthy();
      });

      it('should load more posts on click', () => {
        const el = page.getLoadMoreButton();

        page
          .isClickable(el)
          .then(() => el.click())
          .then(() => page.hasLoadedPosts())
          .then(_ => expect(page.getPosts().count()).toBeGreaterThan(9));
      });

      it('should retain initial posts on route', () => {
        const el = page.getPost();

        page
          .isClickable(el)
          .then(() => el.click())
          .then(() => page.isNotVisible(el))
          .then(() => page.navigateBack())
          .then(() => page.isVisible(page.getPosts().last()))
          .then(_ => expect(page.getPosts().count()).toBe(9));
      });

      it('should retain loaded posts on route', () => {
        const postEl = page.getPost();
        const buttonEl = page.getLoadMoreButton();

        page
          .isClickable(buttonEl)
          .then(() => buttonEl.click())
          .then(() => page.hasLoadedPosts())
          .then(() => page.isClickable(postEl))
          .then(() => postEl.click())
          .then(() => page.isNotVisible(postEl))
          .then(() => page.navigateBack())
          .then(() => page.isVisible(page.getPosts().last()))
          .then(_ => expect(page.getPosts().count()).toBeGreaterThan(9));
      });
    });
  });
});
