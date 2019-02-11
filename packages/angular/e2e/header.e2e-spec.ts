import { Header } from './header.po';

describe('Header', () => {
  let page: Header;

  beforeEach(() => (page = new Header()));

  describe('Links', () => {
    describe('Home', () => {
      beforeEach(() => page.navigateTo('/about'));

      it('should route to home on click', () => {
        const el = page.getHomeLink();

        expect(page.getUrl()).not.toBe('http://localhost:4000/');

        page
          .isClickable(el)
          .then(() => el.click())
          .then(_ => expect(page.getUrl()).toBe('http://localhost:4000/'));
      });
    });

    describe('Page', () => {
      it('should display link title', () => {
        expect(page.getPageLink().getText()).toBeTruthy();
      });

      it('should route to page on click', () => {
        const el = page.getPageLinks().first();

        expect(page.getUrl()).toBe('http://localhost:4000/');

        page
          .isClickable(el)
          .then(() => el.click())
          .then(_ => expect(page.getUrl()).not.toBe('http://localhost:4000/'));
      });

      describe('Active', () => {
        beforeEach(() => page.navigateTo('/careers'));

        it('should set current page as active', () => {
          const pageLink = page.getPageLinks().get(2);

          expect(pageLink.getAttribute('class')).toContain('active');
        });

        it('should set routed page as active on page link click', () => {
          const pageLink = page.getPageLinks().get(2);
          const newPageLink = page.getPageLinks().get(3);

          page
            .isClickable(newPageLink)
            .then(() => newPageLink.click())
            .then(_ => {
              expect(pageLink.getAttribute('class')).not.toContain('active');
              expect(newPageLink.getAttribute('class')).toContain('active');
            });
        });

        it('should unset current page as active on home link click', () => {
          const pageLink = page.getPageLinks().get(2);
          const homeLink = page.getHomeLink();

          page
            .isClickable(homeLink)
            .then(() => homeLink.click())
            .then(_ =>
              expect(pageLink.getAttribute('class')).not.toContain('active')
            );
        });
      });
    });
  });

  describe('Desktop', () => {
    it('should display home link', () => {
      expect(page.getHomeLink().isDisplayed()).toBeTruthy();
    });

    it('should display page links', () => {
      expect(page.getPageLink().isDisplayed()).toBeTruthy();
    });

    it('should not display toggle', () => {
      expect(page.getNavToggle().isDisplayed()).toBeFalsy();
    });
  });

  describe('Menu', () => {
    beforeEach(() => page.setWindowSize(200, 300));

    describe('Closed', () => {
      it('should show toggle', () => {
        expect(page.getNavToggle().isDisplayed()).toBeTruthy();
      });

      it('should show home link', () => {
        expect(page.getHomeLink().isDisplayed()).toBeTruthy();
      });

      it('should not show page links', () => {
        expect(page.getPageLink().isDisplayed()).toBeFalsy();
      });
    });

    describe('Open', () => {
      beforeEach(() =>
        page
          .isClickable(page.getNavToggle())
          .then(_ => page.getNavToggle().click())
      );

      it('should show toggle', () => {
        expect(page.getNavToggle().isDisplayed()).toBeTruthy();
      });

      it('should show home link', () => {
        expect(page.getHomeLink().isDisplayed()).toBeTruthy();
      });

      it('should show page links', () => {
        expect(page.getPageLink().isDisplayed()).toBeTruthy();
      });

      it('should close menu on home click', () => {
        const el = page.getHomeLink();

        page
          .isClickable(el)
          .then(() => el.click())
          .then(_ => {
            expect(page.getHomeLink().isDisplayed()).toBeTruthy();
            expect(page.getPageLink().isDisplayed()).toBeFalsy();
          });
      });

      it('should close menu on page click', () => {
        const el = page.getPageLinks().first();

        page
          .isClickable(el)
          .then(() => el.click())
          .then(_ => {
            expect(page.getHomeLink().isDisplayed()).toBeTruthy();
            expect(page.getPageLink().isDisplayed()).toBeFalsy();
          });
      });
    });

    afterEach(() => page.setWindowSize());
  });
});
