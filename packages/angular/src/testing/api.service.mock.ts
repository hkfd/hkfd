import { Observable, of } from 'rxjs';
import { flatMap, find, catchError } from 'rxjs/operators';

import { Service, Career, Post, CaseStudy, Team, Client } from 'api';
import { Data } from './';

export class MockApiService {
  constructor() {
    jest.spyOn(this, 'getServices');
    jest.spyOn(this, 'getCaseStudies');
    jest.spyOn(this, 'getClients');
    jest.spyOn(this, 'getCareers');
    jest.spyOn(this, 'getCareer');
    jest.spyOn(this, 'getTeam');
    jest.spyOn(this, 'getPost');
  }

  getServices(): Observable<Service[]> {
    return of(Data.Api.getServices<void>());
  }

  getCaseStudies(): Observable<CaseStudy[]> {
    return of(Data.Api.getCaseStudies<void>());
  }

  getClients(): Observable<Client[]> {
    return of(Data.Api.getClients());
  }

  getCareers(): Observable<Career[]> {
    return of(Data.Api.getCareers<void>());
  }

  getCareer(id: string): Observable<Career | undefined> {
    return of(Data.Api.getCareers<void>()).pipe(
      flatMap((careers: Career[]) => careers),
      find((career: Career) => career.id === id),
      catchError(_ => of(undefined))
    );
  }

  getTeam(): Observable<Team[]> {
    return of(Data.Api.getTeam<void>());
  }

  getPost(type: string, id: string): Observable<Post | undefined> {
    let url;
    if (type === 'service') url = Data.Api.getServices<void>();
    if (type === 'work') url = Data.Api.getCaseStudies<void>();

    return of(<Post[]>url).pipe(
      flatMap((posts: Post[]) => posts),
      find((post: Post) => post.id === id),
      catchError(_ => of(undefined))
    );
  }
}
