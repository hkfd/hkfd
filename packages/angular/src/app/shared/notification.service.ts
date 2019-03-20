import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

interface DisplayMessageOptions {
  action: string;
}
type DisplayMessageReturn<T> = T extends DisplayMessageOptions
  ? Observable<void>
  : void;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageComponent: MatSnackBarRef<SimpleSnackBar> | undefined;

  constructor(private snackBar: MatSnackBar) {}

  dismissMessage(): void {
    this.messageComponent && this.messageComponent.dismiss();
  }

  displayMessage<T extends DisplayMessageOptions | undefined = undefined>(
    message: string,
    options?: T
  ): DisplayMessageReturn<T> {
    this.messageComponent = this.snackBar.open(
      message,
      options && options.action,
      options ? undefined : { duration: 2000 }
    );

    if (options) return this.messageComponent.onAction() as any;
    return undefined as any;
  }
}
