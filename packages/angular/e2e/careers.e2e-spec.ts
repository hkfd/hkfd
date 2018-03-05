import { CareersPage } from './careers.po';

describe('Careers', () => {
  let page: CareersPage;

  beforeEach(() => {
    page = new CareersPage();
    page.navigateTo();
  });

  it('should display title', () => {
    expect(page.getPageTitle()).toEqual('FANCY JOINING THE TEAM?');
  });

  it('should display intro image', () => {
    expect(page.getIntroImage().isPresent()).toBe(true);
  });

  describe('careers', () => {
    beforeAll(() => {
      it('should display career', () => {
        expect(
          page
            .getCareers()
            .first()
            .isPresent()
        ).toBe(true);
      });
    });

    it('should display career title', () => {
      expect(page.getCareerTitle()).toBeTruthy();
    });

    it('should display uppercase career title', () => {
      page.getCareerTitle().then(title => {
        expect(title).toEqual(title.toUpperCase());
      });
    });

    it('should display career image', () => {
      expect(page.getCareerImage().isPresent()).toBe(true);
    });

    xit('should link to /contact', () => {
      page
        .getCareers()
        .first()
        .click()
        .then(_ => expect(page.getUrl()).toContain('/contact'));
    });
  });
});
