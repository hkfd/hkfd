import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, flatMap, find } from 'rxjs/operators';

import { environment } from 'environment';
import { LoggerService } from './logger.service';
import { MetaService } from './meta.service';
import { Service, Career, CaseStudy, Team, Client } from 'api';
import {
  SERVICES,
  CASE_STUDIES,
  getPostUrl,
  createCareerMetaTags,
  createPostMetaTags
} from './api.helpers';

const TEAM = `${environment.api.url}team.json`;
const CAREERS = `${environment.api.url}careers.json`;
const CLIENTS = `${environment.api.url}clients.json`;

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
    private metaService: MetaService
  ) {}

  getServices(): Observable<Service[]> {
    return this.http
      .get<Service[]>(SERVICES)
      .pipe(tap(services => this.logger.log('getServices', services)));
  }

  getCareers(): Observable<Career[]> {
    return this.http
      .get<Career[]>(CAREERS)
      .pipe(tap(careers => this.logger.log('getCareers', careers)));
  }

  getCareer(id: string): Observable<Career | undefined> {
    return this.http.get<Career[]>(CAREERS).pipe(
      flatMap(careers => careers),
      find(career => career.id === id),
      tap(career => {
        this.logger.log('getCareer', career);
        career && this.metaService.setMetaTags(createCareerMetaTags(career));
      })
    );
  }

  getPost<T extends PostType>(
    type: T,
    id: string
  ): Observable<getPost<T> | undefined> {
    const url = getPostUrl(type);

    return this.http.get<Array<getPost<T>>>(url).pipe(
      flatMap(posts => posts),
      find(post => post.id === id),
      tap(post => {
        this.logger.log('getPost', post);
        post &&
          this.metaService.setMetaTags(createPostMetaTags(type, id, post));
      })
    );
  }

  getCaseStudies(): Observable<CaseStudy[]> {
    return this.http
      .get<CaseStudy[]>(CASE_STUDIES)
      .pipe(tap(caseStudies => this.logger.log('getCaseStudies', caseStudies)));
  }

  getTeam(): Observable<Team[]> {
    return this.http
      .get<Team[]>(TEAM)
      .pipe(tap(team => this.logger.log('getTeam', team)));
  }

  getClients(): Observable<Client[]> {
    return this.http
      .get<Client[]>(CLIENTS)
      .pipe(tap(clients => this.logger.log('getClients', clients)));
  }
}
