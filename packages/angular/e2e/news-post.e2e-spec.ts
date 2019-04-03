import { NewsPostPage } from './news-post.po';

describe('NewsPost', () => {
  let page: NewsPostPage;

  describe('Doesnt exist', () => {
    beforeEach(() => {
      page = new NewsPostPage('/news/1');
      return page.isVisible(page.getPost());
    });

    it('should display 404 title', () => {
      expect(page.getTitle()).toBe(`Heckford – Page not found`);
    });

    it('should display error and offer to route home', () => {
      const el = page.getErrorLink();

      page
        .isVisible(page.getError())
        .then(() => page.isClickable(el))
        .then(() => el.click())
        .then(() => expect(page.getUrl()).toBe('http://localhost:4000/'));
    });
  });

  describe('Exists', () => {
    beforeEach(() => (page = new NewsPostPage()));

    it('should display title', () => {
      page
        .getPostTitle()
        .getAttribute('textContent')
        .then(title =>
          expect(page.getTitle()).toBe(`Heckford – ${title.trim()}`)
        );
    });

    describe('Post', () => {
      it('should display date', () => {
        expect(page.getPostDate().getText()).toBeTruthy();
      });

      it('should display title', () => {
        expect(page.getPostTitle().getText()).toBeTruthy();
      });

      it('should display thumbnail', () => {
        expect(page.getPostThumbnail().isDisplayed()).toBeTruthy();
      });
    });
  });
});
