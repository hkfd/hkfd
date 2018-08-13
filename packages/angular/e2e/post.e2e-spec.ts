import { PostPage } from './post.po';

describe('Post', () => {
  let page: PostPage;

  beforeEach(() => {
    page = new PostPage();
    page.navigateTo();
  });

  it('should set title', () => {
    page
      .getPageTitle()
      .getAttribute('textContent')
      .then(title => expect(page.getTitle()).toBe(`Heckford – ${title}`));
  });

  it('should set og:title', () => {
    page
      .getPageTitle()
      .getAttribute('textContent')
      .then(title => expect(page.getMetaTagTitle()).toBe(title));
  });

  it('should display post title', () => {
    expect(page.getPageTitle().getText()).toBeTruthy();
  });

  it('should display intro', () => {
    expect(page.getPageIntro()).toBeTruthy();
  });

  describe('Overview', () => {
    it('should display if case study post', () => {
      page.navigateTo('/work/vimto');

      expect(page.getOverview().isPresent()).toBe(true);
    });

    it('should not display if service post', () => {
      page.navigateTo('/service/3d-cgi');

      expect(page.getOverview().isPresent()).toBe(false);
    });

    it('should display title', () => {
      expect(page.getOverviewTitle()).toBeTruthy();
    });

    it('should display list item', () => {
      expect(
        page
          .getOverviewList()
          .first()
          .getText()
      ).toBeTruthy();
    });

    it('should have more than 1 list item', () => {
      expect(page.getOverviewList().count()).toBeGreaterThan(1);
    });
  });

  describe('Content', () => {
    it('should have section', () => {
      expect(
        page
          .getSections()
          .get(1)
          .isPresent()
      ).toBe(true);
    });

    it('should display section', () => {
      expect(
        page
          .getSections()
          .get(1)
          .isDisplayed()
      ).toBe(true);
    });

    it('should have more than 1 section', () => {
      expect(page.getSections().count()).toBeGreaterThan(1);
    });

    it('should display section title', () => {
      expect(page.getSectionTitle()).toBeTruthy();
    });
  });
});
