import { AboutPage } from './about.po';

describe('About', () => {
  let page: AboutPage;

  beforeEach(() => {
    page = new AboutPage();
    page.navigateTo();
  });

  it('should display title', () => {
    expect(page.getPageTitle()).toBeTruthy();
  });

  it('should display intro image', () => {
    expect(page.getIntroImage().isDisplayed()).toBe(true);
  });

  describe('Team', () => {
    it('should have person', () => {
      expect(
        page
          .getPeople()
          .first()
          .isPresent()
      ).toBe(true);
    });

    it('should display person', () => {
      expect(
        page
          .getPeople()
          .first()
          .isDisplayed()
      ).toBe(true);
    });

    it('should have more than 1 person', () => {
      expect(page.getPeople().count()).toBeGreaterThan(1);
    });

    it(`should display person's image`, () => {
      expect(page.getPersonImage().isDisplayed()).toBe(true);
    });

    it(`should display person's name`, () => {
      expect(page.getPersonName()).toBeTruthy();
    });

    it(`should display uppercase person's name`, () => {
      page.getPersonName().then(title => {
        expect(title).toEqual(title.toUpperCase());
      });
    });

    it(`should display person's position`, () => {
      expect(page.getPersonPosition()).toBeTruthy();
    });

    describe('Join', () => {
      it('should link to /careers', () => {
        const el = page.getPeople().last();

        page
          .isClickable(el)
          .then(() => el.click())
          .then(_ => expect(page.getUrl()).toContain('/careers'));
      });
    });
  });
});
