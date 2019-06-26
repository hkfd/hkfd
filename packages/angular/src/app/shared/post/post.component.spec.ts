import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

import { of } from 'rxjs';

import {
  RouterTestingModule,
  MockApiService,
  MockApiPipe,
  ActivatedRoute,
  ActivatedRouteStub,
  StubTextBlockComponent,
  StubImageBlockComponent,
  StubDuoBlockComponent,
  StubGalleryBlockComponent,
  StubVideoBlockComponent,
  StubAudioBlockComponent,
  StubErrorComponent,
  Data
} from 'testing';

import { Post, ApiService } from 'shared';
import { ImageBlock } from 'api';
import { PostComponent } from './post.component';
import { isCaseStudy } from 'shared/api.helpers';

let comp: PostComponent;
let fixture: ComponentFixture<PostComponent>;
let changeDetectorRef: ChangeDetectorRef;
let page: Page;
let activatedRoute: ActivatedRouteStub;
let apiService: ApiService;

jest.mock('shared/api.helpers', () => ({
  isCaseStudy: jest.fn().mockReturnValue(true),
  isKnownPostType: jest.fn().mockReturnValue(true)
}));

describe('PostComponent', () => {
  beforeEach(jest.clearAllMocks);

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParamMap = { type: 'work', id: 'case-study-1' };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        PostComponent,
        StubTextBlockComponent,
        StubImageBlockComponent,
        StubDuoBlockComponent,
        StubGalleryBlockComponent,
        StubVideoBlockComponent,
        StubAudioBlockComponent,
        StubErrorComponent,
        MockApiPipe
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ApiService, useClass: MockApiService }
      ]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`post`', () => {
    beforeEach(() => (comp.overview = undefined));

    it('should set `post` if passed `Post`', () => {
      comp.post = Data.Api.getCaseStudies('Case Study 1');

      expect(comp.post).toEqual(Data.Api.getCaseStudies('Case Study 1'));
    });

    it('should set `post` if passed `null`', () => {
      comp.post = null;

      expect(comp.post).toBe(null);
    });

    it('should call `isCaseStudy` with `post` arg', () => {
      comp.post = Data.Api.getCaseStudies('Case Study 1');

      expect(isCaseStudy).toHaveBeenCalledWith(
        Data.Api.getCaseStudies('Case Study 1')
      );
    });

    it('should set `overview` as `post.overview` if `isCaseStudy` returns `true`', () => {
      ((isCaseStudy as any) as jest.Mock).mockReturnValue(true);
      comp.post = Data.Api.getCaseStudies('Case Study 1');

      expect(comp.overview).toEqual(
        Data.Api.getCaseStudies('Case Study 1').overview
      );
    });

    it('should not set `overview` if `isCaseStudy` returns `false`', () => {
      ((isCaseStudy as any) as jest.Mock).mockReturnValue(false);
      comp.post = Data.Api.getCaseStudies('Case Study 1');

      expect(comp.overview).toBe(undefined);
    });
  });

  describe('`ngOnInit`', () => {
    describe('No `type` and has `id`', () => {
      beforeEach(
        () => (activatedRoute.testParamMap = { type: undefined, id: 'id' })
      );

      it('should throw error', () => {
        expect(() => comp.ngOnInit()).toThrowError('No param');
      });
    });

    describe('Has `type` and no `id`', () => {
      beforeEach(
        () => (activatedRoute.testParamMap = { type: 'type', id: undefined })
      );

      it('should throw error', () => {
        expect(() => comp.ngOnInit()).toThrowError('No param');
      });
    });

    describe('Has `type` and has `id`', () => {
      it('should set `post$`', () => {
        jest.clearAllMocks();
        activatedRoute.testParamMap = { type: 'type', id: 'id' };
        comp.ngOnInit();

        expect(comp.post$).toBeDefined();
      });

      it('should call `ApiService` `getPost` with `type` and `id` args', () => {
        jest.clearAllMocks();
        activatedRoute.testParamMap = { type: 'type', id: 'id' };
        comp.ngOnInit();

        expect(apiService.getPost).toHaveBeenCalledWith('type', 'id');
      });

      it('should set `post` as `ApiService` `getPost` return', () => {
        jest.clearAllMocks();
        comp.post = undefined;
        (apiService.getPost as jest.Mock).mockReturnValue(of('post'));
        activatedRoute.testParamMap = { type: 'type', id: 'id' };
        comp.ngOnInit();

        expect(comp.post).toBe('post');
      });

      it('should call `ChangeDetectorRef` `markForCheck`', () => {
        jest.clearAllMocks();
        activatedRoute.testParamMap = { type: 'type', id: 'id' };
        comp.ngOnInit();

        expect(changeDetectorRef.markForCheck).toHaveBeenCalled();
      });
    });

    describe('`layout`', () => {
      it('should be set', () => {
        expect(comp.layout).toBeDefined();
      });

      it('should be set as `layout-`', () => {
        expect(comp.layout).toMatch(/layout-[1-3]/);
      });
    });
  });

  describe('`ngOnDestroy`', () => {
    it('should call `post$` `unsubscribe` if has `post$`', () => {
      comp.post$ = { unsubscribe: jest.fn() } as any;
      comp.ngOnDestroy();

      expect((comp.post$ as any).unsubscribe).toHaveBeenCalled();
    });

    it('should not throw if no `post$`', () => {
      comp.post$ = undefined;

      expect(() => comp.ngOnDestroy()).not.toThrow();
    });
  });

  describe('Template', () => {
    describe('`post` is `undefined`', () => {
      beforeEach(() => {
        comp.post = undefined;
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
      });

      it('should not display `ErrorComponent`', () => {
        expect(page.error).toBeFalsy();
      });

      describe('Intro', () => {
        it('should not display title', () => {
          expect(page.title).toBeFalsy();
        });
      });
    });

    describe('`post` is `null`', () => {
      beforeEach(() => {
        comp.post = null;
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
      });

      it('should display `ErrorComponent`', () => {
        expect(page.error).toBeTruthy();
      });

      describe('Intro', () => {
        it('should not display title', () => {
          expect(page.title).toBeFalsy();
        });
      });
    });

    describe('Has `post`', () => {
      beforeEach(() => {
        comp.post = Data.Api.getCaseStudies('Case Study 1');
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
      });

      it('should not display `ErrorComponent`', () => {
        expect(page.error).toBeFalsy();
      });

      describe('Intro', () => {
        it('should display title', () => {
          expect(page.title.textContent).toBe(
            Data.Api.getCaseStudies('Case Study 1').title
          );
        });

        describe('Texts', () => {
          it('should be displayed', () => {
            expect(page.introText.length).toBe(
              Data.Api.getCaseStudies('Case Study 1').intro.length
            );
          });

          describe('Text', () => {
            it('should display text', () => {
              expect(page.introText[0].textContent).toBe(
                Data.Api.getCaseStudies('Case Study 1').intro[0]
              );
            });
          });
        });

        describe('Overview', () => {
          describe('Has `overview`', () => {
            beforeEach(() => {
              comp.overview = Data.Api.getCaseStudies('Case Study 1').overview;
              changeDetectorRef.markForCheck();
              fixture.detectChanges();
            });

            it('should be displayed', () => {
              expect(page.introOverview.textContent).toContain(
                Data.Api.getCaseStudies('Case Study 1').title
              );
            });

            describe('Services', () => {
              it('should be displayed', () => {
                expect(page.introOverviewServices.length).toBe(
                  Data.Api.getCaseStudies('Case Study 1').overview.length
                );
              });

              describe('Service', () => {
                it('should display title', () => {
                  expect(page.introOverviewServices[0].textContent).toBe(
                    Data.Api.getCaseStudies('Case Study 1').overview[0]
                  );
                });
              });
            });
          });

          describe('No `overview`', () => {
            beforeEach(() => {
              comp.overview = undefined;
              changeDetectorRef.markForCheck();
              fixture.detectChanges();
            });

            it('should not be displayed', () => {
              expect(page.introOverview).toBeFalsy();
            });
          });
        });
      });

      describe('Content', () => {
        describe('Title', () => {
          describe('Has `title`', () => {
            beforeEach(() => {
              (comp.post as Post).content[0].title = 'Title';
              changeDetectorRef.markForCheck();
              fixture.detectChanges();
            });

            it('should be displayed', () => {
              expect(page.sectionTitle.textContent).toBe('Title');
            });
          });

          describe('No `title`', () => {
            beforeEach(() => {
              (comp.post as Post).content[0].title = undefined;
              changeDetectorRef.markForCheck();
              fixture.detectChanges();
            });

            it('should not be displayed', () => {
              expect(page.sectionTitle).toBeFalsy();
            });
          });
        });

        describe('Text', () => {
          beforeEach(() => {
            comp.post = Data.Api.getCaseStudies('Case Study 1');
            changeDetectorRef.markForCheck();
            fixture.detectChanges();
          });

          it('should display `TextBlockComponent`', () => {
            expect(page.textBlock).toBeTruthy();
          });

          it('should not call `ApiPipe`', () => {
            expect(MockApiPipe.prototype.transform).not.toHaveBeenCalled();
          });

          it('should set `TextBlockComponent` `data` as `content.data`', () => {
            expect(page.textBlockComponent.data).toEqual(
              Data.Api.getCaseStudies('Case Study 1').content[0].data[0] as any
            );
          });
        });

        describe('Image', () => {
          beforeEach(() => {
            comp.post = Data.Api.getCaseStudies('Case Study 2');
            changeDetectorRef.markForCheck();
            fixture.detectChanges();
          });

          it('should display `ImageBlockComponent`', () => {
            expect(page.imageBlock).toBeTruthy();
          });

          it('should call `ApiPipe` with `content.data.data`', () => {
            expect(MockApiPipe.prototype.transform).toHaveBeenCalledWith(
              Data.Api.getCaseStudies('Case Study 2').content[0].data[0].data
            );
          });

          it('should set `ImageBlockComponent` `data` as transformed `content.data.data`', () => {
            expect(page.imageBlockComponent.data).toEqual({
              'mock-api-pipe': Data.Api.getCaseStudies('Case Study 2')
                .content[0].data[0].data
            } as any);
          });

          it('should set `ImageBlockComponent` `full-bleed` attribute if `content.data.fullBleed`', () => {
            ((comp.post as Post).content[0]
              .data[0] as ImageBlock).fullBleed = true;
            changeDetectorRef.markForCheck();
            fixture.detectChanges();

            expect(page.imageBlock.getAttribute('full-bleed')).toBeTruthy();
          });

          it('should not set `ImageBlockComponent` `full-bleed` attribute if no `content.data.fullBleed`', () => {
            ((comp.post as Post).content[0]
              .data[0] as ImageBlock).fullBleed = undefined;
            changeDetectorRef.markForCheck();
            fixture.detectChanges();

            expect(page.imageBlock.getAttribute('full-bleed')).toBeFalsy();
          });
        });

        describe('Gallery', () => {
          beforeEach(() => {
            comp.post = Data.Api.getCaseStudies('Case Study 3');
            changeDetectorRef.markForCheck();
            fixture.detectChanges();
          });

          it('should display `GalleryBlockComponent`', () => {
            expect(page.galleryBlock).toBeTruthy();
          });

          it('should call `ApiPipe` with `content.data.data`', () => {
            expect(MockApiPipe.prototype.transform).toHaveBeenCalledWith(
              Data.Api.getCaseStudies('Case Study 3').content[0].data[0].data
            );
          });

          it('should set `GalleryBlockComponent` `data` as transformed `content.data.data`', () => {
            expect(page.galleryBlockComponent.data).toEqual({
              'mock-api-pipe': Data.Api.getCaseStudies('Case Study 3')
                .content[0].data[0].data
            } as any);
          });
        });

        describe('Duo', () => {
          beforeEach(() => {
            comp.post = Data.Api.getServices('Service 1');
            changeDetectorRef.markForCheck();
            fixture.detectChanges();
          });

          it('should display `DuoBlockComponent`', () => {
            expect(page.duoBlock).toBeTruthy();
          });

          it('should call `ApiPipe` with `content.data.data`', () => {
            expect(MockApiPipe.prototype.transform).toHaveBeenCalledWith(
              Data.Api.getServices('Service 1').content[0].data[0].data
            );
          });

          it('should set `DuoBlockComponent` `data` as transformed `content.data.data`', () => {
            expect(page.duoBlockComponent.data).toEqual({
              'mock-api-pipe': Data.Api.getServices('Service 1').content[0]
                .data[0].data
            } as any);
          });
        });

        describe('Video', () => {
          beforeEach(() => {
            comp.post = Data.Api.getServices('Service 2');
            changeDetectorRef.markForCheck();
            fixture.detectChanges();
          });

          it('should display `VideoBlockComponent`', () => {
            expect(page.videoBlock).toBeTruthy();
          });

          it('should call `ApiPipe` with `content.data.data`', () => {
            expect(MockApiPipe.prototype.transform).toHaveBeenCalledWith(
              Data.Api.getServices('Service 2').content[0].data[0].data
            );
          });

          it('should set `VideoBlockComponent` `data` as transformed `content.data.data`', () => {
            expect(page.videoBlockComponent.data).toEqual({
              'mock-api-pipe': Data.Api.getServices('Service 2').content[0]
                .data[0].data
            } as any);
          });
        });

        describe('Audio', () => {
          beforeEach(() => {
            comp.post = Data.Api.getServices('Service 3');
            changeDetectorRef.markForCheck();
            fixture.detectChanges();
          });

          it('should display `AudioBlockComponent`', () => {
            expect(page.audioBlock).toBeTruthy();
          });

          it('should call `ApiPipe` with `content.data.data`', () => {
            expect(MockApiPipe.prototype.transform).toHaveBeenCalledWith(
              Data.Api.getServices('Service 3').content[0].data[0].data
            );
          });

          it('should set `VideoBlockComponent` `data` as transformed `content.data.data`', () => {
            expect(page.audioBlockComponent.data).toEqual({
              'mock-api-pipe': Data.Api.getServices('Service 3').content[0]
                .data[0].data
            } as any);
          });
        });
      });
    });
  });
});

