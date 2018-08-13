import { HomePage } from './home.po';

describe('Home', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
    page.navigateTo();
  });

  it('should set title', () => {
    expect(page.getTitle()).toBe('Heckford');
  });

  it('should set og:title', () => {
    expect(page.getMetaTagTitle()).toBe('Heckford');
  });

  it('should display page title', () => {
    expect(page.getPageTitle()).toBeTruthy();
  });

  it('should display intro slider', () => {
    expect(page.getIntroSlider().isDisplayed()).toBe(true);
  });

  describe('Help', () => {
    it('should link to /about', () => {
      const el = page.getHelpButton();

      page
        .isClickable(el)
        .then(() => page.isClickable(el))
        .then(() => el.click())
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

    it('should display service description', () => {
      expect(page.getServiceDescription()).toBeTruthy();
    });

    it('should link to /service', () => {
      const el = page.getServices().first();

      return page
        .isClickable(el)
        .then(() => el.click())
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

    it('should display client sector', () => {
      expect(
        page
          .getClientSector()
          .first()
          .getText()
      ).toBeTruthy();
    });

    it('should have more than 1 client sector', () => {
      expect(page.getClientSector().count()).toBeGreaterThan(1);
    });

    it('should display client name', () => {
      expect(page.getClientNames().getText()).toBeTruthy();
    });

    it('should have more than 1 client name', () => {
      expect(page.getClientNames().count()).toBeGreaterThan(1);
    });
  });
});
