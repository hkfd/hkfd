import { AboutPage } from './about.po';

describe('About', () => {
  let page: AboutPage;

  beforeEach(() => {
    page = new AboutPage();
    page.navigateTo();
  });

  it('should display title', () => {
    expect(page.getPageTitle()).toEqual('40 YEARS OF INNOVATION');
  });

  it('should display intro image', () => {
    expect(page.getIntroImage().isPresent()).toBe(true);
  });

  describe('Team', () => {
    it('should display person', () => {
      expect(
        page
          .getPeople()
          .first()
          .isPresent()
      ).toBe(true);
    });

    it('should display more than 1 person', () => {
      expect(page.getPeople().count()).toBeGreaterThan(1);
    });

    it(`should display person's image`, () => {
      expect(page.getPersonImage().isPresent()).toBe(true);
    });

    it(`should display person's name`, () => {
      expect(page.getPersonName()).toBeTruthy;
    });

    it(`should display uppercase person's name`, () => {
      page.getPersonName().then(title => {
        expect(title).toEqual(title.toUpperCase());
      });
    });

    it(`should display person's position`, () => {
      expect(page.getPersonPosition()).toBeTruthy();
    });

    it('should display join our team link', () => {
      expect(page.getJoinTeamLink().isPresent()).toBe(true);
    });

    it('should link to /careers', () => {
      page
        .getJoinTeamLink()
        .click()
        .then(_ => expect(page.getUrl()).toContain('/careers'));
    });
  });
});
