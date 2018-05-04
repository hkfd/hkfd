import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, retry, tap, map, flatMap, find } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { LoggerService } from './logger.service';
import { Server } from './server';

@Injectable()
export class ApiService {
  services = 'api/services.json';
  caseStudies = 'api/case-studies.json';
  team = 'api/team.json';
  careers = 'api/careers.json';
  clients = 'api/clients.json';

  constructor(private http: HttpClient, private logger: LoggerService) {}

  getServices(): Observable<Server.Service[]> {
    return this.http
      .get<Server.Service[]>(this.services)
      .pipe(
        retry(3),
        tap((services: Server.Service[]) =>
          this.logger.log('getServices', services)
        ),
        catchError(this.handleError<Server.Service[]>('getServices', []))
      );
  }

  getCareers(): Observable<Server.Career[]> {
    return this.http
      .get<Server.Career[]>(this.careers)
      .pipe(
        retry(3),
        tap((careers: Server.Career[]) =>
          this.logger.log('getCareers', careers)
        ),
        catchError(this.handleError<Server.Career[]>('getCareers', []))
      );
  }

  getPost(type: string, id: string): Observable<Server.Post> {
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
      .get<Server.Post[]>(url)
      .pipe(
        retry(3),
        flatMap((posts: Server.Post[]) => posts),
        find((post: Server.Post) => post.id === id),
        tap((post: Server.Post) => this.logger.log('getPost', post)),
        catchError(this.handleError<Server.Post>('getPost'))
      );
  }

  getCaseStudies(): Observable<Server.CaseStudy[]> {
    return this.http
      .get<Server.CaseStudy[]>(this.caseStudies)
      .pipe(
        retry(3),
        tap((caseStudies: Server.CaseStudy[]) =>
          this.logger.log('getCaseStudies', caseStudies)
        ),
        catchError(this.handleError<Server.CaseStudy[]>('getCaseStudies', []))
      );
  }

  getTeam(): Observable<Server.Team[]> {
    return this.http
      .get<Server.Team[]>(this.team)
      .pipe(
        retry(3),
        tap((team: Server.Team[]) => this.logger.log('getTeam', team)),
        catchError(this.handleError<Server.Team[]>('getTeam', []))
      );
  }

  getClients(): Observable<Server.Client[]> {
    return this.http
      .get<Server.Client[]>(this.clients)
      .pipe(
        retry(3),
        tap((clients: Server.Client[]) =>
          this.logger.log('getClients', clients)
        ),
        catchError(this.handleError<Server.Client[]>('getClients', []))
      );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(operation, error);
      return of(result as T);
    };
  }
}
