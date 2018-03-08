import { CareersPage } from './careers.po';

describe('Careers', () => {
  let page: CareersPage;

  beforeEach(() => {
    page = new CareersPage();
    page.navigateTo();
  });

  it('should display title', () => {
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

    it('should display uppercase career title', () => {
      page.getCareerTitle().then(title => {
        expect(title).toEqual(title.toUpperCase());
      });
    });

    it('should link to /contact', () => {
      page
        .getCareers()
        .last()
        .click()
        .then(_ => expect(page.getUrl()).toContain('/contact'));
    });

    it('should display careers image', () => {
      expect(page.getCareersImage().isDisplayed()).toBe(true);
    });
  });
});
