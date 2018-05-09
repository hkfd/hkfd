import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, retry, tap, map, flatMap, find } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { LoggerService } from './logger.service';
import { Api } from 'api';

@Injectable()
export class ApiService {
  services = 'api/services.json';
  caseStudies = 'api/case-studies.json';
  team = 'api/team.json';
  careers = 'api/careers.json';
  clients = 'api/clients.json';

  constructor(private http: HttpClient, private logger: LoggerService) {}

  getServices(): Observable<Api.Service[]> {
    return this.http
      .get<Api.Service[]>(this.services)
      .pipe(
        retry(3),
        tap((services: Api.Service[]) =>
          this.logger.log('getServices', services)
        ),
        catchError(this.handleError<Api.Service[]>('getServices', []))
      );
  }

  getCareers(): Observable<Api.Career[]> {
    return this.http
      .get<Api.Career[]>(this.careers)
      .pipe(
        retry(3),
        tap((careers: Api.Career[]) => this.logger.log('getCareers', careers)),
        catchError(this.handleError<Api.Career[]>('getCareers', []))
      );
  }

  getPost(type: string, id: string): Observable<Api.Post> {
    let url: string;
    switch (type) {
      case 'service':
        url = this.services;
        break;
      case 'work':
        url = this.caseStudies;
        break;
      default:
        return of(null);
    }

    return this.http
      .get<Api.Post[]>(url)
      .pipe(
        retry(3),
        flatMap((posts: Api.Post[]) => posts),
        find((post: Api.Post) => post.id === id),
        tap((post: Api.Post) => this.logger.log('getPost', post)),
        catchError(this.handleError<Api.Post>('getPost'))
      );
  }

  getCaseStudies(): Observable<Api.CaseStudy[]> {
    return this.http
      .get<Api.CaseStudy[]>(this.caseStudies)
      .pipe(
        retry(3),
        tap((caseStudies: Api.CaseStudy[]) =>
          this.logger.log('getCaseStudies', caseStudies)
        ),
        catchError(this.handleError<Api.CaseStudy[]>('getCaseStudies', []))
      );
  }

  getTeam(): Observable<Api.Team[]> {
    return this.http
      .get<Api.Team[]>(this.team)
      .pipe(
        retry(3),
        tap((team: Api.Team[]) => this.logger.log('getTeam', team)),
        catchError(this.handleError<Api.Team[]>('getTeam', []))
      );
  }

  getClients(): Observable<Api.Client[]> {
    return this.http
      .get<Api.Client[]>(this.clients)
      .pipe(
        retry(3),
        tap((clients: Api.Client[]) => this.logger.log('getClients', clients)),
        catchError(this.handleError<Api.Client[]>('getClients', []))
      );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(operation, error);
      return of(result as T);
    };
  }
}
