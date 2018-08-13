import { CareersPage } from './careers.po';

describe('Careers', () => {
  let page: CareersPage;

  beforeEach(() => {
    page = new CareersPage();
    page.navigateTo();
  });

  it('should set title', () => {
    expect(page.getTitle()).toBe('Heckford – Careers');
  });

  it('should set og:title', () => {
    expect(page.getMetaTagTitle()).toBe('Careers');
  });

  it('should display page title', () => {
    expect(page.getPageTitle()).toBeTruthy();
  });

  it('should display intro image', () => {
    expect(page.getIntroImage().isDisplayed()).toBe(true);
  });

  describe('careers', () => {
    it('should have career', () => {
      expect(
        page
          .getCareers()
          .first()
          .isPresent()
      ).toBe(true);
    });

    it('should display career', () => {
      expect(
        page
          .getCareers()
          .first()
          .isDisplayed()
      ).toBe(true);
    });

    it('should display career title', () => {
      expect(page.getCareerTitle()).toBeTruthy();
    });

    it('should display career salary', () => {
      expect(page.getCareerSalary()).toBeTruthy();
    });

    it('should link to career', () => {
      const el = page.getCareers().first();

      return page
        .isClickable(el)
        .then(() => el.click())
        .then(_ => {
          expect(page.getUrl()).toContain('/careers/');
        });
    });

    it('should display careers image', () => {
      expect(page.getCareersImage().isDisplayed()).toBe(true);
    });
  });
});
