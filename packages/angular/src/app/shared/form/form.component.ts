import {
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { LoggerService, EmailService, NotificationService } from 'shared';
import { FormAnimations } from './form.animations';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: FormAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnDestroy {
  form: FormGroup;
  formSent: boolean | undefined;
  notificationSub: Subscription | undefined;

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
    private changeDetectorRef: ChangeDetectorRef,
    private logger: LoggerService,
    private emailService: EmailService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  submitForm() {
    this.logger.log('submitForm', this.form.value);

    this.emailService.sendEmail(this.form.value).then(
      _ => {
        this.formSent = true;
        ga('send', 'event', 'Contact Form', 'sent');
        this.changeDetectorRef.markForCheck();
      },
      _ => {
        this.notificationSub = this.notificationService
          .displayMessage(`Couldn't send form`, { action: 'Retry' })
          .subscribe(this.submitForm.bind(this));
      }
    );
  }

  ngOnDestroy() {
    this.notificationSub && this.notificationSub.unsubscribe();
  }
}
