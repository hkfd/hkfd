import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {
  Service,
  Career,
  Post,
  CaseStudy,
  Team,
  Image
} from '../app/shared/shared.module';
import { services, casestudies, clients } from './data';

export class MockApiService {
  getServicesSpy: jasmine.Spy;
  getCaseStudiesSpy: jasmine.Spy;
  getClientsSpy: jasmine.Spy;

  constructor() {
    this.getServicesSpy = spyOn(this, 'getServices').and.callThrough();
    this.getCaseStudiesSpy = spyOn(this, 'getCaseStudies').and.callThrough();
    this.getClientsSpy = spyOn(this, 'getClients').and.callThrough();
  }

  getServices(): Observable<Service[]> {
    return Observable.of(services);
  }

  getCaseStudies(): Observable<CaseStudy[]> {
    return Observable.of(casestudies);
  }

  getClients(): Observable<Image[]> {
    return Observable.of(clients);
  }
}
