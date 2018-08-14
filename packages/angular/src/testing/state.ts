export { TransferState } from '@angular/platform-browser';

// const CLIENTS_KEY = makeStateKey<Api.Client[]>('clients');

// getServices(): Observable<Api.Service[]> {
//   const cache = this.state.get<Api.Service[]>(SERVICES_KEY, null);
//   if (cache) return of(cache).pipe(tap(services => this.logger.log('getServices', 'cache', services)));
//
//   return this.http.get<Api.Service[]>(this.services).pipe(
//     retry(3),
//     tap((services: Api.Service[]) =>
//       this.logger.log('getServices', services)
//     ),
//     tap((services: Api.Service[]) =>
//       this.state.set(SERVICES_KEY, services)
//     ),
//     catchError(this.handleError<Api.Service[]>('getServices', []))
//   );
// }

export class MockTransferState {
  data = {};

  get(key: string, defaultReturn: any) {
    if (this.data[key]) return this.data[key];

    return defaultReturn;
  }

  set(key: string, data: {}) {
    this.data[key] = data;
  }
}

export function makeStateKey() {}
