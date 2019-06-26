import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from 'environment';
import { LoggerService } from './logger.service';
import { MetaService } from './meta.service';
import { NotificationService } from './notification.service';
import { catchNetworkError } from './errors';
import { Service, CaseStudy, Team, Client } from 'api';
import {
  SERVICES,
  CASE_STUDIES,
  getPostUrl,
  createPostMetaTags,
  isKnownPostType
} from './api.helpers';

const TEAM = `${environment.api.url}team.json`;
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
    private metaService: MetaService,
    private notificationService: NotificationService
  ) {}

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(SERVICES).pipe(
      catchNetworkError(() =>
        this.notificationService.displayMessage(`Couldn't load services`, {
          action: 'Retry'
        })
      ),
      tap(services => this.logger.log('getServices', services))
    );
  }

  getPost<T extends PostType | string>(
    type: T,
    id: string
  ): Observable<getPost<T> | null> {
    if (!isKnownPostType(type)) return of(null);

    const url = getPostUrl(type);

    return this.http.get<Array<getPost<T>>>(url).pipe(
      catchNetworkError(() =>
        this.notificationService.displayMessage(`Couldn't load post`, {
          action: 'Retry'
        })
      ),
      map(posts => posts.find(post => post.id === id) || null),
      tap(post => {
        this.logger.log('getPost', post);
        this.metaService.setMetaTags(createPostMetaTags(type, id, post));
      })
    );
  }

  getCaseStudies(): Observable<CaseStudy[]> {
    return this.http.get<CaseStudy[]>(CASE_STUDIES).pipe(
      catchNetworkError(() =>
        this.notificationService.displayMessage(`Couldn't load case studies`, {
          action: 'Retry'
        })
      ),
      tap(caseStudies => this.logger.log('getCaseStudies', caseStudies))
    );
  }

  getTeam(): Observable<Team[]> {
    return this.http.get<Team[]>(TEAM).pipe(
      catchNetworkError(() =>
        this.notificationService.displayMessage(`Couldn't load team`, {
          action: 'Retry'
        })
      ),
      tap(team => this.logger.log('getTeam', team))
    );
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(CLIENTS).pipe(
      catchNetworkError(() =>
        this.notificationService.displayMessage(`Couldn't load clients`, {
          action: 'Retry'
        })
      ),
      tap(clients => this.logger.log('getClients', clients))
    );
  }
}
