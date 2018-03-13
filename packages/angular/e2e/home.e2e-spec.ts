import { HomePage } from './home.po';

describe('Home', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
    page.navigateTo();
  });

  it('should display title', () => {
    expect(page.getPageTitle()).toBeTruthy();
  });

  it('should display intro slider', () => {
    expect(page.getIntroSlider().isDisplayed()).toBe(true);
  });

  describe('Help', () => {
    it('should link to /about', () => {
      page
        .getHelpButton()
        .click()
        .then(_ => expect(page.getUrl()).toContain('/about'));
    });
  });

  describe('Services', () => {
    it('should have service', () => {
      expect(
        page
          .getServices()
          .first()
          .isPresent()
      ).toBe(true);
    });

    it('should display service', () => {
      expect(
        page
          .getServices()
          .first()
          .isDisplayed()
      ).toBe(true);
    });

    it('should have more than 1 service', () => {
      expect(page.getServices().count()).toBeGreaterThan(1);
    });

    it('should display service thumbnail', () => {
      expect(page.getServiceThumbnail().isDisplayed()).toBe(true);
    });

    it('should display service title', () => {
      expect(page.getServiceTitle()).toBeTruthy();
    });

    it('should display uppercase service title', () => {
      page.getServiceTitle().then(title => {
        expect(title).toEqual(title.toUpperCase());
      });
    });

    it('should display service description', () => {
      expect(page.getServiceDescription()).toBeTruthy();
    });

    it('should link to /service', () => {
      page
        .getServices()
        .first()
        .click()
        .then(_ => {
          expect(page.getUrl()).toContain('/service/');
        });
    });
  });

  it('should display case studies slider', () => {
    expect(page.getCaseStudiesSlider().isDisplayed()).toBe(true);
  });

  describe('Clients', () => {
    it('should have clients', () => {
      expect(page.getClients().isPresent()).toBe(true);
    });

    it('should display clients', () => {
      expect(page.getClients().isDisplayed()).toBe(true);
    });
  });
});
