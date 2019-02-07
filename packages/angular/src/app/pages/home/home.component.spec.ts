import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  MockMetaService,
  MockApiService,
  MockApiPipe,
  StubImageComponent,
  StubSliderComponent,
  StubSliderWorkComponent,
  Data
} from 'testing';

import { MetaService, ApiService } from 'shared';
import { CaseStudy } from 'api';
import { HomeImages } from './home.images';
import { HomeComponent } from './home.component';

let comp: HomeComponent;
let fixture: ComponentFixture<HomeComponent>;
let page: Page;
let metaService: MetaService;
let apiService: ApiService;

describe('HomeComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        HomeComponent,
        StubImageComponent,
        StubSliderComponent,
        StubSliderWorkComponent,
        MockApiPipe
      ],
      providers: [
        { provide: MetaService, useClass: MockMetaService },
        { provide: ApiService, useClass: MockApiService }
      ]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`ngOnInit`', () => {
    it('should call `MetaService` `setMetaTags` with `{}` arg', () => {
      expect(metaService.setMetaTags).toHaveBeenCalledWith({});
    });

    it('should set `services$`', () => {
      expect(comp.services$).toBeDefined();
    });

    it('should call `ApiService` `getServices`', () => {
      expect(apiService.getServices).toHaveBeenCalled();
    });

    it('should set `clients$`', () => {
      expect(comp.clients$).toBeDefined();
    });

    it('should call `ApiService` `getClients`', () => {
      expect(apiService.getClients).toHaveBeenCalled();
    });

    it('should set `caseStudies$`', () => {
      expect(comp.caseStudies$).toBeDefined();
    });

    it('should call `ApiService` `getCaseStudies`', () => {
      expect(apiService.getCaseStudies).toHaveBeenCalled();
    });

    describe('`caseStudies`', () => {
      it('should be set', () => {
        expect(comp.caseStudies).toBeDefined();
      });

      it('should be set as `featured` only', () => {
        (comp.caseStudies as CaseStudy[]).forEach(caseStudy =>
          expect(caseStudy.featured).toBe(true)
        );
      });
    });
  });

  describe('`ngOnDestroy`', () => {
    it('should call `caseStudies$` `unsubscribe`', () => {
      jest.spyOn(comp.caseStudies$, 'unsubscribe');
      comp.ngOnDestroy();

      expect(comp.caseStudies$.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('Template', () => {
    it('should display title', () => {
      expect(page.title.textContent).toBeTruthy();
    });

    describe('Intro slider', () => {
      it('should be displayed', () => {
        expect(page.introSlider).toBeTruthy();
      });

      it('should call `ApiPipe` with intro images', () => {
        expect(MockApiPipe.prototype.transform).toHaveBeenCalledWith(
          HomeImages.intro
        );
      });

      it('should set `SliderComponent` `images` as transformed intro images', () => {
        expect(page.sliderComponent.images).toEqual({
          'mock-api-pipe': comp.images.intro
        } as any);
      });

      it('should set `SliderComponent` `autoplay` as `true`', () => {
        expect(page.sliderComponent.autoplay).toBe(true);
      });
    });

    describe('Help', () => {
      it('should set href', () => {
        expect(page.helpButton.href).toBe('http://localhost/about');
      });
    });

    describe('Services', () => {
      it('should be displayed', () => {
        expect(page.services.length).toBe(Data.Api.getServices<void>().length);
      });

      describe('Service', () => {
        describe('Thumbnail', () => {
          it('should be displayed', () => {
            expect(page.serviceThumbnail).toBeTruthy();
          });

          it('should call `ApiPipe` with `thumbnail`', () => {
            expect(MockApiPipe.prototype.transform).toHaveBeenCalledWith(
              Data.Api.getServices('Service 1').thumbnail
            );
          });

          it('should set `ImageComponent` `image` as `thumbnail`', () => {
            expect(page.imageComponent.image).toEqual({
              'mock-api-pipe': Data.Api.getServices('Service 1').thumbnail
            } as any);
          });

          it('should set `ImageComponent` `full-height` attribute', () => {
            expect(
              page.serviceThumbnail.hasAttribute('full-height')
            ).toBeTruthy();
          });
        });

        it('should display title', () => {
          expect(page.serviceTitle.textContent).toBe(
            Data.Api.getServices('Service 1').title
          );
        });

        it('should display description', () => {
          expect(page.serviceDescription.textContent).toBe(
            Data.Api.getServices('Service 1').description
          );
        });

        it('should set href', () => {
          expect(page.services[0].href).toBe(
            `http://localhost/service/${Data.Api.getServices('Service 1').id}`
          );
        });
      });
    });

    describe('Work slider', () => {
      it('should be displayed', () => {
        expect(page.workSlider).toBeTruthy();
      });

      it('should set `SliderWorkComponent` `caseStudies` as `caseStudies`', () => {
        expect(page.sliderWorkComponent.caseStudies).toEqual(
          comp.caseStudies as CaseStudy[]
        );
      });

      it('should set `SliderWorkComponent` `autoplay` as `true`', () => {
        expect(page.sliderWorkComponent.autoplay).toBe(true);
      });

      it('should set `SliderWorkComponent` `random` as `true`', () => {
        expect(page.sliderWorkComponent.random).toBe(true);
      });
    });

    describe('Clients', () => {
      it('should be displayed', () => {
        expect(page.clients.length).toBe(Data.Api.getClients().length);
      });

      describe('Client', () => {
        it('should display name', () => {
          expect((page.clientName.textContent as string).trim()).toBe(
            'Client 1'
          );
        });
      });
    });
  });
});

class Page {
  get title() {
    return this.query<HTMLHeadingElement>('h1');
  }
  get introSlider() {
    return this.query<HTMLElement>('slider');
  }
  get helpButton() {
    return this.query<HTMLAnchorElement>('#help a');
  }
  get services() {
    return this.queryAll<HTMLAnchorElement>('.service');
  }
  get serviceThumbnail() {
    return this.query<HTMLElement>('.service image-component');
  }
  get serviceTitle() {
    return this.query<HTMLHeadingElement>('.service h3');
  }
  get serviceDescription() {
    return this.query<HTMLParagraphElement>('.service p');
  }
  get workSlider() {
    return this.query<HTMLElement>('slider-work');
  }
  get clients() {
    return this.queryAll<HTMLLIElement>('.client');
  }
  get clientName() {
    return this.query<HTMLLIElement>('.client .client-name');
  }

  get imageComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubImageComponent)
    );
    return directiveEl.injector.get<StubImageComponent>(StubImageComponent);
  }
  get sliderComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubSliderComponent)
    );
    return directiveEl.injector.get<StubSliderComponent>(StubSliderComponent);
  }
  get sliderWorkComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubSliderWorkComponent)
    );
    return directiveEl.injector.get<StubSliderWorkComponent>(
      StubSliderWorkComponent
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
  fixture = TestBed.createComponent(HomeComponent);
  comp = fixture.componentInstance;
  page = new Page();
  metaService = fixture.debugElement.injector.get<MetaService>(MetaService);
  apiService = fixture.debugElement.injector.get<ApiService>(ApiService);
  jest.spyOn(MockApiPipe.prototype, 'transform');

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
