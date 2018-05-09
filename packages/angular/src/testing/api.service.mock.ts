import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map, flatMap, find, catchError } from 'rxjs/operators';

import { Api } from '../app/shared/shared.module';
import { Data } from './';

export class MockApiService {
  constructor() {
    this.getServices = spyOn(this, 'getServices').and.callThrough();
    this.getCaseStudies = spyOn(this, 'getCaseStudies').and.callThrough();
    this.getClients = spyOn(this, 'getClients').and.callThrough();
    this.getCareers = spyOn(this, 'getCareers').and.callThrough();
    this.getTeam = spyOn(this, 'getTeam').and.callThrough();
    this.getPost = spyOn(this, 'getPost').and.callThrough();
  }

  getServices(): Observable<Api.Service[]> {
    return Observable.of(Data.Api.services);
  }

  getCaseStudies(): Observable<Api.CaseStudy[]> {
    return Observable.of(Data.Api.caseStudies);
  }

  getClients(): Observable<Api.Client[]> {
    return Observable.of(Data.Api.clients);
  }

  getCareers(): Observable<Api.Career[]> {
    return Observable.of(Data.Api.careers);
  }

  getTeam(): Observable<Api.Team[]> {
    return Observable.of(Data.Api.team);
  }

  getPost(type: string, id: string): Observable<Api.Post> {
    let url;
    if (type === 'service') url = Data.Api.services;
    if (type === 'work') url = Data.Api.caseStudies;

    return Observable.of(<Api.Post[]>url).pipe(
      flatMap((posts: Api.Post[]) => posts),
      find((post: Api.Post) => post.id === id),
      catchError(err => Observable.of(null))
    );
  }
}
