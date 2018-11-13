import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoggerService, MockLoggerService, MockEmailService } from 'testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { EmailService } from 'shared';
import { FormComponent } from './form.component';

const app = window as any;
let comp: FormComponent;
let fixture: ComponentFixture<FormComponent>;
let emailService: EmailService;
let page: Page;

describe('FormComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      declarations: [FormComponent],
      providers: [
        FormBuilder,
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: EmailService, useClass: MockEmailService }
      ]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `form`', () => {
    expect(comp.form).toBeDefined();
  });

  it('should not set `formSent`', () => {
    expect(comp.formSent).toBeUndefined();
  });

  describe('`submitForm`', () => {
    it('should call `EmailService` `sendEmail` with `form.value` arg', () => {
      comp.form.controls.name.setValue('a');
      comp.form.controls.email.setValue('b@c');
      comp.form.controls.message.setValue('d');
      comp.submitForm();

      expect(emailService.sendEmail).toHaveBeenCalledWith({
        name: 'a',
        email: 'b@c',
        message: 'd'
      });
    });

    describe('Resolve', () => {
      beforeEach(() => comp.submitForm());

      it('should set `formSent` as `true`', () => {
        return fixture.whenStable().then(_ => {
          expect(comp.formSent).toBe(true);
        });
      });

      it('should call `ga` with args', () => {
        return fixture.whenStable().then(_ => {
          expect(app.ga).toHaveBeenCalledWith(
            'send',
            'event',
            'Contact Form',
            'sent'
          );
        });
      });
    });

    describe('Reject', () => {
      beforeEach(() => {
        (emailService.sendEmail as jasmine.Spy).and.returnValue(
          Promise.reject()
        );
        comp.submitForm();
      });

      it('should set `formSent` as `false`', () => {
        return fixture.whenStable().then(_ => {
          expect(comp.formSent).toBe(false);
        });
      });
    });
  });

  describe('Template', () => {
    describe('Form sent', () => {
      it('should be displayed if `formSent` is `true`', () => {
        comp.formSent = true;
        fixture.detectChanges();

        expect(page.formSentText).toBeTruthy();
      });

      it('should not be displayed if `formSent` is `false`', () => {
        comp.formSent = false;
        fixture.detectChanges();

        expect(page.formSentText).toBeFalsy();
      });
    });

    describe('Form', () => {
      describe('Name', () => {
        it('should be displayed', () => {
          expect(page.nameInput).toBeTruthy();
        });

        describe('Error', () => {
          it('should not be displayed', () => {
            expect(page.nameError).toBeFalsy();
          });

          describe('`invalid`', () => {
            beforeEach(() => {
              comp.form.controls.name.markAsPristine();
              comp.form.controls.name.setErrors({ invalid: true });
              fixture.detectChanges();
            });

            it('should not be displayed', () => {
              expect(page.nameError).toBeFalsy();
            });
          });

          describe('`touched`', () => {
            beforeEach(() => {
              comp.form.controls.name.markAsTouched();
              comp.form.controls.name.setErrors(null);
              fixture.detectChanges();
            });

            it('should not be displayed', () => {
              expect(page.nameError).toBeFalsy();
            });
          });

          describe('`invalid` and `touched`', () => {
            beforeEach(() => {
              comp.form.controls.name.markAsTouched();
              comp.form.controls.name.setErrors({ invalid: true });
              fixture.detectChanges();
            });

            it('should be displayed', () => {
              expect(page.nameError).toBeTruthy();
            });
          });
        });
      });

      describe('Email', () => {
        it('should be displayed', () => {
          expect(page.emailInput).toBeTruthy();
        });

        describe('Error', () => {
          it('should not be displayed', () => {
            expect(page.emailError).toBeFalsy();
          });

          describe('`invalid`', () => {
            beforeEach(() => {
              comp.form.controls.email.markAsPristine();
              comp.form.controls.email.setErrors({ invalid: true });
              fixture.detectChanges();
            });

            it('should not be displayed', () => {
              expect(page.emailError).toBeFalsy();
            });
          });

          describe('`touched`', () => {
            beforeEach(() => {
              comp.form.controls.email.markAsTouched();
              comp.form.controls.email.setErrors(null);
              fixture.detectChanges();
            });

            it('should not be displayed', () => {
              expect(page.emailError).toBeFalsy();
            });
          });

          describe('`invalid` and `touched`', () => {
            beforeEach(() => {
              comp.form.controls.email.markAsTouched();
              comp.form.controls.email.setErrors({ invalid: true });
              fixture.detectChanges();
            });

            it('should be displayed', () => {
              expect(page.emailError).toBeTruthy();
            });
          });
        });
      });

      describe('Message', () => {
        it('should be displayed', () => {
          expect(page.messageInput).toBeTruthy();
        });

        describe('Error', () => {
          it('should not be displayed', () => {
            expect(page.messageError).toBeFalsy();
          });

          describe('`invalid`', () => {
            beforeEach(() => {
              comp.form.controls.message.markAsPristine();
              comp.form.controls.message.setErrors({ invalid: true });
              fixture.detectChanges();
            });

            it('should not be displayed', () => {
              expect(page.messageError).toBeFalsy();
            });
          });

          describe('`touched`', () => {
            beforeEach(() => {
              comp.form.controls.message.markAsTouched();
              comp.form.controls.message.setErrors(null);
              fixture.detectChanges();
            });

            it('should not be displayed', () => {
              expect(page.messageError).toBeFalsy();
            });
          });

          describe('`invalid` and `touched`', () => {
            beforeEach(() => {
              comp.form.controls.message.markAsTouched();
              comp.form.controls.message.setErrors({ invalid: true });
              fixture.detectChanges();
            });

            it('should be displayed', () => {
              expect(page.messageError).toBeTruthy();
            });
          });
        });
      });

      describe('Footer', () => {
        it('should not be displayed', () => {
          expect(page.formFooter).toBeFalsy();
        });

        it('should be displayed if `dirty`', () => {
          comp.form.controls.message.markAsDirty();
          fixture.detectChanges();

          expect(page.formFooter).toBeTruthy();
        });

        it('should be displayed if `touched`', () => {
          comp.form.controls.message.markAsTouched();
          fixture.detectChanges();

          expect(page.formFooter).toBeTruthy();
        });

        describe('Legal text', () => {
          beforeEach(() => {
            comp.form.controls.message.markAsDirty();
            fixture.detectChanges();
          });

          it('should be displayed', () => {
            expect(page.legalText).toBeTruthy();
          });
        });

        describe('Send', () => {
          beforeEach(() => {
            comp.form.controls.message.markAsDirty();
            fixture.detectChanges();
          });

          it('should be displayed', () => {
            expect(page.formSend).toBeTruthy();
          });

          describe('Disabled', () => {
            it('should not be disabled', () => {
              comp.form.controls.name.setValue('a');
              comp.form.controls.email.setValue('b@c');
              comp.form.controls.message.setValue('d');
              fixture.detectChanges();

              expect(page.formSend.disabled).toBe(false);
            });

            it('should be disabled if `invalid`', () => {
              comp.form.controls.name.setValue('');
              comp.form.controls.email.setValue('a');
              comp.form.controls.message.setValue('');
              fixture.detectChanges();

              expect(page.formSend.disabled).toBe(true);
            });

            it('should be disabled if `formSent` is `true`', () => {
              comp.form.controls.name.setValue('a');
              comp.form.controls.email.setValue('b@c');
              comp.form.controls.message.setValue('d');
              comp.formSent = true;
              fixture.detectChanges();

              expect(page.formSend.disabled).toBe(true);
            });

            it('should be disabled if `formSent` is `false`', () => {
              comp.form.controls.name.setValue('a');
              comp.form.controls.email.setValue('b@c');
              comp.form.controls.message.setValue('d');
              comp.formSent = false;
              fixture.detectChanges();

              expect(page.formSend.disabled).toBe(true);
            });
          });

          describe('Error', () => {
            it('should not be displayed', () => {
              expect(page.formSendError).toBeFalsy();
            });

            it('should be displayed if `formSent` is `false`', () => {
              comp.formSent = false;
              fixture.detectChanges();

              expect(page.formSendError).toBeTruthy();
            });
          });
        });
      });
    });
  });
});

