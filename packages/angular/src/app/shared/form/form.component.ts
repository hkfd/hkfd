import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoggerService } from '../logger.service';
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

  constructor(private logger: LoggerService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  submitForm() {
    this.logger.log('submitForm', this.form.value);
    this.formSent = true;
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }
}
