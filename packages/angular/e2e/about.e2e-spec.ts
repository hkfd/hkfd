import { AboutPage } from './about.po';

describe('About', () => {
  let page: AboutPage;

  beforeEach(() => {
    page = new AboutPage();
    page.navigateTo();
  });

  it('should set title', () => {
    expect(page.getTitle()).toBe('Heckford – About');
  });

  it('should set og:title', () => {
    expect(page.getMetaTagTitle()).toBe('About');
  });

  it('should display page title', () => {
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

    it('should display persons image', () => {
      expect(page.getPersonImage().isDisplayed()).toBe(true);
    });

    it('should display persons name', () => {
      expect(page.getPersonName()).toBeTruthy();
    });

    it('should display persons position', () => {
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
