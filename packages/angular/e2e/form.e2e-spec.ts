import { Form } from './form.po';

describe('Form', () => {
  let page: Form;

  beforeEach(() => (page = new Form()));

  it('should be displayed', () => {
    expect(page.getForm().isDisplayed()).toBeTruthy();
  });

  describe('Name', () => {
    it('should be displayed', () => {
      expect(page.getNameInput().isDisplayed()).toBeTruthy();
    });

    it('should display input', () => {
      const el = page.getNameInput();

      el.sendKeys('Name').then(_ =>
        expect(el.getAttribute('value')).toBe('Name')
      );
    });

    it('should not display error', () => {
      expect(page.getError().isPresent()).toBeFalsy();
    });

    it('should display error when focus then blur without input', () => {
      const nameEl = page.getNameInput();
      const otherEl = page.getEmailInput();

      page
        .isClickable(nameEl)
        .then(() => nameEl.click())
        .then(() => page.isClickable(otherEl))
        .then(() => otherEl.click())
        .then(_ => {
          expect(page.getError().isDisplayed()).toBeTruthy();
          expect(page.getError().getText()).toContain('Name');
        });
    });
  });

  describe('Email', () => {
    it('should be displayed', () => {
      expect(page.getEmailInput().isDisplayed()).toBeTruthy();
    });

    it('should display input', () => {
      const el = page.getEmailInput();

      el.sendKeys('name@example.com').then(_ =>
        expect(el.getAttribute('value')).toBe('name@example.com')
      );
    });

    it('should not display error', () => {
      expect(page.getError().isPresent()).toBeFalsy();
    });

    it('should display error when focus then blur without input', () => {
      const emailEl = page.getEmailInput();
      const otherEl = page.getMessageInput();

      page
        .isClickable(emailEl)
        .then(() => emailEl.click())
        .then(() => page.isClickable(otherEl))
        .then(() => otherEl.click())
        .then(_ => {
          expect(page.getError().isDisplayed()).toBeTruthy();
          expect(page.getError().getText()).toContain('Email');
        });
    });

    it('should not display error on invalid email input', () => {
      page
        .getEmailInput()
        .sendKeys('email')
        .then(_ => expect(page.getError().isPresent()).toBeFalsy());
    });

    it('should display error on invalid email input blur', () => {
      page
        .getEmailInput()
        .sendKeys('email')
        .then(() => page.getMessageInput().click())
        .then(_ => {
          expect(page.getError().isDisplayed()).toBeTruthy();
          expect(page.getError().getText()).toContain('Email');
        });
    });
  });

  describe('Message', () => {
    it('should be displayed', () => {
      expect(page.getMessageInput().isDisplayed()).toBeTruthy();
    });

    it('should display input', () => {
      const el = page.getMessageInput();

      el.sendKeys('Hello').then(_ =>
        expect(el.getAttribute('value')).toBe('Hello')
      );
    });

    it('should not display error', () => {
      expect(page.getError().isPresent()).toBeFalsy();
    });

    it('should display error when focus then blur without input', () => {
      const messageEl = page.getMessageInput();
      const otherEl = page.getEmailInput();

      page
        .isClickable(messageEl)
        .then(() => messageEl.click())
        .then(() => page.isClickable(otherEl))
        .then(() => otherEl.click())
        .then(_ => {
          expect(page.getError().isDisplayed()).toBeTruthy();
          expect(page.getError().getText()).toContain('Message');
        });
    });
  });

  describe('Send', () => {
    it('should not be displayed', () => {
      expect(page.getSendButton().isPresent()).toBeFalsy();
    });

    describe('Name', () => {
      it('should be displayed on input', () => {
        page
          .getNameInput()
          .sendKeys('a')
          .then(_ => expect(page.getSendButton().isDisplayed()).toBeTruthy());
      });

      it('should be disabled on input', () => {
        page
          .getNameInput()
          .sendKeys('a')
          .then(_ => expect(page.getSendButton().isEnabled()).toBeFalsy());
      });
    });

    describe('Email', () => {
      it('should be displayed on input', () => {
        page
          .getEmailInput()
          .sendKeys('a')
          .then(_ => expect(page.getSendButton().isDisplayed()).toBeTruthy());
      });

      it('should be disabled on input', () => {
        page
          .getEmailInput()
          .sendKeys('a')
          .then(_ => expect(page.getSendButton().isEnabled()).toBeFalsy());
      });
    });

    describe('Message', () => {
      it('should be displayed on input', () => {
        page
          .getMessageInput()
          .sendKeys('a')
          .then(_ => expect(page.getSendButton().isDisplayed()).toBeTruthy());
      });

      it('should be disabled on input', () => {
        page
          .getMessageInput()
          .sendKeys('a')
          .then(_ => expect(page.getSendButton().isEnabled()).toBeFalsy());
      });
    });

    it('should be enabled on valid form complete', () => {
      page
        .getNameInput()
        .sendKeys('a')
        .then(() => page.getEmailInput().sendKeys('b@c'))
        .then(() => page.getMessageInput().sendKeys('d'))
        .then(_ => expect(page.getSendButton().isEnabled()).toBeTruthy());
    });

    it('should not be enabled on invalid form complete', () => {
      page
        .getNameInput()
        .sendKeys('a')
        .then(() => page.getEmailInput().sendKeys('b'))
        .then(() => page.getMessageInput().sendKeys('c'))
        .then(_ => expect(page.getSendButton().isEnabled()).toBeFalsy());
    });
  });

  describe('Legal text', () => {
    it('should not be displayed', () => {
      expect(page.getLegalText().isPresent()).toBeFalsy();
    });

    it('should be displayed on name input', () => {
      page
        .getNameInput()
        .sendKeys('a')
        .then(_ => expect(page.getLegalText().isDisplayed()).toBeTruthy());
    });

    it('should be displayed on email input', () => {
      page
        .getEmailInput()
        .sendKeys('a')
        .then(_ => expect(page.getLegalText().isDisplayed()).toBeTruthy());
    });

    it('should be displayed on message input', () => {
      page
        .getMessageInput()
        .sendKeys('a')
        .then(_ => expect(page.getLegalText().isDisplayed()).toBeTruthy());
    });
  });
});
