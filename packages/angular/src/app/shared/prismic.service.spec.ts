import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {
  LoggerService,
  MockLoggerService,
  MockMetaService,
  Data
} from 'testing';

import { of } from 'rxjs';

import { environment } from 'environment';
import { MetaService } from './meta.service';
import { createNewsPostMetaTags } from './prismic.service.helpers';
import { getNewPage, getNewPageSize } from './prismic.helpers';
import { PrismicService, URL } from './prismic.service';

let mockHttp: HttpTestingController;
let metaService: MetaService;
let prismicService: PrismicService;

jest.mock('./prismic.service.helpers', () => ({
  createNewsPostMetaTags: jest
    .fn()
    .mockReturnValue('createNewsPostMetaTagsReturn')
}));

jest.mock('./prismic.helpers', () => ({
  getNewPageSize: jest.fn().mockReturnValue('getNewPageSizeReturn'),
  getNewPage: jest.fn().mockReturnValue('getNewPageReturn')
}));

beforeEach(jest.clearAllMocks);

describe('PrismicService', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PrismicService,
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: MetaService, useClass: MockMetaService }
      ]
    }).compileComponents()));

  beforeEach(async(() => createService()));

  it('should create service', () => {
    expect(prismicService).toBeTruthy();
  });

  describe('`getRef`', () => {
    describe('Request', () => {
      it('should call `HttpClient` `get`', () => {
        prismicService.getRef().subscribe();
        const {
          request: { method }
        } = mockHttp.expectOne(environment.prismic.endpoint);

        expect(method).toBe('GET');
      });

      describe('Response', () => {
        describe('Error', () => {
          let error: ErrorEvent;
          let err: any;

          beforeEach(() => {
            error = new ErrorEvent('err');
            prismicService
              .getRef()
              .subscribe(
                response => fail(response),
                errorRes => (err = errorRes)
              );
            mockHttp.expectOne(environment.prismic.endpoint).error(error);
          });

          it('should return error', () => {
            expect(err.error).toEqual(new ErrorEvent('err'));
          });
        });

        describe('No error', () => {
          describe('No `isMasterRef`', () => {
            it('should return ``', () => {
              prismicService.getRef().subscribe(res => expect(res).toBe(''));

              mockHttp.expectOne(environment.prismic.endpoint).flush({
                refs: [
                  {
                    ...Data.Prismic.getRefResponse().refs[0],
                    isMasterRef: false
                  },
                  { ...Data.Prismic.getRefResponse().refs[1] },
                  { ...Data.Prismic.getRefResponse().refs[2] }
                ]
              });
            });
          });

          describe('Has `isMasterRef`', () => {
            it('should return `ref`', () => {
              prismicService
                .getRef()
                .subscribe(res =>
                  expect(res).toEqual(Data.Prismic.getRefResponse().refs[0].ref)
                );

              mockHttp
                .expectOne(environment.prismic.endpoint)
                .flush(Data.Prismic.getRefResponse());
            });
          });
        });
      });
    });
  });

  describe('`getPosts`', () => {
    beforeEach(() =>
      jest.spyOn(prismicService, 'getRef').mockReturnValue(of('abc'))
    );

    describe('Request', () => {
      it('should call `HttpClient` `get`', () => {
        prismicService.getPosts(true).subscribe();
        const {
          request: { method }
        } = mockHttp.expectOne(req => req.url === URL);

        expect(method).toBe('GET');
      });

      it('should call `getNewPageSize` with `firstLoad` and `postPage` args', () => {
        prismicService.getPosts(true).subscribe();
        mockHttp.expectOne(req => req.url === URL);

        expect(getNewPageSize).toHaveBeenCalledWith(true, 1);
      });

      it('should call `getNewPage` with `firstLoad` and `postPage` args', () => {
        prismicService.getPosts(true).subscribe();
        mockHttp.expectOne(req => req.url === URL);

        expect(getNewPage).toHaveBeenCalledWith(true, 1);
      });

      it('should call `HttpClient` `get` with `params`', () => {
        prismicService.getPosts(true).subscribe();
        const {
          request: { params }
        } = mockHttp.expectOne(req => req.url === URL);

        expect(params.get('ref')).toBe('abc');
        expect(params.get('pageSize')).toBe('getNewPageSizeReturn');
        expect(params.get('page')).toBe('getNewPageReturn');
      });

      describe('Response', () => {
        describe('Error', () => {
          let error: ErrorEvent;
          let err: any;

          beforeEach(() => {
            error = new ErrorEvent('err');
            prismicService
              .getPosts(true)
              .subscribe(
                response => fail(response),
                errorRes => (err = errorRes)
              );
            mockHttp.expectOne(req => req.url === URL).error(error);
          });

          it('should return error', () => {
            expect(err.error).toEqual(new ErrorEvent('err'));
          });
        });

        describe('No error', () => {
          let res: any;

          beforeEach(() => {
            prismicService
              .getPosts(true)
              .subscribe(response => (res = response));
            mockHttp
              .expectOne(req => req.url === URL)
              .flush(Data.Prismic.getPostsResponse());
          });

          it('should return `postsRes`', () => {
            expect(res).toEqual(Data.Prismic.getPostsResponse());
          });
        });
      });
    });
  });

  describe('`getPost`', () => {
    beforeEach(() =>
      jest.spyOn(prismicService, 'getRef').mockReturnValue(of('abc'))
    );

    describe('Request', () => {
      it('should call `HttpClient` `get`', () => {
        prismicService.getPost('post-1').subscribe();
        const {
          request: { method }
        } = mockHttp.expectOne(req => req.url === URL);

        expect(method).toBe('GET');
      });

      it('should call `HttpClient` `get` with `q` param as `uid`', () => {
        prismicService.getPost('post-1').subscribe();
        const {
          request: { params }
        } = mockHttp.expectOne(req => req.url === URL);

        expect(params.get('q')).toContain('post-1');
      });

      describe('Response', () => {
        describe('Error', () => {
          let error: ErrorEvent;
          let err: any;

          beforeEach(() => {
            error = new ErrorEvent('err');
            prismicService
              .getPost('post-1')
              .subscribe(
                response => fail(response),
                errorRes => (err = errorRes)
              );
            mockHttp.expectOne(req => req.url === URL).error(error);
          });

          it('should return error', () => {
            expect(err.error).toEqual(new ErrorEvent('err'));
          });
        });

        describe('No error', () => {
          describe('Has `post`', () => {
            it('should return `post`', async(() => {
              prismicService
                .getPost('post-1')
                .subscribe(res =>
                  expect(res).toEqual(Data.Prismic.getPosts('post-1'))
                );

              mockHttp
                .expectOne(req => req.url === URL)
                .flush(Data.Prismic.getPostsResponse());
            }));

            it('should call `createNewsPostMetaTags` with `post` args', async(() => {
              prismicService
                .getPost('post-1')
                .subscribe(_ =>
                  expect(createNewsPostMetaTags).toHaveBeenCalledWith(
                    Data.Prismic.getPosts('post-1')
                  )
                );

              mockHttp
                .expectOne(
                  req =>
                    req.url ===
                    `${environment.prismic.endpoint}/documents/search`
                )
                .flush(Data.Prismic.getPostsResponse());
            }));
          });

          it('should return `null` if no `post`', async(() => {
            prismicService
              .getPost('post-1')
              .subscribe(res => expect(res).toBe(null));

            mockHttp
              .expectOne(
                req =>
                  req.url === `${environment.prismic.endpoint}/documents/search`
              )
              .flush({ results: [] });
          }));

          it('should call `createNewsPostMetaTags` with `post` args', async(() => {
            prismicService
              .getPost('post-1')
              .subscribe(_ =>
                expect(createNewsPostMetaTags).toHaveBeenCalledWith(
                  Data.Prismic.getPosts('post-1')
                )
              );

            mockHttp
              .expectOne(
                req =>
                  req.url === `${environment.prismic.endpoint}/documents/search`
              )
              .flush(Data.Prismic.getPostsResponse());
          }));

          it('should call `MetaService` `setMetaTags` with `createNewsPostMetaTags` return', async(() => {
            prismicService
              .getPost('post-1')
              .subscribe(_ =>
                expect(metaService.setMetaTags).toHaveBeenCalledWith(
                  'createNewsPostMetaTagsReturn'
                )
              );

            mockHttp
              .expectOne(
                req =>
                  req.url === `${environment.prismic.endpoint}/documents/search`
              )
              .flush(Data.Prismic.getPostsResponse());
          }));
        });
      });
    });
  });

  afterEach(() => mockHttp.verify());
});

function createService() {
  mockHttp = TestBed.get(HttpTestingController);
  prismicService = TestBed.get(PrismicService);
  metaService = TestBed.get(MetaService);
}
