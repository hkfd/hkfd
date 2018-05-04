import { TestBed, async } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import { PrismicService } from './prismic.service';

let prismicService: PrismicService;
let service: Service;

describe('PrismicService', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        providers: [PrismicService, LoggerService]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createService()));

  describe('getPosts', () => {
    it('should increment postPage if not passed firstLoad', () => {
      prismicService.getPosts();

      expect(prismicService.postPage).toBe(2);
    });

    it(`should not increment postPage if firstLoad is 'true'`, () => {
      prismicService.getPosts(true);

      expect(prismicService.postPage).toBe(1);
    });
  });
});

function createService() {
  prismicService = TestBed.get(PrismicService);
  service = new Service();
}

class Service {
  getPosts: jasmine.Spy;

  constructor() {
    this.getPosts = spyOn(prismicService, 'getPosts').and.callThrough();
  }
}
