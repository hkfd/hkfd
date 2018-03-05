import { Header } from './header.po';

describe('Header', () => {
  let page: Header;

  beforeEach(() => {
    page = new Header();
    page.navigateTo();
  });

  beforeAll(() => {
    it('should have links', () => {
      expect(
        page
          .getLinks()
          .first()
          .isPresent()
      ).toBe(true);
    });
  });

  it('should have 6 links', () => {
    expect(page.getLinks().count()).toBe(6);
  });

  it('should set link title', () => {
    expect(page.getLinkTitle()).toBeTruthy();
  });

  it('should set uppercase link title', () => {
    page.getLinkTitle().then(title => {
      expect(title).toEqual(title.toUpperCase());
    });
  });

  it('should route on page click', () => {
    page
      .getLinks()
      .get(1)
      .click()
      .then(_ => {
        expect(page.getUrl()).toContain('/about');
      });
  });

  it('should route on logo click', () => {
    page.navigateTo('/about');
    page
      .getLinks()
      .first()
      .click()
      .then(_ => {
        expect(page.getUrl()).not.toContain('/about');
      });
  });

  it(`should set 'active' class on current page link`, () => {
    page
      .getLinks()
      .get(1)
      .click()
      .then(_ => {
        expect(
          page
            .getLinks()
            .get(1)
            .getAttribute('class')
        ).toContain('active');
      });
  });

  it('should not show toggle', () => {
    expect(page.getToggle().isDisplayed()).toBe(false);
  });

  describe('Toggle', () => {
    beforeAll(() => page.setSize(200, 300));

    it('should show toggle', () => {
      expect(page.getToggle().isDisplayed()).toBe(true);
    });

    it('should hide links', () => {
      expect(page.getNavLinks().isDisplayed()).toBe(false);
    });

    it('should show links on open', () => {
      page
        .getToggle()
        .click()
        .then(_ => {
          expect(page.getNavLinks().isDisplayed()).toBe(true);
        });
    });

    it('should hide links on close', () => {
      page
        .getToggle()
        .click()
        .then(() => page.getToggle().click())
        .then(_ => {
          expect(page.getNavLinks().isDisplayed()).toBe(false);
        });
    });

    it('should hide links on page click', () => {
      page
        .getToggle()
        .click()
        .then(() => page.sleep())
        .then(() =>
          page
            .getLinks()
            .get(1)
            .click()
        )
        .then(_ => expect(page.getNavLinks().isDisplayed()).toBe(false));
    });

    it('should hide links on logo click', () => {
      page
        .getToggle()
        .click()
        .then(() =>
          page
            .getLinks()
            .first()
            .click()
        )
        .then(_ => expect(page.getNavLinks().isDisplayed()).toBe(false));
    });

    afterAll(() => page.setSize());
  });
});
