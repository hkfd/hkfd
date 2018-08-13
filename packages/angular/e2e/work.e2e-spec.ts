import { WorkPage } from './work.po';

describe('Work', () => {
  let page: WorkPage;

  beforeEach(() => {
    page = new WorkPage();
    page.navigateTo();
  });

  it('should set title', () => {
    expect(page.getTitle()).toBe('Heckford – Our Work');
  });

  it('should set og:title', () => {
    expect(page.getMetaTagTitle()).toBe('Our Work');
  });

  it('should display post title', () => {
    expect(page.getPageTitle()).toBeTruthy();
  });

  describe('Case Studies', () => {
    it('should have case study', () => {
      expect(
        page
          .getCaseStudies()
          .first()
          .isPresent()
      ).toBe(true);
    });

    it('should display case study', () => {
      expect(
        page
          .getCaseStudies()
          .first()
          .isDisplayed()
      ).toBe(true);
    });

    it('should have more than 1 case study', () => {
      expect(page.getCaseStudies().count()).toBeGreaterThan(1);
    });

    it('should display case study title', () => {
      expect(page.getCaseStudyTitle()).toBeTruthy();
    });

    it('should display case study image', () => {
      expect(page.getCaseStudyImage().isDisplayed()).toBe(true);
    });

    it('should route on click', () => {
      const originalUrl = page.getUrl();
      const el = page.getCaseStudies().first();

      page
        .isClickable(el)
        .then(() => el.click())
        .then(_ => expect(page.getUrl()).not.toBe(originalUrl));
    });
  });
});
