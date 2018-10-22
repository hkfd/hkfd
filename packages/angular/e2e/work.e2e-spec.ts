import { WorkPage } from './work.po';

describe('Work', () => {
  let page: WorkPage;

  beforeEach(() => (page = new WorkPage()));

  it('should display title', () => {
    expect(page.getTitle()).toBe('Heckford – Our Work');
  });

  it('should display page title', () => {
    expect(page.getPageTitle().getText()).toBeTruthy();
  });

  describe('Case Studies', () => {
    it('should have multiple case studies', () => {
      expect(page.getCaseStudies().count()).toBeGreaterThan(1);
    });

    describe('Case Study', () => {
      it('should be displayed', () => {
        expect(page.getCaseStudy().isDisplayed()).toBeTruthy();
      });

      it('should display title', () => {
        expect(page.getCaseStudyTitle().getText()).toBeTruthy();
      });

      it('should display thumbnail', () => {
        expect(page.getCaseStudyThumbnail().isDisplayed()).toBeTruthy();
      });

      it('should route to case study on click', () => {
        const el = page.getCaseStudy();

        page
          .isClickable(el)
          .then(() => el.click())
          .then(() => page.isNotVisible(el))
          .then(_ => expect(page.getUrl()).toContain('/work/'));
      });
    });
  });
});
