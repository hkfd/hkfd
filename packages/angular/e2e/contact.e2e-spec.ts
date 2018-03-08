import { ContactPage } from './contact.po';

describe('Contact', () => {
  let page: ContactPage;

  beforeEach(() => {
    page = new ContactPage();
    page.navigateTo();
  });

  it('should display title', () => {
    expect(page.getPageTitle()).toBeTruthy();
  });

  describe('Telephone', () => {
    it('should be displayed', () => {
      expect(page.getTelLink().isDisplayed()).toBe(true);
    });

    it('should have href tel', () => {
      expect(page.getTelLink().getAttribute('href')).toBe('tel:+441772884444');
    });
  });

  describe('Email', () => {
    it('should be displayed', () => {
      expect(page.getEmailLink().isDisplayed()).toBe(true);
    });

    it('should have href mailto', () => {
      expect(page.getEmailLink().getAttribute('href')).toBe(
        'mailto:hello@heckford-advertising.co.uk'
      );
    });
  });

  it('should display contact image', () => {
    expect(page.getContactImage().isDisplayed()).toBe(true);
  });
});
