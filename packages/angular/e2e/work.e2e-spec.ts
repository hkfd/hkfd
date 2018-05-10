import { WorkPage } from './work.po';

describe('Work', () => {
  let page: WorkPage;

  beforeEach(() => {
    page = new WorkPage();
    page.navigateTo();
  });

  it('should display title', () => {
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

    it('should display uppercase case study title', () => {
      page.getCaseStudyTitle().then(title => {
        expect(title).toEqual(title.toUpperCase());
      });
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
