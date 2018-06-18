import { CareerPage } from './career.po';

describe('Career', () => {
  let page: CareerPage;

  beforeEach(() => {
    page = new CareerPage();
    page.navigateTo();
  });

  it('should display title', () => {
    expect(page.getPageTitle().getText()).toBeTruthy();
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

    it('should display benefits title', () => {
      expect(page.getBenefitsTitle()).toBeTruthy();
    });
  });

  describe('Apply', () => {
    it('should display apply button', () => {
      expect(page.getApplyButton().isDisplayed()).toBe(true);
    });

    it('should have href mailto', () => {
      expect(page.getApplyButton().getAttribute('href')).toBe(
        'mailto:hello@heckford-advertising.co.uk'
      );
    });
  });
});
