import { Observable, of } from 'rxjs';

export class MockNotificationService {
  constructor() {
    jest.spyOn(this, 'dismissMessage');
    jest.spyOn(this, 'displayMessage');
  }

  dismissMessage(): void {}

  displayMessage(): Observable<void> {
    return of(undefined);
  }
}
