import { Observable, of } from 'rxjs';
import { flatMap, find, catchError } from 'rxjs/operators';

import { Api } from 'shared';
import { Data } from './';

export class MockApiService {
  constructor() {
    this.getServices = spyOn(this, 'getServices').and.callThrough();
    this.getCaseStudies = spyOn(this, 'getCaseStudies').and.callThrough();
    this.getClients = spyOn(this, 'getClients').and.callThrough();
    this.getCareers = spyOn(this, 'getCareers').and.callThrough();
    this.getCareer = spyOn(this, 'getCareer').and.callThrough();
    this.getTeam = spyOn(this, 'getTeam').and.callThrough();
    this.getPost = spyOn(this, 'getPost').and.callThrough();
  }

  getServices(): Observable<Api.Service[]> {
    return of(Data.Api.getServices<void>());
  }

  getCaseStudies(): Observable<Api.CaseStudy[]> {
    return of(Data.Api.getCaseStudies<void>());
  }

  getClients(): Observable<Api.Client[]> {
    return of(Data.Api.getClients());
  }

  getCareers(): Observable<Api.Career[]> {
    return of(Data.Api.getCareers<void>());
  }

  getCareer(id: string): Observable<Api.Career | undefined> {
    return of(Data.Api.getCareers<void>()).pipe(
      flatMap((careers: Api.Career[]) => careers),
      find((career: Api.Career) => career.id === id),
      catchError(_ => of(undefined))
    );
  }

  getTeam(): Observable<Api.Team[]> {
    return of(Data.Api.getTeam<void>());
  }

  getPost(type: string, id: string): Observable<Api.Post | undefined> {
    let url;
    if (type === 'service') url = Data.Api.getServices<void>();
    if (type === 'work') url = Data.Api.getCaseStudies<void>();

    return of(<Api.Post[]>url).pipe(
      flatMap((posts: Api.Post[]) => posts),
      find((post: Api.Post) => post.id === id),
      catchError(_ => of(undefined))
    );
  }
}
