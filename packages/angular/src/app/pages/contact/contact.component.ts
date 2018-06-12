import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TitleService, LoggerService } from '../../shared/shared.module';
import { ContactImages } from './contact.images';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  images = ContactImages;

  contactForm: FormGroup;

  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get message() {
    return this.contactForm.get('message');
  }

  constructor(
    private titleService: TitleService,
    private formBuilder: FormBuilder,
    private logger: LoggerService
  ) {
    this.createForm();
  }

  createForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  submitForm() {
    this.logger.log('submitForm', this.contactForm.value);
  }

  ngOnInit() {
    this.titleService.setTitle('Contact');
  }
}
