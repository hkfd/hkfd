import { AboutPage } from './about.po';

describe('About', () => {
  let page: AboutPage;

  beforeEach(() => (page = new AboutPage()));

  it('should display title', () => {
    expect(page.getTitle()).toBe('Heckford – About');
  });

  it('should display page title', () => {
    expect(page.getPageTitle().getText()).toBeTruthy();
  });

  it('should display intro image', () => {
    expect(page.getIntroImage().isDisplayed()).toBeTruthy();
  });

  describe('Team', () => {
    it('should have multiple people', () => {
      expect(page.getPeople().count()).toBeGreaterThan(1);
    });

    describe('Person', () => {
      it('should be displayed', () => {
        expect(
          page
            .getPeople()
            .first()
            .isDisplayed()
        ).toBeTruthy();
      });

      it('should display image', () => {
        expect(page.getPersonImage().isDisplayed()).toBeTruthy();
      });

      it('should display name', () => {
        expect(page.getPersonName().getText()).toBeTruthy();
      });

      it('should display position', () => {
        expect(page.getPersonPosition().getText()).toBeTruthy();
      });
    });

    describe('Join', () => {
      it('should be displayed', () => {
        expect(
          page
            .getPeople()
            .last()
            .isDisplayed()
        ).toBeTruthy();
      });

      it('should route to /careers on click', () => {
        const el = page.getPeople().last();

        page
          .scrollTo(el)
          .then(() => page.isClickable(el))
          .then(() => el.click())
          .then(() => page.isNotVisible(el))
          .then(_ => expect(page.getUrl()).toContain('/careers'));
      });
    });
  });
});
