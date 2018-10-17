import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {
  TransferState,
  MockTransferState,
  LoggerService,
  MockLoggerService,
  Data
} from 'testing';

import { environment } from 'environment';
import { PrismicService } from './prismic.service';

let mockHttp: HttpTestingController;
let transferState: MockTransferState;
let prismicService: PrismicService;

describe('PrismicService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PrismicService,
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: TransferState, useClass: MockTransferState }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => createService()));

  describe('getRef', () => {
    describe('cache', () => {
      beforeEach(() => transferState.set('prismic-ref', 'abc'));

      it('should not call HttpClient get', async(() => {
        prismicService.getRef().subscribe();

        expect(
          mockHttp.expectNone(environment.prismic.endpoint)
        ).toBeUndefined();
      }));

      it('should return ref', async(() => {
        prismicService.getRef().subscribe(res => expect(res).toBe('abc'));
      }));
    });

    describe('no cache', () => {
      it('should call HttpClient get', async(() => {
        prismicService.getRef().subscribe();

        expect(mockHttp.expectOne(environment.prismic.endpoint)).toBeTruthy();
      }));

      it('should return ref', async(() => {
        prismicService.getRef().subscribe(ref => expect(ref).toBe('abc'));

        mockHttp
          .expectOne(environment.prismic.endpoint)
          .flush(Data.Prismic.refResponse);
      }));
    });
  });

  describe('getPosts', () => {
    describe('cache', () => {
      beforeEach(() => {
        transferState.set('prismic-ref', 'abc');
        transferState.set('prismic-posts', Data.Prismic.postsResponse);
      });

      it('should not call HttpClient get if `firstLoad` is true', async(() => {
        prismicService.getPosts(true).subscribe();

        expect(mockHttp.verify()).toBeUndefined();
      }));

      it('should return posts', async(() => {
        prismicService
          .getPosts(true)
          .subscribe(res => expect(res).toEqual(Data.Prismic.postsResponse));
      }));

      it('should call HttpClient get if `firstLoad` is false', async(() => {
        prismicService.getPosts().subscribe();

        expect(
          mockHttp.expectOne(req =>
            req.url.includes(environment.prismic.endpoint)
          )
        ).toBeTruthy();
      }));
    });

    describe('no cache', () => {
      it('should call PrismicService getRef', () => {
        const spy = spyOn(prismicService, 'getRef').and.callThrough();
        prismicService.getPosts();

        expect(spy).toHaveBeenCalled();
      });

      it('should call HttpClient get with `ref` param', async(() => {
        prismicService.getPosts().subscribe();

        mockHttp
          .expectOne(environment.prismic.endpoint)
          .flush(Data.Prismic.refResponse);
        const {
          request: { params }
        } = mockHttp.expectOne(
          req => req.url === `${environment.prismic.endpoint}/documents/search`
        );

        expect(params.get('ref')).toBe('abc');
      }));

      it('should call HttpClient get with `q` param', async(() => {
        prismicService.getPosts().subscribe();

        mockHttp
          .expectOne(environment.prismic.endpoint)
          .flush(Data.Prismic.refResponse);
        const {
          request: { params }
        } = mockHttp.expectOne(
          req => req.url === `${environment.prismic.endpoint}/documents/search`
        );

        expect(params.get('q')).toBe('[[at(document.type,"news")]]');
      }));

      it('should call HttpClient get with `orderings` param', async(() => {
        prismicService.getPosts().subscribe();

        mockHttp
          .expectOne(environment.prismic.endpoint)
          .flush(Data.Prismic.refResponse);
        const {
          request: { params }
        } = mockHttp.expectOne(
          req => req.url === `${environment.prismic.endpoint}/documents/search`
        );

        expect(params.get('orderings')).toBe(
          '[document.first_publication_date desc]'
        );
      }));

      it('should call HttpClient get with `pageSize` param as `postPage` times `postPageSize` if `firstLoad` is true', async(() => {
        prismicService.getPosts().subscribe();
        mockHttp.expectOne(environment.prismic.endpoint);

        prismicService.getPosts(true).subscribe();
        mockHttp
          .expectOne(environment.prismic.endpoint)
          .flush(Data.Prismic.refResponse);
        const {
          request: { params }
        } = mockHttp.expectOne(
          req => req.url === `${environment.prismic.endpoint}/documents/search`
        );

        expect(params.get('pageSize')).toBe('18');
      }));

      it('should call HttpClient get with `pageSize` param as `postPageSize` if `firstLoad` is false', async(() => {
        prismicService.getPosts().subscribe();
        mockHttp.expectOne(environment.prismic.endpoint);

        prismicService.getPosts().subscribe();
        mockHttp
          .expectOne(environment.prismic.endpoint)
          .flush(Data.Prismic.refResponse);
        const {
          request: { params }
        } = mockHttp.expectOne(
          req => req.url === `${environment.prismic.endpoint}/documents/search`
        );

        expect(params.get('pageSize')).toBe('9');
      }));

      it('should call HttpClient get with `page` param as `1` if `firstLoad` is true', async(() => {
        prismicService.getPosts().subscribe();
        mockHttp.expectOne(environment.prismic.endpoint);

        prismicService.getPosts(true).subscribe();
        mockHttp
          .expectOne(environment.prismic.endpoint)
          .flush(Data.Prismic.refResponse);
        const {
          request: { params }
        } = mockHttp.expectOne(
          req => req.url === `${environment.prismic.endpoint}/documents/search`
        );

        expect(params.get('page')).toBe('1');
      }));

      it('should call HttpClient get with `page` param as `postPage` if `firstLoad` is false', async(() => {
        prismicService.getPosts().subscribe();
        mockHttp.expectOne(environment.prismic.endpoint);

        prismicService.getPosts().subscribe();
        mockHttp
          .expectOne(environment.prismic.endpoint)
          .flush(Data.Prismic.refResponse);
        const {
          request: { params }
        } = mockHttp.expectOne(
          req => req.url === `${environment.prismic.endpoint}/documents/search`
        );

        expect(params.get('page')).toBe('3');
      }));

      it('should return posts', async(() => {
        prismicService
          .getPosts()
          .subscribe(postsRes =>
            expect(postsRes).toEqual(Data.Prismic.postsResponse)
          );

        mockHttp
          .expectOne(environment.prismic.endpoint)
          .flush(Data.Prismic.refResponse);
        mockHttp
          .expectOne(
            req =>
              req.url === `${environment.prismic.endpoint}/documents/search`
          )
          .flush(Data.Prismic.postsResponse);
      }));
    });
  });

  describe('getPost', () => {
    describe('cache', () => {
      beforeEach(() => {
        transferState.set('prismic-ref', 'abc');
        transferState.set('prismic-post', Data.Prismic.posts[0]);
      });

      describe('same uid', () => {
        it('should not call HttpClient get', async(() => {
          prismicService.getPost('post-1').subscribe();

          expect(mockHttp.verify()).toBeUndefined();
        }));

        it('should return post', async(() => {
          prismicService
            .getPost('post-1')
            .subscribe(res => expect(res).toEqual(Data.Prismic.posts[0]));
        }));
      });

      describe('different uid', () => {
        it('should call PrismicService getRef', () => {
          const spy = spyOn(prismicService, 'getRef').and.callThrough();
          prismicService.getPost('post-2');

          expect(spy).toHaveBeenCalled();
        });

        it('should call HttpClient get', async(() => {
          prismicService.getPost('post-2').subscribe();

          expect(
            mockHttp.expectOne(
              req =>
                req.url === `${environment.prismic.endpoint}/documents/search`
            )
          ).toBeTruthy();
        }));

        it('should return post', async(() => {
          prismicService
            .getPost('post-2')
            .subscribe(post => expect(post).toEqual(Data.Prismic.posts[0]));

          mockHttp
            .expectOne(
              req =>
                req.url === `${environment.prismic.endpoint}/documents/search`
            )
            .flush(Data.Prismic.postsResponse);
        }));
      });
    });

    describe('no cache', () => {
      it('should call PrismicService getRef', () => {
        const spy = spyOn(prismicService, 'getRef').and.callThrough();
        prismicService.getPost('');

        expect(spy).toHaveBeenCalled();
      });

      it('should call HttpClient get with `ref` param', async(() => {
        prismicService.getPost('').subscribe();

        mockHttp
          .expectOne(environment.prismic.endpoint)
          .flush(Data.Prismic.refResponse);
        const {
          request: { params }
        } = mockHttp.expectOne(
          req => req.url === `${environment.prismic.endpoint}/documents/search`
        );

        expect(params.get('ref')).toBe('abc');
      }));

      it('should call HttpClient get with `q` param as `uid`', async(() => {
        prismicService.getPost('post-1').subscribe();

        mockHttp
          .expectOne(environment.prismic.endpoint)
          .flush(Data.Prismic.refResponse);
        const {
          request: { params }
        } = mockHttp.expectOne(
          req => req.url === `${environment.prismic.endpoint}/documents/search`
        );

        expect(params.get('q')).toBe('[[at(my.news.uid,"post-1")]]');
      }));

      it('should return post', async(() => {
        prismicService
          .getPost('')
          .subscribe(post => expect(post).toEqual(Data.Prismic.posts[0]));

        mockHttp
          .expectOne(environment.prismic.endpoint)
          .flush(Data.Prismic.refResponse);
        mockHttp
          .expectOne(
            req =>
              req.url === `${environment.prismic.endpoint}/documents/search`
          )
          .flush(Data.Prismic.postsResponse);
      }));
    });
  });
});

function createService() {
  mockHttp = TestBed.get(HttpTestingController);
  transferState = TestBed.get(TransferState);
  prismicService = TestBed.get(PrismicService);
}
