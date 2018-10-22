import { HomePage } from './home.po';

describe('Home', () => {
  let page: HomePage;

  beforeEach(() => (page = new HomePage()));

  it('should display title', () => {
    expect(page.getTitle()).toBe('Heckford');
  });

  it('should display page title', () => {
    expect(page.getPageTitle().getText()).toBeTruthy();
  });

  it('should display intro slider', () => {
    expect(page.getIntroSlider().isDisplayed()).toBeTruthy();
  });

  describe('Help', () => {
    it('should display title', () => {
      expect(page.getHelpSectionTitle().getText()).toBeTruthy();
    });

    describe('Link', () => {
      it('should be displayed', () => {
        expect(page.getHelpSectionLink().isDisplayed()).toBeTruthy();
      });

      it('should route to /about on click', () => {
        const el = page.getHelpSectionLink();

        page
          .isClickable(el)
          .then(() => el.click())
          .then(() => page.isNotVisible(page.getIntroSlider()))
          .then(_ => expect(page.getUrl()).toContain('/about'));
      });
    });
  });

  describe('Services', () => {
    it('should display title', () => {
      expect(page.getServicesSectionTitle().getText()).toBeTruthy();
    });

    it('should have multiple services', () => {
      expect(page.getServices().count()).toBeGreaterThan(1);
    });

    describe('Service', () => {
      it('should be displayed', () => {
        expect(page.getService().isDisplayed()).toBeTruthy();
      });

      it('should display thumbnail', () => {
        expect(page.getServiceThumbnail().isDisplayed()).toBeTruthy();
      });

      it('should display title', () => {
        expect(page.getServiceTitle().getText()).toBeTruthy();
      });

      it('should display description', () => {
        expect(page.getServiceDescription().getText()).toBeTruthy();
      });

      it('should route to service on click', () => {
        const el = page.getService();

        page
          .isClickable(el)
          .then(() => el.click())
          .then(() => page.isNotVisible(page.getIntroSlider()))
          .then(_ => expect(page.getUrl()).toContain('/service/'));
      });
    });
  });

  it('should display case studies slider', () => {
    expect(page.getCaseStudiesSlider().isDisplayed()).toBeTruthy();
  });

  describe('Clients', () => {
    it('should display title', () => {
      expect(page.getClientsSectionTitle().getText()).toBeTruthy();
    });

    it('should have multiple client sectors', () => {
      expect(page.getClients().count()).toBeGreaterThan(1);
    });

    it('should display client sector', () => {
      expect(page.getClientSector().getText()).toBeTruthy();
    });

    it('should have multiple client names', () => {
      expect(page.getClientNames().count()).toBeGreaterThan(1);
    });

    describe('Client', () => {
      it('should be displayed', () => {
        expect(
          page
            .getClientNames()
            .first()
            .getText()
        ).toBeTruthy();
      });
    });
  });
});
