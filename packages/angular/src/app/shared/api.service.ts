import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, retry, tap, flatMap, find } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { LoggerService } from './logger.service';
import { Page } from './page';
import { Service } from './service';
import { CaseStudy } from './case-study';
import { Team } from './team';

@Injectable()
export class ApiService {
  pages = 'api/pages.json';
  services = 'api/services.json';
  caseStudies = 'api/case-studies.json';
  team = 'api/team.json';

  constructor(private http: HttpClient, private logger: LoggerService) {}

  getPage(id: string): Observable<Page> {
    return this.http
      .get<Page[]>(this.pages)
      .pipe(
        retry(3),
        flatMap((pages: Page[]) => pages),
        find((page: Page) => page.id === id),
        tap((page: Page) => this.logger.log('getPage', page)),
        catchError(this.handleError<Page>('getPage'))
      );
  }

  getPages(): Observable<Page[]> {
    return this.http
      .get<Page[]>(this.pages)
      .pipe(
        retry(3),
        tap((pages: Page[]) => this.logger.log('getPages', pages)),
        catchError(this.handleError<Page[]>('getPages', []))
      );
  }

  getServices(): Observable<Service[]> {
    return this.http
      .get<Service[]>(this.services)
      .pipe(
        retry(3),
        tap((services: Service[]) => this.logger.log('getServices', services)),
        catchError(this.handleError<Service[]>('getServices', []))
      );
  }

  getPost(type: string, id: string): Observable<CaseStudy | Service> {
    let url;
    if (type === 'service') url = this.services;
    if (type === 'work') url = this.caseStudies;

    return this.http
      .get<CaseStudy[] | Service[]>(url)
      .pipe(
        retry(3),
        flatMap((posts: any) => posts),
        find((post: CaseStudy | Service) => post.id === id),
        tap((post: CaseStudy | Service) => this.logger.log('getPost', post)),
        catchError(this.handleError<CaseStudy | Service>('getPost'))
      );
  }

  getCaseStudies(): Observable<CaseStudy[]> {
    return this.http
      .get<CaseStudy[]>(this.caseStudies)
      .pipe(
        retry(3),
        tap((caseStudies: CaseStudy[]) =>
          this.logger.log('getCaseStudies', caseStudies)
        ),
        catchError(this.handleError<CaseStudy[]>('getCaseStudies', []))
      );
  }

  getTeam(): Observable<Team[]> {
    return this.http
      .get<Team[]>(this.team)
      .pipe(
        retry(3),
        tap((team: Team[]) => this.logger.log('getTeam', team)),
        catchError(this.handleError<Team[]>('getTeam', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(operation, error);
      return of(result as T);
    };
  }
}
