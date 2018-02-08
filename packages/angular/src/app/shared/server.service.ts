import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, retry, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Page } from './page';

@Injectable()
export class ServerService {
  pages = 'api/pages.json';

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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }
}
