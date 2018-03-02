import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, retry, tap, map, flatMap, find } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { LoggerService } from './logger.service';
import { Post, Service, CaseStudy } from './post';
import { Team } from './team';
import { Career } from './career';
import { Image } from './images';

@Injectable()
export class ApiService {
  services = 'api/services.json';
  caseStudies = 'api/case-studies.json';
  team = 'api/team.json';
  careers = 'api/careers.json';
  clients = 'api/clients.json';

  constructor(private http: HttpClient, private logger: LoggerService) {}

  getServices(): Observable<Service[]> {
    return this.http
      .get<Service[]>(this.services)
      .pipe(
        retry(3),
        tap((services: Service[]) => this.logger.log('getServices', services)),
        catchError(this.handleError<Service[]>('getServices', []))
      );
  }

  getCareers(): Observable<Career[]> {
    return this.http
      .get<Career[]>(this.careers)
      .pipe(
        retry(3),
        tap((careers: Career[]) => this.logger.log('getCareers', careers)),
        catchError(this.handleError<Career[]>('getCareers', []))
      );
  }

  getPost(type: string, id: string): Observable<Post> {
    let url;
    if (type === 'service') url = this.services;
    if (type === 'work') url = this.caseStudies;

    return this.http
      .get<Post[]>(url)
      .pipe(
        retry(3),
        flatMap((posts: Post[]) => posts),
        find((post: Post) => post.id === id),
        tap((post: Post) => this.logger.log('getPost', post)),
        catchError(this.handleError<Post>('getPost'))
      );
  }

  getCaseStudies(featured: boolean): Observable<CaseStudy[]> {
    return this.http
      .get<CaseStudy[]>(this.caseStudies)
      .pipe(
        retry(3),
        map((caseStudies: CaseStudy[]) =>
          caseStudies.filter(
            (caseStudy: CaseStudy) => caseStudy.featured === featured
          )
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

  getClients(): Observable<Image[]> {
    return this.http
      .get<Image[]>(this.clients)
      .pipe(
        retry(3),
        tap((clients: Image[]) => this.logger.log('getClients', clients)),
        catchError(this.handleError<Image[]>('getClients', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(operation, error);
      return of(result as T);
    };
  }
}
