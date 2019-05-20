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

    it('should load more posts on next page', () => {
      const el = page.getNextButton();

      page
        .isClickable(el)
        .then(() => el.click())
        .then(() => page.hasLoadedPosts());
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

    describe('Navigation', () => {
      it('should display previous and next buttons', () => {
        const prevEl = page.getPrevButton();
        const nextEl = page.getNextButton();

        expect(nextEl.isDisplayed()).toBeTruthy();
        expect(prevEl.isPresent()).toBeFalsy();
        page
          .isClickable(nextEl)
          .then(() => nextEl.click())
          .then(() => page.hasLoadedPosts())
          .then(() =>
            expect(page.getUrl()).toBe('http://localhost:4000/news/page/2')
          )
          .then(() => expect(prevEl.isDisplayed()).toBeTruthy())
          .then(() => expect(nextEl.isPresent()).toBeFalsy())
          .then(() => page.isClickable(prevEl))
          .then(() => prevEl.click())
          .then(() => page.hasLoadedPosts())
          .then(() => expect(page.getUrl()).toBe('http://localhost:4000/news'));
      });
    });
  });
});
