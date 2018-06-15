import { Form } from './form.po';

describe('Form', () => {
  let page: Form;

  beforeEach(() => {
    page = new Form();
    page.navigateTo();
  });

  it('should be present', () => {
    expect(page.getForm().isPresent()).toBe(true);
  });

  describe('Name', () => {
    it('should be displayed', () => {
      expect(page.getNameInput().isDisplayed()).toBe(true);
    });

    it('should not display error', () => {
      expect(page.getError().isPresent()).toBe(false);
    });

    it('should display error on blur', () => {
      page.getNameInput().click();
      page.getEmailInput().click();

      expect(page.getError().getText()).toContain('Name');
    });
  });

  describe('Email', () => {
    it('should be displayed', () => {
      expect(page.getEmailInput().isDisplayed()).toBe(true);
    });

    it('should not display error', () => {
      expect(page.getError().isPresent()).toBe(false);
    });

    it('should display error on blur', () => {
      page.getEmailInput().click();
      page.getMessageInput().click();

      expect(page.getError().getText()).toContain('Email');
    });

    it('should not display error on invalid email', () => {
      page
        .getEmailInput()
        .sendKeys('email')
        .then(_ => expect(page.getError().isPresent()).toBe(false));
    });

    it('should display error on invalid email blur', () => {
      page
        .getEmailInput()
        .sendKeys('email')
        .then(() => page.getMessageInput().click())
        .then(_ => expect(page.getError().getText()).toContain('Email'));
    });
  });

  describe('Message', () => {
    it('should be displayed', () => {
      expect(page.getMessageInput().isDisplayed()).toBe(true);
    });

    it('should not display error', () => {
      expect(page.getError().isPresent()).toBe(false);
    });

    it('should display error on blur', () => {
      page.getMessageInput().click();
      page.getEmailInput().click();

      expect(page.getError().getText()).toContain('Message');
    });
  });

  it('should display legal on input', () => {
    page
      .getNameInput()
      .sendKeys('a')
      .then(_ => expect(page.getLegal().isDisplayed()).toBe(true));
  });

  it('should display send button on input', () => {
    page
      .getNameInput()
      .sendKeys('a')
      .then(_ => expect(page.getSendButton().isDisplayed()).toBe(true));
  });

  describe('Send', () => {
    it('should be disabled', () => {
      page
        .getNameInput()
        .sendKeys('a')
        .then(_ => expect(page.getSendButton().isEnabled()).toBe(false));
    });

    it('should be enabled on form complete', () => {
      page
        .getNameInput()
        .sendKeys('a')
        .then(() => page.getEmailInput().sendKeys('b@c'))
        .then(() => page.getMessageInput().sendKeys('d'))
        .then(_ => expect(page.getSendButton().isEnabled()).toBe(true));
    });
  });
});
