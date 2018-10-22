import { PostPage } from './post.po';

describe('Post', () => {
  let page: PostPage;

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
