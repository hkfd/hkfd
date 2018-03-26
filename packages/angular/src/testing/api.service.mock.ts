import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map, flatMap, find, catchError } from 'rxjs/operators';

import {
  Service,
  Career,
  Post,
  CaseStudy,
  Team,
  Image
} from '../app/shared/shared.module';
import { services, caseStudies, clients, careers, team } from './data';

export class MockApiService {
  constructor() {
    this.getServices = spyOn(this, 'getServices').and.callThrough();
    this.getCaseStudies = spyOn(this, 'getCaseStudies').and.callThrough();
    this.getClients = spyOn(this, 'getClients').and.callThrough();
    this.getCareers = spyOn(this, 'getCareers').and.callThrough();
    this.getTeam = spyOn(this, 'getTeam').and.callThrough();
    this.getPost = spyOn(this, 'getPost').and.callThrough();
  }

  getServices(): Observable<Service[]> {
    return Observable.of(services);
  }

  getCaseStudies(): Observable<CaseStudy[]> {
    return Observable.of(caseStudies);
  }

  getClients(): Observable<string[]> {
    return Observable.of(clients);
  }

  getCareers(): Observable<Career[]> {
    return Observable.of(careers);
  }

  getTeam(): Observable<Team[]> {
    return Observable.of(team);
  }

  getPost(type: string, id: string): Observable<Post> {
    let url;
    if (type === 'service') url = services;
    if (type === 'work') url = caseStudies;

    return Observable.of(<Post[]>url).pipe(
      flatMap((posts: Post[]) => posts),
      find((post: Post) => post.id === id),
      catchError(err => Observable.of(null))
    );
  }
}
