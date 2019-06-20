import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {
  LoggerService,
  MockLoggerService,
  MockMetaService,
  Data,
  MockNotificationService
} from 'testing';

import { of } from 'rxjs';

import { environment } from 'environment';
import { catchNetworkError } from 'shared';
import { MetaService } from './meta.service';
import { NotificationService } from './notification.service';
import { createPostMetaTags } from './prismic.service.helpers';
import { getMasterRef, getPostParams, getPostsParams } from './prismic.helpers';
import { PrismicService, URL } from './prismic.service';

let mockHttp: HttpTestingController;
let metaService: MetaService;
let notificationService: NotificationService;
let prismicService: PrismicService;

jest.mock('./prismic.service.helpers', () => ({
  createPostMetaTags: jest.fn().mockReturnValue('createPostMetaTagsReturn')
}));

jest.mock('./prismic.helpers', () => ({
  getMasterRef: jest.fn().mockReturnValue('getMasterRefReturn'),
  getPostsParams: jest.fn().mockReturnValue(['getPostsParamsReturn']),
  getPostParams: jest.fn().mockReturnValue(['getPostParamsReturn'])
}));

jest.mock('shared/errors/operators', () => {
  const { pipe } = require('rxjs');

  return { catchNetworkError: jest.fn().mockReturnValue(pipe()) };
});

beforeEach(jest.clearAllMocks);

