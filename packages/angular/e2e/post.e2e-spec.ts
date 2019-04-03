import { PostPage } from './post.po';

describe('Post', () => {
  let page: PostPage;

  describe('Doesnt exist', () => {
    beforeEach(() => {
      page = new PostPage('/work/1');
      return page.isVisible(page.getPost());
    });

    it('should display 404 title', () => {
      expect(page.getTitle()).toBe(`Heckford – Page not found`);
    });

    it('should display error and offer to route home', () => {
      const el = page.getErrorLink();

      page
        .isVisible(page.getError())
        .then(() => page.isClickable(el))
        .then(() => el.click())
        .then(() => expect(page.getUrl()).toBe('http://localhost:4000/'));
    });
  });

  describe('Exists', () => {
    beforeEach(() => (page = new PostPage()));

    it('should display title', () => {
      page
        .getPageTitle()
        .getAttribute('textContent')
        .then(title => expect(page.getTitle()).toBe(`Heckford – ${title}`));
    });

    it('should display page title', () => {
      expect(page.getPageTitle().getText()).toBeTruthy();
    });

    describe('Post', () => {
      it('should display intro text', () => {
        expect(page.getPageIntro().getText()).toBeTruthy();
      });

      describe('Overview', () => {
        describe('Case Study', () => {
          it('should be displayed', () => {
            expect(page.getOverview().isPresent()).toBeTruthy();
          });

          it('should display title', () => {
            expect(page.getOverviewTitle().getText()).toBeTruthy();
          });

          it('should display list item', () => {
            expect(
              page
                .getOverviewList()
                .first()
                .getText()
            ).toBeTruthy();
          });

          it('should have multiple list items', () => {
            expect(page.getOverviewList().count()).toBeGreaterThan(1);
          });
        });

        describe('Service', () => {
          beforeEach(() => page.navigateTo('/service/3d-cgi'));

          it('should not be displayed', () => {
            expect(page.getOverview().isPresent()).toBeFalsy();
          });
        });
      });

      describe('Content', () => {
        describe('Sections', () => {
          it('should have multiple sections', () => {
            expect(page.getSections().count()).toBeGreaterThan(2);
          });

          describe('Section', () => {
            it('should be displayed', () => {
              expect(page.getSection().isDisplayed()).toBeTruthy();
            });

            it('should display title', () => {
              expect(page.getSectionTitle().getText()).toBeTruthy();
            });
          });
        });
      });
    });
  });
});