class Page {
  get title() {
    return this.query<HTMLHeadingElement>('#intro h1');
  }
  get introText() {
    return this.queryAll<HTMLParagraphElement>('#text-intro p');
  }
  get introOverview() {
    return this.query<HTMLDivElement>('#info-overview');
  }
  get introOverviewServices() {
    return this.queryAll<HTMLLIElement>('#info-overview li');
  }
  get sectionTitle() {
    return this.query<HTMLHeadingElement>('section:nth-of-type(2) h2');
  }
  get textBlock() {
    return this.query<HTMLElement>('text-block');
  }
  get imageBlock() {
    return this.query<HTMLElement>('image-block');
  }
  get galleryBlock() {
    return this.query<HTMLElement>('gallery-block');
  }
  get duoBlock() {
    return this.query<HTMLElement>('duo-block');
  }
  get videoBlock() {
    return this.query<HTMLElement>('video-block');
  }
  get audioBlock() {
    return this.query<HTMLElement>('audio-block');
  }
  get error() {
    return this.query<HTMLElement>('error');
  }

  get textBlockComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubTextBlockComponent)
    );
    return directiveEl.injector.get<StubTextBlockComponent>(
      StubTextBlockComponent
    );
  }
  get imageBlockComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubImageBlockComponent)
    );
    return directiveEl.injector.get<StubImageBlockComponent>(
      StubImageBlockComponent
    );
  }
  get duoBlockComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubDuoBlockComponent)
    );
    return directiveEl.injector.get<StubDuoBlockComponent>(
      StubDuoBlockComponent
    );
  }
  get galleryBlockComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubGalleryBlockComponent)
    );
    return directiveEl.injector.get<StubGalleryBlockComponent>(
      StubGalleryBlockComponent
    );
  }
  get videoBlockComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubVideoBlockComponent)
    );
    return directiveEl.injector.get<StubVideoBlockComponent>(
      StubVideoBlockComponent
    );
  }
  get audioBlockComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubAudioBlockComponent)
    );
    return directiveEl.injector.get<StubAudioBlockComponent>(
      StubAudioBlockComponent
    );
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(PostComponent);
  comp = fixture.componentInstance;
  changeDetectorRef = (comp as any).changeDetectorRef;
  page = new Page();
  apiService = fixture.debugElement.injector.get<ApiService>(ApiService);
  jest.spyOn(changeDetectorRef, 'markForCheck');
  jest.spyOn(MockApiPipe.prototype, 'transform');

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
