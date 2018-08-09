import { NewsPostPage } from './news-post.po';

describe('NewsPost', () => {
  let page: NewsPostPage;

  beforeEach(() => {
    page = new NewsPostPage();
    page.navigateTo();
  });

  it('should display post date', () => {
    expect(page.getPostDate().getText()).toBeTruthy();
  });

  it('should display post title', () => {
    expect(page.getPostTitle()).toBeTruthy();
  });

  it('should display post thumbnail', () => {
    expect(page.getPostThumbnail().isDisplayed()).toBe(true);
  });
});
