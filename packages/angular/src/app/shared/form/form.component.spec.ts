import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MockFormService } from '../../../testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { LoggerService } from '../logger.service';
import { FormService } from '../form.service';
import { FormComponent } from './form.component';

const app = <any>window;
let comp: FormComponent;
let fixture: ComponentFixture<FormComponent>;
let page: Page;
let formService: FormServiceStub;

describe('FormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      declarations: [FormComponent],
      providers: [
        LoggerService,
        FormBuilder,
        { provide: FormService, useClass: MockFormService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should set form', () => {
    expect(comp.form).toBeDefined();
  });

  it('should not set formSent', () => {
    expect(comp.formSent).toBeUndefined();
  });

  it('should not display form sent', () => {
    const formSent = fixture.debugElement.query(By.css('#form-sent'));

    expect(formSent).toBeFalsy();
  });

  it('should not display legal text', () => {
    const legal = fixture.debugElement.query(By.css('small'));

    expect(legal).toBeFalsy();
  });

  it('should not display submit button', () => {
    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );

    expect(submitButton).toBeFalsy();
  });

  describe('name', () => {
    it('should display name field', () => {
      expect(page.nameInput).toBeTruthy();
    });

    it('should display empty name field', () => {
      expect(page.nameInput.nativeElement.textContent).toBe('');
    });

    it('should not display name error', () => {
      const inputError = fixture.debugElement.query(By.css('.error'));

      expect(inputError).toBeFalsy();
    });

    it('should set form name on input', () => {
      comp.form.controls.name.setValue('Name Surname');
      fixture.detectChanges();

      expect(comp.form.value.name).toBe('Name Surname');
    });

    it('should display name error on touched and invalid', () => {
      comp.form.controls.name.markAsTouched();
      comp.form.controls.name.setErrors({ invalid: true });
      fixture.detectChanges();
      const inputError = fixture.debugElement.query(By.css('.error'));

      expect(inputError).toBeTruthy();
    });
  });

  describe('email', () => {
    it('should display email field', () => {
      expect(page.emailInput).toBeTruthy();
    });

    it('should display empty email field', () => {
      expect(page.emailInput.nativeElement.textContent).toBe('');
    });

    it('should not display email error', () => {
      const inputError = fixture.debugElement.query(By.css('.error'));

      expect(inputError).toBeFalsy();
    });

    it('should set form email on input', () => {
      comp.form.controls.email.setValue('name@example.com');
      fixture.detectChanges();

      expect(comp.form.value.email).toBe('name@example.com');
    });

    it('should display email error on touched and invalid', () => {
      comp.form.controls.email.markAsTouched();
      comp.form.controls.email.setErrors({ invalid: true });
      fixture.detectChanges();
      const inputError = fixture.debugElement.query(By.css('.error'));

      expect(inputError).toBeTruthy();
    });

    it('should display email error on touched and invalid email', () => {
      comp.form.controls.email.markAsTouched();
      comp.form.controls.email.setValue('email');
      fixture.detectChanges();
      const inputError = fixture.debugElement.query(By.css('.error'));

      expect(inputError).toBeTruthy();
    });
  });

  describe('message', () => {
    it('should display message field', () => {
      expect(page.messageInput).toBeTruthy();
    });

    it('should display empty message field', () => {
      expect(page.messageInput.nativeElement.textContent).toBe('');
    });

    it('should not display message error', () => {
      const inputError = fixture.debugElement.query(By.css('.error'));

      expect(inputError).toBeFalsy();
    });

    it('should set form message on input', () => {
      comp.form.controls.message.setValue('Hello');
      fixture.detectChanges();

      expect(comp.form.value.message).toBe('Hello');
    });

    it('should display message error on touched and invalid', () => {
      comp.form.controls.message.markAsTouched();
      comp.form.controls.message.setErrors({ invalid: true });
      fixture.detectChanges();
      const inputError = fixture.debugElement.query(By.css('.error'));

      expect(inputError).toBeTruthy();
    });
  });

  it('should display legal text on touched', () => {
    comp.form.markAsTouched();
    fixture.detectChanges();

    const legal = fixture.debugElement.query(By.css('small'));

    expect(legal).toBeTruthy();
  });

  it('should display submit button on touched', () => {
    comp.form.markAsTouched();
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );

    expect(submitButton).toBeTruthy();
  });

  it('should display disabled submit button on touched', () => {
    comp.form.markAsTouched();
    fixture.detectChanges();

    const submitButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;

    expect(submitButton.disabled).toBe(true);
  });

  it('should display enabled submit button on touched and valid', () => {
    comp.form.markAsTouched();
    comp.form.controls.name.setValue('a');
    comp.form.controls.email.setValue('b@c');
    comp.form.controls.message.setValue('d');
    fixture.detectChanges();

    const submitButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;

    expect(submitButton.disabled).toBe(false);
  });

  describe('submitForm', () => {
    it('should call FormService sendEmail', () => {
      comp.submitForm();

      expect(formService.sendEmail).toHaveBeenCalled();
    });

    it('should call FormService sendEmail with form value arg', () => {
      comp.form.controls.name.setValue('a');
      comp.form.controls.email.setValue('b@c');
      comp.form.controls.message.setValue('d');
      comp.submitForm();

      expect(formService.sendEmail).toHaveBeenCalledWith({
        name: 'a',
        email: 'b@c',
        message: 'd'
      });
    });

    describe('resolve', () => {
      it(`should set formSent as 'true'`, async(() => {
        comp.form.markAsTouched();
        comp.form.controls.name.setValue('a');
        comp.form.controls.email.setValue('b@c');
        comp.form.controls.message.setValue('d');
        comp.submitForm();
        fixture.detectChanges();

        return fixture.whenStable().then(_ => {
          fixture.detectChanges();

          expect(comp.formSent).toBe(true);
        });
      }));

      it('should show form sent', async(() => {
        comp.form.markAsTouched();
        comp.form.controls.name.setValue('a');
        comp.form.controls.email.setValue('b@c');
        comp.form.controls.message.setValue('d');
        comp.submitForm();
        fixture.detectChanges();

        return fixture.whenStable().then(_ => {
          fixture.detectChanges();
          const formSent = fixture.debugElement.query(By.css('#form-sent'));

          expect(formSent).toBeTruthy();
        });
      }));

      it('should not show error', async(() => {
        comp.form.markAsTouched();
        comp.form.controls.name.setValue('a');
        comp.form.controls.email.setValue('b@c');
        comp.form.controls.message.setValue('d');
        comp.submitForm();
        fixture.detectChanges();

        return fixture.whenStable().then(_ => {
          fixture.detectChanges();
          const error = fixture.debugElement.query(By.css('.error'));

          expect(error).toBeFalsy();
        });
      }));

      it('should disable submit button', async(() => {
        comp.form.markAsTouched();
        comp.submitForm();
        fixture.detectChanges();

        return fixture.whenStable().then(_ => {
          fixture.detectChanges();
          const submitButton: HTMLButtonElement = fixture.debugElement.query(
            By.css('button[type="submit"]')
          ).nativeElement;

          expect(submitButton.disabled).toBe(true);
        });
      }));

      it('should call ga', async(() => {
        comp.form.controls.name.setValue('a');
        comp.form.controls.email.setValue('b@c');
        comp.form.controls.message.setValue('d');
        comp.submitForm();
        fixture.detectChanges();

        return fixture.whenStable().then(_ => {
          fixture.detectChanges();

          expect(app.ga).toHaveBeenCalled();
        });
      }));

      it('should call ga with params', async(() => {
        comp.form.controls.name.setValue('a');
        comp.form.controls.email.setValue('b@c');
        comp.form.controls.message.setValue('d');
        comp.submitForm();
        fixture.detectChanges();

        return fixture.whenStable().then(_ => {
          fixture.detectChanges();

          expect(app.ga).toHaveBeenCalledWith(
            'send',
            'event',
            'Contact Form',
            jasmine.any(String)
          );
        });
      }));
    });

    describe('reject', () => {
      it(`should set formSent as 'false'`, async(() => {
        comp.submitForm();
        fixture.detectChanges();

        return fixture.whenStable().then(_ => {
          fixture.detectChanges();

          expect(comp.formSent).toBe(false);
        });
      }));

      it('should show error', async(() => {
        comp.form.markAsTouched();
        comp.submitForm();
        fixture.detectChanges();

        return fixture.whenStable().then(_ => {
          fixture.detectChanges();
          const error = fixture.debugElement.query(By.css('.error'));

          expect(error).toBeTruthy();
        });
      }));

      it('should not show form sent', async(() => {
        comp.form.markAsTouched();
        comp.submitForm();
        fixture.detectChanges();

        return fixture.whenStable().then(_ => {
          fixture.detectChanges();
          const formSent = fixture.debugElement.query(By.css('#form-sent'));

          expect(formSent).toBeFalsy();
        });
      }));

      it('should disable submit button', async(() => {
        comp.form.markAsTouched();
        comp.submitForm();
        fixture.detectChanges();

        return fixture.whenStable().then(_ => {
          fixture.detectChanges();
          const submitButton: HTMLButtonElement = fixture.debugElement.query(
            By.css('button[type="submit"]')
          ).nativeElement;

          expect(submitButton.disabled).toBe(true);
        });
      }));
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(FormComponent);
  comp = fixture.componentInstance;
  page = new Page();
  formService = new FormServiceStub();
  new GoogleAnalytics();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class GoogleAnalytics {
  constructor() {
    app.ga = jasmine.createSpy('ga');
  }
}

class FormServiceStub {
  sendEmail: jasmine.Spy;

  constructor() {
    const formService = fixture.debugElement.injector.get(FormService);

    this.sendEmail = spyOn(formService, 'sendEmail').and.callThrough();
  }
}

class Page {
  submitForm: jasmine.Spy;

  nameInput: DebugElement;
  emailInput: DebugElement;
  messageInput: DebugElement;

  constructor() {
    this.submitForm = spyOn(comp, 'submitForm').and.callThrough();
  }

  addElements() {
    this.nameInput = fixture.debugElement.query(By.css('#name'));
    this.emailInput = fixture.debugElement.query(By.css('#email'));
    this.messageInput = fixture.debugElement.query(By.css('#message'));
  }
}
