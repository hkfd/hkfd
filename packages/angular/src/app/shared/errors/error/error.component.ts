import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ErrorAnimations } from './error.animations';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  animations: ErrorAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {}
