import { async } from '@angular/core/testing';

import { of, throwError, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { catchNetworkError } from './operators';

describe('`catchNetworkError`', () => {
  describe('Has error', () => {
    it('should call `actionHandler` arg', async(() => {
      const spy = jest.fn().mockReturnValue(throwError(''));

      throwError('')
        .pipe(catchNetworkError(spy))
        .subscribe(res => fail(res), _ => expect(spy).toHaveBeenCalled());
    }));

    it('should subscribe to original observable again if `actionHandler` emits value', async(() => {
      const actionHandler = new Subject();
      const spy = jest.fn();
      let FIRST_RUN = true;

      throwError('')
        .pipe(
          tap(spy, spy),
          catchError(err => {
            if (!FIRST_RUN) return of(err);

            FIRST_RUN = false;
            return throwError(err);
          }),
          catchNetworkError(() => actionHandler as any)
        )
        .subscribe(_ => expect(spy).toHaveBeenCalledTimes(2), err => fail(err));

      actionHandler.next();
      (expect as any).hasAssertions();
    }));

    it('should not subscribe to original observable again if `actionHandler` completes', async(() => {
      const actionHandler = new Subject();
      const spy = jest.fn();
      let FIRST_RUN = true;

      throwError('')
        .pipe(
          tap(spy, spy),
          catchError(err => {
            if (!FIRST_RUN) return of(err);

            FIRST_RUN = false;
            return throwError(err);
          }),
          catchNetworkError(() => actionHandler as any)
        )
        .subscribe(
          res => fail(res),
          err => fail(err),
          () => expect(spy).toHaveBeenCalledTimes(1)
        );

      actionHandler.complete();
      (expect as any).hasAssertions();
    }));

    it('should return repeated original observable if `actionHandler` emits value', async(() => {
      const actionHandler = new Subject();
      const spy = jest.fn();
      let FIRST_RUN = true;

      throwError('result')
        .pipe(
          tap(spy, spy),
          catchError(err => {
            if (!FIRST_RUN) return of(err);

            FIRST_RUN = false;
            return throwError(err);
          }),
          catchNetworkError(() => actionHandler as any)
        )
        .subscribe(res => expect(res).toBe('result'), err => fail(err));

      actionHandler.next('value');
      (expect as any).hasAssertions();
    }));

    it('should not subscribe to original observable again if `actionHandler` errors', async(() => {
      const actionHandler = new Subject();
      const spy = jest.fn();
      let FIRST_RUN = true;

      throwError('')
        .pipe(
          tap(spy, spy),
          catchError(err => {
            if (!FIRST_RUN) return of(err);

            FIRST_RUN = false;
            return throwError(err);
          }),
          catchNetworkError(() => actionHandler as any)
        )
        .subscribe(res => fail(res), _ => expect(spy).toHaveBeenCalledTimes(1));

      actionHandler.error('error');
      (expect as any).hasAssertions();
    }));
  });

  describe('No error', () => {
    it('should not call `actionHandler` arg', async(() => {
      const spy = jest.fn().mockReturnValue(throwError(''));

      of('')
        .pipe(catchNetworkError(spy))
        .subscribe(_ => expect(spy).not.toHaveBeenCalled(), err => fail(err));
      (expect as any).hasAssertions();
    }));

    it('should return original observable', async(() => {
      const spy = jest.fn().mockReturnValue(throwError(''));

      of('result')
        .pipe(catchNetworkError(spy))
        .subscribe(res => expect(res).toBe('result'), err => fail(err));
      (expect as any).hasAssertions();
    }));
  });
});
