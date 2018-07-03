import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoggerService, FormService } from 'shared';
import { FormAnimations } from './form.animations';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: FormAnimations
})
export class FormComponent {
  form: FormGroup;
  formSent: boolean;

  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get message() {
    return this.form.get('message');
  }

  constructor(
    private logger: LoggerService,
    private formService: FormService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  submitForm() {
    this.logger.log('submitForm', this.form.value);

    this.formService.sendEmail(this.form.value).then(
      _ => {
        this.formSent = true;
        ga('send', 'event', 'Contact Form', 'sent');
      },
      err => {
        this.logger.error('submitForm', err);
        this.formSent = false;
      }
    );
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }
}