describe('PrismicService', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PrismicService,
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: MetaService, useClass: MockMetaService },
        { provide: NotificationService, useClass: MockNotificationService }
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
          it('should call `getMasterRef` with `res`', () => {
            prismicService
              .getRef()
              .subscribe(_ =>
                expect(getMasterRef).toHaveBeenCalledWith(
                  Data.Prismic.getRefResponse(),
                  jasmine.anything()
                )
              );

            mockHttp
              .expectOne(environment.prismic.endpoint)
              .flush(Data.Prismic.getRefResponse());
          });

          it('should return `getMasterRef` return', () => {
            prismicService
              .getRef()
              .subscribe(res => expect(res).toBe('getMasterRefReturn'));

            mockHttp.expectOne(environment.prismic.endpoint).flush({});
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
      it('should call `getPostsParams` with `type`, `ref`, and `page` as `page` args if passed `page` arg', () => {
        prismicService.getPosts('type' as any, { page: 'page' }).subscribe(_ =>
          expect(getPostsParams).toHaveBeenCalledWith({
            type: 'type',
            ref: 'abc',
            page: 'page'
          })
        );

        mockHttp.expectOne(req => req.url === URL);
      });

      it('should call `getPostsParams` with `type`, `ref`, and `page` as `undefined` args if not passed `page` arg', () => {
        prismicService.getPosts('type' as any).subscribe(_ =>
          expect(getPostsParams).toHaveBeenCalledWith({
            type: 'type',
            ref: 'abc',
            page: undefined
          })
        );

        mockHttp.expectOne(req => req.url === URL);
      });

      it('should call `HttpClient` `get` with `params` as `getPostsParams` return', () => {
        prismicService.getPosts('type' as any).subscribe();
        const {
          request: { method, params }
        } = mockHttp.expectOne(req => req.url === URL);

        expect(method).toBe('GET');
        expect(params.toString()).toBe('0=getPostsParamsReturn');
      });

      it('should call `catchNetworkError` with `NotificationService` `displayMessage` function `arg`', () => {
        (notificationService.displayMessage as jest.Mock).mockImplementation(
          (...args: any[]) => args
        );
        prismicService.getPosts('type' as any).subscribe();
        const [
          [catchNetworkErrorFunctionArgs]
        ] = (catchNetworkError as jest.Mock).mock.calls;

        expect(catchNetworkErrorFunctionArgs()).toEqual([
          `Couldn't load posts`,
          {
            action: 'Retry'
          }
        ]);
        mockHttp.expectOne(req => req.url === URL);
      });

      describe('Response', () => {
        describe('Error', () => {
          let error: ErrorEvent;
          let err: any;

          beforeEach(() => {
            error = new ErrorEvent('err');
            prismicService
              .getPosts('type' as any)
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
              .getPosts('type' as any)
              .subscribe(response => (res = response));
            mockHttp
              .expectOne(req => req.url === URL)
              .flush(Data.Prismic.getNewsPostsResponse());
          });

          it('should return `postsRes`', () => {
            expect(res).toEqual(Data.Prismic.getNewsPostsResponse());
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
      it('should call `getPostParams` with args', () => {
        (prismicService as any).postPage = 'postPage';
        prismicService.getPost('type' as any, 'uid').subscribe(_ =>
          expect(getPostParams).toHaveBeenCalledWith({
            type: 'type',
            ref: 'abc',
            uid: 'uid'
          })
        );

        mockHttp.expectOne(req => req.url === URL);
      });

      it('should call `HttpClient` `get` with `params` as `getPostParams` return', () => {
        prismicService.getPost('type' as any, 'uid').subscribe();
        const {
          request: { method, params }
        } = mockHttp.expectOne(req => req.url === URL);

        expect(method).toBe('GET');
        expect(params.toString()).toBe('0=getPostParamsReturn');
      });

      it('should call `catchNetworkError` with `NotificationService` `displayMessage` function `arg`', () => {
        (notificationService.displayMessage as jest.Mock).mockImplementation(
          (...args: any[]) => args
        );
        prismicService.getPost('type' as any, 'uid').subscribe();
        const [
          [catchNetworkErrorFunctionArgs]
        ] = (catchNetworkError as jest.Mock).mock.calls;

        expect(catchNetworkErrorFunctionArgs()).toEqual([
          `Couldn't load post`,
          {
            action: 'Retry'
          }
        ]);
        mockHttp.expectOne(req => req.url === URL);
      });

      describe('Response', () => {
        describe('Error', () => {
          let error: ErrorEvent;
          let err: any;

          beforeEach(() => {
            error = new ErrorEvent('err');
            prismicService
              .getPost('type' as any, 'uid')
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
          it('should return `post` as first `results` if exists', async(() => {
            prismicService.getPost('type' as any, 'uid').subscribe(res =>
              expect(res).toEqual({
                post: Data.Prismic.getNewsPosts('post-1')
              })
            );

            mockHttp
              .expectOne(req => req.url === URL)
              .flush(Data.Prismic.getNewsPostsResponse());
          }));

          it('should return `post` as `null` if `results` does not exist', async(() => {
            prismicService
              .getPost('type' as any, 'uid')
              .subscribe(res => expect(res).toEqual({ post: null }));

            mockHttp
              .expectOne(
                req =>
                  req.url === `${environment.prismic.endpoint}/documents/search`
              )
              .flush({ results: [] });
          }));

          it('should call `createPostMetaTags` with `res.post` args', async(() => {
            prismicService
              .getPost('type' as any, 'uid')
              .subscribe(_ =>
                expect(createPostMetaTags).toHaveBeenCalledWith(
                  Data.Prismic.getNewsPosts('post-1')
                )
              );

            mockHttp
              .expectOne(
                req =>
                  req.url === `${environment.prismic.endpoint}/documents/search`
              )
              .flush(Data.Prismic.getNewsPostsResponse());
          }));

          it('should call `MetaService` `setMetaTags` with `createPostMetaTags` return', async(() => {
            prismicService
              .getPost('type' as any, 'uid')
              .subscribe(_ =>
                expect(metaService.setMetaTags).toHaveBeenCalledWith(
                  'createPostMetaTagsReturn'
                )
              );

            mockHttp
              .expectOne(
                req =>
                  req.url === `${environment.prismic.endpoint}/documents/search`
              )
              .flush(Data.Prismic.getNewsPostsResponse());
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
  notificationService = TestBed.get(NotificationService);
}
