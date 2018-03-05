import { HomePage } from './home.po';

describe('Home', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
    page.navigateTo();
  });

  it('should display title', () => {
    expect(page.getPageTitle()).toContain(`LANCASHIRE'S LARGEST`);
  });

  it('should display intro slider', () => {
    expect(page.getIntroSlider().isPresent()).toBe(true);
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
    beforeAll(() => {
      it('should display service', () => {
        expect(
          page
            .getServices()
            .first()
            .isPresent()
        ).toBe(true);
      });
    });

    it('should display more than 1 service', () => {
      expect(page.getServices().count()).toBeGreaterThan(1);
    });

    it('should display service thumbnail', () => {
      expect(page.getServiceThumbnail().isPresent()).toBe(true);
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
    expect(page.getCaseStudiesSlider().isPresent()).toBe(true);
  });

  describe('Clients', () => {
    it('should display client', () => {
      expect(
        page
          .getClients()
          .first()
          .isPresent()
      ).toBe(true);
    });

    it('should display more than 1 client', () => {
      expect(page.getClients().count()).toBeGreaterThan(1);
    });
  });
});
