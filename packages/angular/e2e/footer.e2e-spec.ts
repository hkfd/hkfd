import { ElementFinder } from 'protractor';

import { Footer } from './footer.po';

describe('Footer', () => {
  let page: Footer;

  beforeEach(() => (page = new Footer()));

  describe('CTA', () => {
    it('should be displayed', () => {
      expect(page.getCTA().isDisplayed()).toBeTruthy();
    });
  });

  describe('Footer', () => {
    it('should be displayed', () => {
      expect(page.getFooterFooter().isDisplayed()).toBeTruthy();
    });

    it('should display title', () => {
      expect(page.getFooterFooterTitle().getText()).toBeTruthy();
    });

    describe('Locations', () => {
      it('should be displayed', () => {
        page
          .getFooterFooterLocations()
          .each(el => expect((el as ElementFinder).isDisplayed()).toBeTruthy());
      });

      describe('Location', () => {
        it('should display title', () => {
          page
            .getLocationTitles()
            .each(el => expect((el as ElementFinder).getText()).toBeTruthy());
        });

        describe('Telephone', () => {
          it('should be displayed', () => {
            page
              .getLocationTels()
              .each(el => expect((el as ElementFinder).getText()).toBeTruthy());
          });

          it('should be clickable', () => {
            page
              .getLocationTels()
              .each(el =>
                expect(page.isClickable(el as ElementFinder)).toBeTruthy()
              );
          });

          it('should have href tel', () => {
            page
              .getLocationTels()
              .each(el =>
                expect((el as ElementFinder).getAttribute('href')).toContain(
                  'tel:+44'
                )
              );
          });
        });

        describe('Email', () => {
          it('should be displayed', () => {
            page
              .getLocationEmails()
              .each(el => expect((el as ElementFinder).getText()).toBeTruthy());
          });

          it('should be clickable', () => {
            page
              .getLocationEmails()
              .each(el =>
                expect(page.isClickable(el as ElementFinder)).toBeTruthy()
              );
          });

          it('should have href mailto', () => {
            page
              .getLocationEmails()
              .each(el =>
                expect((el as ElementFinder).getAttribute('href')).toBe(
                  'mailto:hello@heckford-advertising.co.uk'
                )
              );
          });
        });

        it('should display address', () => {
          page
            .getLocationAddresses()
            .each(el => expect((el as ElementFinder).getText()).toBeTruthy());
        });
      });
    });

    describe('Legal', () => {
      it('should display legal info', () => {
        expect(page.getLegal().getText()).toBeTruthy();
      });

      describe('Links', () => {
        it('should be displayed', () => {
          page
            .getLegalLinks()
            .each(el => expect((el as ElementFinder).getText()).toBeTruthy());
        });

        it('should be clickable', () => {
          page
            .getLegalLinks()
            .each(el =>
              expect(page.isClickable(el as ElementFinder)).toBeTruthy()
            );
        });
      });
    });

    describe('Social', () => {
      describe('Links', () => {
        it('should be displayed', () => {
          expect(page.getSocialLink().isDisplayed()).toBeTruthy();
        });

        it('should be clickable', () => {
          expect(page.isClickable(page.getSocialLink())).toBeTruthy();
        });
      });
    });
  });
});
