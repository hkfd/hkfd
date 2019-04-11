import { Observable, UnaryFunction, pipe } from 'rxjs';
import { catchError, concatMapTo } from 'rxjs/operators';

export const catchNetworkError = <T>(
  actionHandler: () => Observable<void>
): UnaryFunction<Observable<T>, Observable<T>> =>
  pipe(
    catchError((_, req: Observable<T>) =>
      actionHandler().pipe(concatMapTo(req))
    )
  );
