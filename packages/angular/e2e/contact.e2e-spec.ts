import { ContactPage } from './contact.po';

describe('Contact', () => {
  let page: ContactPage;

  beforeEach(() => (page = new ContactPage()));

  it('should display title', () => {
    expect(page.getTitle()).toBe('Heckford – Contact');
  });

  it('should display page title', () => {
    expect(page.getPageTitle().getText()).toBeTruthy();
  });

  describe('Telephone', () => {
    it('should be displayed', () => {
      expect(page.getTelLink().isDisplayed()).toBeTruthy();
    });

    it('should be clickable', () => {
      expect(page.isClickable(page.getTelLink())).toBeTruthy();
    });

    it('should have href tel', () => {
      expect(page.getTelLink().getAttribute('href')).toBe('tel:+441772884444');
    });
  });

  it('should display contact form', () => {
    expect(page.getContactForm().isDisplayed()).toBeTruthy();
  });

  it('should display contact image', () => {
    expect(page.getContactImage().isDisplayed()).toBeTruthy();
  });
});
