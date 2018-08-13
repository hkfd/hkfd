import { ContactPage } from './contact.po';

describe('Contact', () => {
  let page: ContactPage;

  beforeEach(() => {
    page = new ContactPage();
    page.navigateTo();
  });

  it('should set title', () => {
    expect(page.getTitle()).toBe('Heckford – Contact');
  });

  it('should set og:title', () => {
    expect(page.getMetaTagTitle()).toBe('Contact');
  });

  it('should display page title', () => {
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

  it('should display contact form', () => {
    expect(page.getContactForm().isDisplayed()).toBe(true);
  });

  it('should display contact image', () => {
    expect(page.getContactImage().isDisplayed()).toBe(true);
  });
});
