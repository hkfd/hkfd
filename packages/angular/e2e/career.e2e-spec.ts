import { CareerPage } from './career.po';

describe('Career', () => {
  let page: CareerPage;

  beforeEach(() => (page = new CareerPage()));

  it('should display title', () => {
    page
      .getPageTitle()
      .getAttribute('textContent')
      .then(title => expect(page.getTitle()).toBe(`Heckford – ${title}`));
  });

  it('should display page title', () => {
    expect(page.getPageTitle().getText()).toBeTruthy();
  });

  describe('Content', () => {
    it('should have multiple sections', () => {
      expect(page.getSections().count()).toBeGreaterThan(1);
    });

    describe('Section', () => {
      it('should be displayed', () => {
        expect(page.getSection().isDisplayed()).toBeTruthy();
      });

      it('should display section title', () => {
        expect(page.getSectionTitle().getText()).toBeTruthy();
      });
    });

    describe('Benefits', () => {
      it('should be displayed', () => {
        expect(page.getBenefitsSection().isDisplayed()).toBeTruthy();
      });

      it('should display benefits title', () => {
        expect(page.getBenefitsSectionTitle().getText()).toBeTruthy();
      });

      it('should display benefits content', () => {
        expect(page.getBenefitsSectionContent().getText()).toBeTruthy();
      });
    });
  });

  describe('Apply', () => {
    it('should be displayed', () => {
      expect(page.getApplyButton().isDisplayed()).toBeTruthy();
    });

    it('should be clickable', () => {
      expect(page.isClickable(page.getApplyButton())).toBeTruthy();
    });

    it('should have href mailto', () => {
      expect(page.getApplyButton().getAttribute('href')).toBe(
        'mailto:hello@heckford-advertising.co.uk'
      );
    });
  });
});
