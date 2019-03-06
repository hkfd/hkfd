import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  MockMetaService,
  MockApiService,
  MockApiPipe,
  StubImageComponent,
  Data
} from 'testing';

import { MetaService, ApiService } from 'shared';
import { CareersImages } from './careers.images';
import { CareersComponent } from './careers.component';

let comp: CareersComponent;
let fixture: ComponentFixture<CareersComponent>;
let page: Page;
let metaService: MetaService;
let apiService: ApiService;

describe('CareersComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CareersComponent, StubImageComponent, MockApiPipe],
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
    it('should call `MetaService` `setMetaTags` with `title` and `url` args', () => {
      expect(metaService.setMetaTags).toHaveBeenCalledWith({
        title: 'Careers',
        url: 'careers'
      });
    });

    it('should set `careers$`', () => {
      expect(comp.careers$).toBeDefined();
    });

    it('should call `ApiService` `getCareers`', () => {
      expect(apiService.getCareers).toHaveBeenCalled();
    });

    it('should set `careers`', () => {
      expect(comp.careers).toEqual(Data.Api.getCareers<void>());
    });
  });

  describe('`ngOnDestroy`', () => {
    it('should call `careers$` `unsubscribe`', () => {
      jest.spyOn(comp.careers$, 'unsubscribe');
      comp.ngOnDestroy();

      expect(comp.careers$.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('`careerTrackBy`', () => {
    it('should return `id`', () => {
      const res = comp.careerTrackBy(0, Data.Api.getCareers('Career 1'));

      expect(res).toBe(Data.Api.getCareers('Career 1').id);
    });
  });

  describe('Template', () => {
    it('should display title', () => {
      expect(page.title).toBeTruthy();
    });

    describe('Hiring section', () => {
      describe('Image', () => {
        it('should be displayed', () => {
          expect(page.hiringImage).toBeTruthy();
        });

        it('should call `ApiPipe` with image', () => {
          expect(MockApiPipe.prototype.transform).toHaveBeenCalledWith(
            CareersImages.hiring
          );
        });

        it('should set `ImageComponent` `image` as transformed `image`', () => {
          expect(page.imageComponents[0].image).toEqual({
            'mock-api-pipe': CareersImages.hiring
          } as any);
        });

        it('should set `ImageComponent` `full-height` attribute', () => {
          expect(page.hiringImage.hasAttribute('full-height')).toBeTruthy();
        });
      });
    });

    describe('Careers section', () => {
      describe('Image', () => {
        it('should be displayed', () => {
          expect(page.careersImage).toBeTruthy();
        });

        it('should call `ApiPipe` with image', () => {
          expect(MockApiPipe.prototype.transform).toHaveBeenCalledWith(
            CareersImages.career
          );
        });

        it('should set `ImageComponent` `image` as transformed `image`', () => {
          expect(page.imageComponents[1].image).toEqual({
            'mock-api-pipe': CareersImages.career
          } as any);
        });

        it('should set `ImageComponent` `full-height` attribute', () => {
          expect(page.careersImage.hasAttribute('full-height')).toBeTruthy();
        });
      });

      describe('Careers', () => {
        it('should be displayed', () => {
          expect(page.careers.length).toBe(Data.Api.getCareers<void>().length);
        });

        describe('Career', () => {
          it('should display title', () => {
            expect(page.careerTitle.textContent).toBe(
              Data.Api.getCareers('Career 1').title
            );
          });

          it('should display salary', () => {
            expect(page.careerSalary.textContent).toBe(
              Data.Api.getCareers('Career 1').salary
            );
          });

          it('should set href', () => {
            expect(page.careers[0].href).toBe(
              `http://localhost/${Data.Api.getCareers('Career 1').id}`
            );
          });
        });
      });
    });
  });
});

class Page {
  get title() {
    return this.query<HTMLHeadingElement>('h1');
  }
  get hiringImage() {
    return this.query<HTMLElement>('#hiring-image image-component');
  }
  get careers() {
    return this.queryAll<HTMLAnchorElement>('.career');
  }
  get careersImage() {
    return this.query<HTMLElement>('#careers image-component');
  }
  get careerTitle() {
    return this.query<HTMLHeadingElement>('.career h3');
  }
  get careerSalary() {
    return this.query<HTMLHeadingElement>('.career span');
  }

  get imageComponents() {
    const directiveEls = fixture.debugElement.queryAll(
      By.directive(StubImageComponent)
    );
    return directiveEls.map(el =>
      el.injector.get<StubImageComponent>(StubImageComponent)
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
  fixture = TestBed.createComponent(CareersComponent);
  comp = fixture.componentInstance;
  page = new Page();
  metaService = fixture.debugElement.injector.get<MetaService>(MetaService);
  apiService = fixture.debugElement.injector.get<ApiService>(ApiService);
  jest.spyOn(MockApiPipe.prototype, 'transform');

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