class Page {
  createForm: jasmine.Spy;
  submitForm: jasmine.Spy;

  get formSentText() {
    return this.query<HTMLParagraphElement>('#form-sent');
  }
  get nameInput() {
    return this.query<HTMLInputElement>('.input:nth-of-type(1) #name');
  }
  get nameError() {
    return this.query<HTMLParagraphElement>('.input:nth-of-type(1) .error');
  }
  get emailInput() {
    return this.query<HTMLInputElement>('.input:nth-of-type(2) #email');
  }
  get emailError() {
    return this.query<HTMLParagraphElement>('.input:nth-of-type(2) .error');
  }
  get messageInput() {
    return this.query<HTMLTextAreaElement>('.input:nth-of-type(3) #message');
  }
  get messageError() {
    return this.query<HTMLParagraphElement>('.input:nth-of-type(3) .error');
  }
  get formFooter() {
    return this.query<HTMLDivElement>('#form-footer');
  }
  get legalText() {
    return this.query<HTMLElement>('#form-footer small');
  }
  get formSend() {
    return this.query<HTMLButtonElement>('#form-footer button');
  }
  get formSendError() {
    return this.query<HTMLParagraphElement>('#form-footer .error');
  }

  constructor() {
    this.createForm = spyOn(comp, 'createForm').and.callThrough();
    this.submitForm = spyOn(comp, 'submitForm').and.callThrough();
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(FormComponent);
  comp = fixture.componentInstance;
  app.ga = jasmine.createSpy('ga');
  emailService = fixture.debugElement.injector.get<EmailService>(EmailService);
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
