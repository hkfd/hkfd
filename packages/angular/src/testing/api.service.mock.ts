import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map, flatMap, find, catchError } from 'rxjs/operators';

import { Server } from '../app/shared/shared.module';
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

  getServices(): Observable<Server.Service[]> {
    return Observable.of(Data.Server.services);
  }

  getCaseStudies(): Observable<Server.CaseStudy[]> {
    return Observable.of(Data.Server.caseStudies);
  }

  getClients(): Observable<Server.Client[]> {
    return Observable.of(Data.Server.clients);
  }

  getCareers(): Observable<Server.Career[]> {
    return Observable.of(Data.Server.careers);
  }

  getTeam(): Observable<Server.Team[]> {
    return Observable.of(Data.Server.team);
  }

  getPost(type: string, id: string): Observable<Server.Post> {
    let url;
    if (type === 'service') url = Data.Server.services;
    if (type === 'work') url = Data.Server.caseStudies;

    return Observable.of(<Server.Post[]>url).pipe(
      flatMap((posts: Server.Post[]) => posts),
      find((post: Server.Post) => post.id === id),
      catchError(err => Observable.of(null))
    );
  }
}
