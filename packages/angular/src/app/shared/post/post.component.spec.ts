import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  MockApiPipe,
  ActivatedRoute,
  ActivatedRouteStub,
  StubTextBlockComponent,
  StubImageBlockComponent,
  StubDuoBlockComponent,
  StubGalleryBlockComponent,
  StubVideoBlockComponent,
  StubAudioBlockComponent,
  Data
} from 'testing';

import { Api } from 'shared';
import { PostComponent } from './post.component';

let comp: PostComponent;
let fixture: ComponentFixture<PostComponent>;
let page: Page;
let activatedRoute: ActivatedRouteStub;
let apiPipe: jasmine.Spy;

describe('PostComponent', () => {
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testData = { post: Data.Api.getCaseStudies('Case Study 1') };

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
        MockApiPipe
      ],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`ngOnInit`', () => {
    it('should set `post$`', () => {
      expect(comp.post$).toBeDefined();
    });

    it('should subscribe to `ActivatedRoute` `data`', () => {
      expect(activatedRoute.data.subscribe).toHaveBeenCalled();
    });

    it('should set `post`', () => {
      expect(comp.post).toEqual(Data.Api.getCaseStudies('Case Study 1'));
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
    it('should call `post$` `unsubscribe`', () => {
      const spy = spyOn(comp.post$, 'unsubscribe').and.callThrough();
      comp.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Template', () => {
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
        describe('`CaseStudy`', () => {
          beforeEach(() => {
            comp.post = Data.Api.getCaseStudies('Case Study 1');
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

        describe('`Service`', () => {
          beforeEach(() => {
            comp.post = Data.Api.getServices('Service 1');
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
            (comp.post as Api.Post).content[0].title = 'Title';
            fixture.detectChanges();
          });

          it('should be displayed', () => {
            expect(page.sectionTitle.textContent).toBe('Title');
          });
        });

        describe('No `title`', () => {
          beforeEach(() => {
            (comp.post as Api.Post).content[0].title = undefined;
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
          fixture.detectChanges();
        });

        it('should display `TextBlockComponent`', () => {
          expect(page.textBlock).toBeTruthy();
        });

        it('should not call `ApiPipe`', () => {
          expect(apiPipe).not.toHaveBeenCalled();
        });

        it('should set `TextBlockComponent` `data` as `content.data`', () => {
          expect(page.textBlockComponent.data).toEqual(Data.Api.getCaseStudies(
            'Case Study 1'
          ).content[0].data[0] as any);
        });
      });

      describe('Image', () => {
        beforeEach(() => {
          comp.post = Data.Api.getCaseStudies('Case Study 2');
          fixture.detectChanges();
        });

        it('should display `ImageBlockComponent`', () => {
          expect(page.imageBlock).toBeTruthy();
        });

        it('should call `ApiPipe` with `content.data.data`', () => {
          expect(apiPipe).toHaveBeenCalledWith(
            Data.Api.getCaseStudies('Case Study 2').content[0].data[0].data
          );
        });

        it('should set `ImageBlockComponent` `data` as `content.data.data`', () => {
          expect(page.imageBlockComponent.data).toEqual(Data.Api.getCaseStudies(
            'Case Study 2'
          ).content[0].data[0].data as any);
        });

        it('should set `ImageBlockComponent` `full-bleed` attribute if `content.data.fullBleed`', () => {
          ((comp.post as Api.Post).content[0]
            .data[0] as Api.Blocks.ImageBlock).fullBleed = true;
          fixture.detectChanges();

          expect(page.imageBlock.getAttribute('full-bleed')).toBeTruthy();
        });

        it('should not set `ImageBlockComponent` `full-bleed` attribute if no `content.data.fullBleed`', () => {
          ((comp.post as Api.Post).content[0]
            .data[0] as Api.Blocks.ImageBlock).fullBleed = undefined;
          fixture.detectChanges();

          expect(page.imageBlock.getAttribute('full-bleed')).toBeFalsy();
        });
      });

      describe('Gallery', () => {
        beforeEach(() => {
          comp.post = Data.Api.getCaseStudies('Case Study 3');
          fixture.detectChanges();
        });

        it('should display `GalleryBlockComponent`', () => {
          expect(page.galleryBlock).toBeTruthy();
        });

        it('should call `ApiPipe` with `content.data.data`', () => {
          expect(apiPipe).toHaveBeenCalledWith(
            Data.Api.getCaseStudies('Case Study 3').content[0].data[0].data
          );
        });

        it('should set `GalleryBlockComponent` `data` as `content.data.data`', () => {
          expect(page.galleryBlockComponent.data).toEqual(
            Data.Api.getCaseStudies('Case Study 3').content[0].data[0]
              .data as any
          );
        });
      });

      describe('Duo', () => {
        beforeEach(() => {
          comp.post = Data.Api.getServices('Service 1');
          fixture.detectChanges();
        });

        it('should display `DuoBlockComponent`', () => {
          expect(page.duoBlock).toBeTruthy();
        });

        it('should call `ApiPipe` with `content.data.data`', () => {
          expect(apiPipe).toHaveBeenCalledWith(
            Data.Api.getServices('Service 1').content[0].data[0].data
          );
        });

        it('should set `DuoBlockComponent` `data` as `content.data.data`', () => {
          expect(page.duoBlockComponent.data).toEqual(Data.Api.getServices(
            'Service 1'
          ).content[0].data[0].data as any);
        });
      });

      describe('Video', () => {
        beforeEach(() => {
          comp.post = Data.Api.getServices('Service 2');
          fixture.detectChanges();
        });

        it('should display `VideoBlockComponent`', () => {
          expect(page.videoBlock).toBeTruthy();
        });

        it('should call `ApiPipe` with `content.data.data`', () => {
          expect(apiPipe).toHaveBeenCalledWith(
            Data.Api.getServices('Service 2').content[0].data[0].data
          );
        });

        it('should set `VideoBlockComponent` `data` as `content.data.data`', () => {
          expect(page.videoBlockComponent.data).toEqual(Data.Api.getServices(
            'Service 2'
          ).content[0].data[0].data as any);
        });
      });

      describe('Audio', () => {
        beforeEach(() => {
          comp.post = Data.Api.getServices('Service 3');
          fixture.detectChanges();
        });

        it('should display `AudioBlockComponent`', () => {
          expect(page.audioBlock).toBeTruthy();
        });

        it('should call `ApiPipe` with `content.data.data`', () => {
          expect(apiPipe).toHaveBeenCalledWith(
            Data.Api.getServices('Service 3').content[0].data[0].data
          );
        });

        it('should set `VideoBlockComponent` `data` as `content.data.data`', () => {
          expect(page.audioBlockComponent.data).toEqual(Data.Api.getServices(
            'Service 3'
          ).content[0].data[0].data as any);
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
  page = new Page();
  apiPipe = spyOn(MockApiPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
