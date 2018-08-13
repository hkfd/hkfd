import { NewsPostPage } from './news-post.po';

describe('NewsPost', () => {
  let page: NewsPostPage;

  beforeEach(() => {
    page = new NewsPostPage();
    page.navigateTo();
  });

  it('should set title', () => {
    page
      .getPostTitle()
      .getAttribute('textContent')
      .then(title => expect(page.getTitle()).toBe(`Heckford – ${title}`));
  });

  it('should set og:title', () => {
    page
      .getPostTitle()
      .getAttribute('textContent')
      .then(title => expect(page.getMetaTagTitle()).toBe(title));
  });

  it('should display post date', () => {
    expect(page.getPostDate().getText()).toBeTruthy();
  });

  it('should display post title', () => {
    expect(page.getPostTitle().getText()).toBeTruthy();
  });

  it('should display post thumbnail', () => {
    expect(page.getPostThumbnail().isDisplayed()).toBe(true);
  });
});
