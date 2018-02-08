import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, retry, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Page } from './page';
import { Service } from './service';

@Injectable()
export class ServerService {
  pages = 'api/pages.json';
  services = 'api/services.json';

  constructor(private http: HttpClient) {}

  getPage(id: string): Observable<Page> {
    return this.http
      .get<Page>(this.pages)
      .pipe(
        retry(3),
        filter((page: Page) => page.id === id),
        tap((page: Page) => console.log('getPage', page)),
        catchError(this.handleError<Page>('getPage'))
      );
  }

  getPages(): Observable<Page[]> {
    return this.http
      .get<Page[]>(this.pages)
      .pipe(
        retry(3),
        tap((pages: Page[]) => console.log('getPages', pages)),
        catchError(this.handleError<Page[]>('getPages', []))
      );
  }

  getService(id: string): Observable<Service> {
    return this.http
      .get<Service>(this.services)
      .pipe(
        retry(3),
        filter((service: Service) => service.id === id),
        tap((service: Service) => console.log('getService', service)),
        catchError(this.handleError<Service>('getService'))
      );
  }

  getServices(): Observable<Service[]> {
    return this.http
      .get<Service[]>(this.services)
      .pipe(
        retry(3),
        tap((services: Service[]) => console.log('getServices', services)),
        catchError(this.handleError<Service[]>('getServices', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }
}
