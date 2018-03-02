import { WorkPage } from './work.po';

describe('Work', () => {
  let page: WorkPage;

  beforeEach(() => {
    page = new WorkPage();
    page.navigateTo();
  });

  it('should display title', () => {
    expect(page.getPageTitle()).toEqual('OUR WORK');
  });

  describe('Case Studies', () => {
    beforeAll(() => {
      it('should display case study', () => {
        expect(
          page
            .getCaseStudies()
            .first()
            .isPresent()
        ).toBe(true);
      });
    });

    it('should display more than 1 case study', () => {
      expect(page.getCaseStudies().count()).toBeGreaterThan(1);
    });

    it('should display case study title', () => {
      expect(page.getCaseStudyTitle()).toBeTruthy();
    });

    it('should display case study image', () => {
      expect(page.getCaseStudyImage().isPresent()).toBe(true);
    });

    it('should route on click', () => {
      const originalUrl = page.getUrl();

      page
        .getCaseStudies()
        .first()
        .click()
        .then(_ => expect(page.getUrl()).not.toBe(originalUrl));
    });
  });
});
