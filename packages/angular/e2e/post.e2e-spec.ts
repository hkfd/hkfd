import { PostPage } from './post.po';

describe('Post', () => {
  let page: PostPage;

  beforeEach(() => {
    page = new PostPage();
    page.navigateTo();
  });

  it('should display title', () => {
    expect(page.getPageTitle()).toBeTruthy();
  });

  it('should display uppercase title', () => {
    page.getPageTitle().then(title => {
      expect(title).toEqual(title.toUpperCase());
    });
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

    it('should display uppercase title', () => {
      page.getOverviewTitle().then(title => {
        expect(title).toEqual(title.toUpperCase());
      });
    });

    it('should display list item', () => {
      expect(
        page
          .getOverviewList()
          .first()
          .getText()
      ).toBeTruthy();
    });

    it('should display more than 1 list item', () => {
      expect(page.getOverviewList().count()).toBeGreaterThan(1);
    });
  });

  describe('Content', () => {
    it('should display section', () => {
      expect(
        page
          .getSections()
          .get(1)
          .isPresent()
      ).toBe(true);
    });

    it('should display more than 1 section', () => {
      expect(page.getSections().count()).toBeGreaterThan(1);
    });

    it('should display section title', () => {
      expect(page.getSectionTitle()).toBeTruthy();
    });

    it('should display uppercase section title', () => {
      page.getSectionTitle().then(title => {
        expect(title).toEqual(title.toUpperCase());
      });
    });
  });
});
