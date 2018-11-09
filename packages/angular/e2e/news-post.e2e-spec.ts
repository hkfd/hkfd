import { NewsPostPage } from './news-post.po';

describe('NewsPost', () => {
  let page: NewsPostPage;

  beforeEach(() => (page = new NewsPostPage()));

  it('should display title', () => {
    page
      .getPostTitle()
      .getAttribute('textContent')
      .then(title => expect(page.getTitle()).toBe(`Heckford – ${title}`));
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
