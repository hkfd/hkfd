import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';
import { tap, flatMap, find } from 'rxjs/operators';

import { environment } from 'environment';
import { LoggerService } from './logger.service';
import { Service, Career, CaseStudy, Team, Client } from 'api';
import { SERVICES, CASE_STUDIES, getPostUrl } from './api.helpers';

const TEAM = `${environment.api.url}team.json`;
const CAREERS = `${environment.api.url}careers.json`;
const CLIENTS = `${environment.api.url}clients.json`;

const SERVICES_KEY = makeStateKey<Service[]>('api-services');
const CAREERS_KEY = makeStateKey<Career[]>('api-careers');
const CAREER_KEY = makeStateKey<Career>('api-career');
const POST_KEY = makeStateKey<Post>('api-post');
const CASE_STUDIES_KEY = makeStateKey<CaseStudy[]>('api-case-studies');
const TEAM_KEY = makeStateKey<Team[]>('api-team');
const CLIENTS_KEY = makeStateKey<Client[]>('api-clients');

export type Post = CaseStudy | Service;
export type PostType = 'service' | 'work';
type getPost<T> = T extends any
  ? T extends 'service'
    ? Service
    : T extends 'work'
    ? CaseStudy
    : never
  : never;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private state: TransferState
  ) {}

  getServices(): Observable<Service[]> {
    const cache = this.state.get<Service[] | null>(SERVICES_KEY, null);
    if (cache) {
      return of(cache).pipe(
        tap(services => this.logger.log('getServices', 'cache', services))
      );
    }

    return this.http.get<Service[]>(SERVICES).pipe(
      tap(services => this.logger.log('getServices', services)),
      tap(services => this.state.set(SERVICES_KEY, services))
    );
  }

  getCareers(): Observable<Career[]> {
    const cache = this.state.get<Career[] | null>(CAREERS_KEY, null);
    if (cache) {
      return of(cache).pipe(
        tap(careers => this.logger.log('getCareers', 'cache', careers))
      );
    }

    return this.http.get<Career[]>(CAREERS).pipe(
      tap(careers => this.logger.log('getCareers', careers)),
      tap(careers => this.state.set(CAREERS_KEY, careers))
    );
  }

  getCareer(id: string): Observable<Career | undefined> {
    const cache = this.state.get<Career | null>(CAREER_KEY, null);
    if (cache && cache.id === id) {
      return of(cache).pipe(
        tap(career => this.logger.log('getCareer', 'cache', career))
      );
    }

    return this.http.get<Career[]>(CAREERS).pipe(
      flatMap(careers => careers),
      find(career => career.id === id),
      tap(career => this.logger.log('getCareer', career)),
      tap(career => this.state.set(CAREER_KEY, career))
    );
  }

  getPost<T extends PostType>(
    type: T,
    id: string
  ): Observable<getPost<T> | undefined> {
    const url = getPostUrl(type);

    const cache = this.state.get<getPost<T> | null>(POST_KEY, null);
    if (cache && cache.id === id) {
      return of(cache).pipe(
        tap(post => this.logger.log('getPost', 'cache', post))
      );
    }

    return this.http.get<Array<getPost<T>>>(url).pipe(
      flatMap(posts => posts),
      find(post => post.id === id),
      tap(post => this.logger.log('getPost', post)),
      tap(post => this.state.set(POST_KEY, post))
    );
  }

  getCaseStudies(): Observable<CaseStudy[]> {
    const cache = this.state.get<CaseStudy[] | null>(CASE_STUDIES_KEY, null);
    if (cache) {
      return of(cache).pipe(
        tap(caseStudies =>
          this.logger.log('getCaseStudies', 'cache', caseStudies)
        )
      );
    }

    return this.http.get<CaseStudy[]>(CASE_STUDIES).pipe(
      tap(caseStudies => this.logger.log('getCaseStudies', caseStudies)),
      tap(caseStudies => this.state.set(CASE_STUDIES_KEY, caseStudies))
    );
  }

  getTeam(): Observable<Team[]> {
    const cache = this.state.get<Team[] | null>(TEAM_KEY, null);
    if (cache) {
      return of(cache).pipe(
        tap(team => this.logger.log('getTeam', 'cache', team))
      );
    }

    return this.http.get<Team[]>(TEAM).pipe(
      tap(team => this.logger.log('getTeam', team)),
      tap(team => this.state.set(TEAM_KEY, team))
    );
  }

  getClients(): Observable<Client[]> {
    const cache = this.state.get<Client[] | null>(CLIENTS_KEY, null);
    if (cache) {
      return of(cache).pipe(
        tap(clients => this.logger.log('getClients', 'cache', clients))
      );
    }

    return this.http.get<Client[]>(CLIENTS).pipe(
      tap(clients => this.logger.log('getClients', clients)),
      tap(clients => this.state.set(CLIENTS_KEY, clients))
    );
  }
}
