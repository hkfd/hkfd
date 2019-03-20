import { TestBed, async } from '@angular/core/testing';
import { StubMatSnackBar } from 'testing';

import { MatSnackBar } from '@angular/material';

import { NotificationService } from './notification.service';

let matSnackBar: MatSnackBar;
let notificationService: NotificationService;

describe('NotificationService', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MatSnackBar, useClass: StubMatSnackBar }
      ]
    }).compileComponents()));

  beforeEach(async(() => createService()));

  it('should create service', () => {
    expect(notificationService).toBeTruthy();
  });

  describe('`dismissMessage`', () => {
    it('should call `messageComponent` `dismiss` if has `messageComponent`', () => {
      (notificationService as any).messageComponent = {
        dismiss: jest.fn()
      } as any;
      notificationService.dismissMessage();

      expect(
        (notificationService as any).messageComponent.dismiss
      ).toHaveBeenCalled();
    });

    it('should not throw if no `messageComponent`', () => {
      (notificationService as any).messageComponent = undefined;

      expect(() => notificationService.dismissMessage()).not.toThrow();
    });
  });

  describe('`displayMessage`', () => {
    it('should set `messageComponent`', () => {
      (notificationService as any).messageComponent = undefined;
      notificationService.displayMessage('');

      expect((notificationService as any).messageComponent).toBeDefined();
    });

    describe('Has `options`', () => {
      it('should call `snackBar` `open` with `options` and no timeout', () => {
        notificationService.displayMessage('Message', { action: 'Retry' });

        expect(matSnackBar.open).toHaveBeenCalledWith(
          'Message',
          'Retry',
          undefined
        );
      });

      it('should return `messageComponent` `onAction`', () => {
        const res = notificationService.displayMessage('Message', {
          action: 'Retry'
        });

        expect(res).toBe('onAction');
      });
    });

    describe('No `options`', () => {
      it('should call `snackBar` `open` with timeout', () => {
        notificationService.displayMessage('Message');

        expect(matSnackBar.open).toHaveBeenCalledWith('Message', undefined, {
          duration: 2000
        });
      });

      it('should return void', () => {
        const res = notificationService.displayMessage('Message');

        expect(res).toBeUndefined();
      });
    });
  });
});

function createService() {
  notificationService = TestBed.get(NotificationService);
  matSnackBar = TestBed.get(MatSnackBar);
}
