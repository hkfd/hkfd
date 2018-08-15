import { Injectable, Inject, Optional } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';
import { catchError, retry, tap, flatMap, find } from 'rxjs/operators';

import { LoggerService } from './logger.service';
import { Api } from 'api';

const SERVICES_KEY = makeStateKey<Api.Service[]>('api-services');
const CAREERS_KEY = makeStateKey<Api.Career[]>('api-careers');
const CAREER_KEY = makeStateKey<Api.Career>('api-career');
const POST_KEY = makeStateKey<Api.Post>('api-post');
const CASE_STUDIES_KEY = makeStateKey<Api.CaseStudy[]>('api-case-studies');
const TEAM_KEY = makeStateKey<Api.Team[]>('api-team');
const CLIENTS_KEY = makeStateKey<Api.Client[]>('api-clients');

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  services = 'api/services.json';
  caseStudies = 'api/case-studies.json';
  team = 'api/team.json';
  careers = 'api/careers.json';
  clients = 'api/clients.json';

  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private state: TransferState,
    @Optional()
    @Inject(APP_BASE_HREF)
    origin: string
  ) {
    if (!origin) return;

    this.services = `${origin}${this.services}`;
    this.caseStudies = `${origin}${this.caseStudies}`;
    this.team = `${origin}${this.team}`;
    this.careers = `${origin}${this.careers}`;
    this.clients = `${origin}${this.clients}`;
  }

  getServices(): Observable<Api.Service[]> {
    const cache = this.state.get<Api.Service[]>(SERVICES_KEY, null);
    if (cache)
      return of(cache).pipe(
        tap(services => this.logger.log('getServices', 'cache', services)),
        catchError(this.handleError<Api.Service[]>('getServices', []))
      );

    return this.http.get<Api.Service[]>(this.services).pipe(
      retry(3),
      tap((services: Api.Service[]) =>
        this.logger.log('getServices', services)
      ),
      tap((services: Api.Service[]) => this.state.set(SERVICES_KEY, services)),
      catchError(this.handleError<Api.Service[]>('getServices', []))
    );
  }

  getCareers(): Observable<Api.Career[]> {
    const cache = this.state.get<Api.Career[]>(CAREERS_KEY, null);
    if (cache)
      return of(cache).pipe(
        tap(careers => this.logger.log('getCareers', 'cache', careers)),
        catchError(this.handleError<Api.Career[]>('getCareers', []))
      );

    return this.http.get<Api.Career[]>(this.careers).pipe(
      retry(3),
      tap((careers: Api.Career[]) => this.logger.log('getCareers', careers)),
      tap((careers: Api.Career[]) => this.state.set(CAREERS_KEY, careers)),
      catchError(this.handleError<Api.Career[]>('getCareers', []))
    );
  }

  getCareer(id: string): Observable<Api.Career> {
    const cache = this.state.get<Api.Career>(CAREER_KEY, null);
    if (cache)
      return of(cache).pipe(
        tap(career => this.logger.log('getCareer', 'cache', career)),
        catchError(this.handleError<Api.Career>('getCareer'))
      );

    return this.http.get<Api.Career[]>(this.careers).pipe(
      retry(3),
      flatMap((careers: Api.Career[]) => careers),
      find((career: Api.Career) => career.id === id),
      tap((career: Api.Career) => this.logger.log('getCareer', career)),
      tap((career: Api.Career) => this.state.set(CAREER_KEY, career)),
      catchError(this.handleError<Api.Career>('getCareer'))
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

    const cache = this.state.get<Api.Post>(POST_KEY, null);
    if (cache)
      return of(cache).pipe(
        tap(post => this.logger.log('getPost', 'cache', post)),
        catchError(this.handleError<Api.Post>('getPost'))
      );

    return this.http.get<Api.Post[]>(url).pipe(
      retry(3),
      flatMap((posts: Api.Post[]) => posts),
      find((post: Api.Post) => post.id === id),
      tap((post: Api.Post) => this.logger.log('getPost', post)),
      tap((post: Api.Post) => this.state.set(POST_KEY, post)),
      catchError(this.handleError<Api.Post>('getPost'))
    );
  }

  getCaseStudies(): Observable<Api.CaseStudy[]> {
    const cache = this.state.get<Api.CaseStudy[]>(CASE_STUDIES_KEY, null);
    if (cache)
      return of(cache).pipe(
        tap(caseStudies =>
          this.logger.log('getCaseStudies', 'cache', caseStudies)
        ),
        catchError(this.handleError<Api.CaseStudy[]>('getCaseStudies', []))
      );

    return this.http.get<Api.CaseStudy[]>(this.caseStudies).pipe(
      retry(3),
      tap((caseStudies: Api.CaseStudy[]) =>
        this.logger.log('getCaseStudies', caseStudies)
      ),
      tap((caseStudies: Api.CaseStudy[]) =>
        this.state.set(CASE_STUDIES_KEY, caseStudies)
      ),
      catchError(this.handleError<Api.CaseStudy[]>('getCaseStudies', []))
    );
  }

  getTeam(): Observable<Api.Team[]> {
    const cache = this.state.get<Api.Team[]>(TEAM_KEY, null);
    if (cache)
      return of(cache).pipe(
        tap(team => this.logger.log('getTeam', 'cache', team)),
        catchError(this.handleError<Api.Team[]>('getTeam', []))
      );

    return this.http.get<Api.Team[]>(this.team).pipe(
      retry(3),
      tap((team: Api.Team[]) => this.logger.log('getTeam', team)),
      tap((team: Api.Team[]) => this.state.set(TEAM_KEY, team)),
      catchError(this.handleError<Api.Team[]>('getTeam', []))
    );
  }

  getClients(): Observable<Api.Client[]> {
    const cache = this.state.get<Api.Client[]>(CLIENTS_KEY, null);
    if (cache)
      return of(cache).pipe(
        tap(clients => this.logger.log('getClients', 'cache', clients)),
        catchError(this.handleError<Api.Client[]>('getClients', []))
      );

    return this.http.get<Api.Client[]>(this.clients).pipe(
      retry(3),
      tap((clients: Api.Client[]) => this.logger.log('getClients', clients)),
      tap((clients: Api.Client[]) => this.state.set(CLIENTS_KEY, clients)),
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
