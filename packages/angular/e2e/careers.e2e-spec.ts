import { CareersPage } from './careers.po';

describe('Careers', () => {
  let page: CareersPage;

  beforeEach(() => (page = new CareersPage()));

  it('should display title', () => {
    expect(page.getTitle()).toBe('Heckford – Careers');
  });

  it('should display page title', () => {
    expect(page.getPageTitle().getText()).toBeTruthy();
  });

  it('should display intro image', () => {
    expect(page.getIntroImage().isDisplayed()).toBeTruthy();
  });

  describe('Careers', () => {
    it('should display careers image', () => {
      expect(page.getCareersImage().isDisplayed()).toBeTruthy();
    });

    describe('Career', () => {
      it('should be displayed', () => {
        expect(
          page
            .getCareers()
            .first()
            .isDisplayed()
        ).toBeTruthy();
      });

      it('should display title', () => {
        expect(page.getCareerTitle().getText()).toBeTruthy();
      });

      it('should display salary', () => {
        expect(page.getCareerSalary().getText()).toBeTruthy();
      });

      it('should route to career on click', () => {
        const el = page.getCareer();

        return page
          .isClickable(el)
          .then(() => el.click())
          .then(() => page.isNotVisible(page.getCareer()))
          .then(_ => expect(page.getUrl()).toContain('/careers/'));
      });
    });
  });
});
