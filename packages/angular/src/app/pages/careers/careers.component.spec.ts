import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

import { of } from 'rxjs';

import {
  RouterTestingModule,
  MockPrismicService,
  MockApiPipe,
  StubImageComponent,
  Data,
  MockPrismicTextPipe
} from 'testing';

import { PrismicService } from 'shared';
import { CareerPost } from 'prismic';
import { CareersImages } from './careers.images';
import { CareersComponent } from './careers.component';

let comp: CareersComponent;
let fixture: ComponentFixture<CareersComponent>;
let page: Page;
let prismicService: PrismicService;

beforeEach(jest.clearAllMocks);

describe('CareersComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        CareersComponent,
        StubImageComponent,
        MockApiPipe,
        MockPrismicTextPipe
      ],
      providers: [{ provide: PrismicService, useClass: MockPrismicService }]
    })
      .overrideComponent(CareersComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents()));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`ngOnInit`', () => {
    it('should set `careers$` as `PrismicService` `getPosts`', () => {
      (prismicService.getPosts as jest.Mock).mockReturnValue(of('getPosts'));
      comp.ngOnInit();

      expect(comp.careers$).toEqual(prismicService.getPosts('career'));
    });
  });

  describe('`careerTrackBy`', () => {
    it('should return `id`', () => {
      const res = comp.careerTrackBy(0, { id: 'id' } as CareerPost);

      expect(res).toBe('id');
    });
  });

  describe('Template', () => {
    beforeEach(() => {
      comp.careers$ = of(Data.Prismic.getCareerPostsResponse());
      fixture.detectChanges();
    });

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
          expect(page.careers.length).toBe(
            Data.Prismic.getCareerPosts<void>().length
          );
        });

        describe('Career', () => {
          it('should call `PrismicTextPipe` with `career.data.title`', () => {
            expect(
              MockPrismicTextPipe.prototype.transform
            ).toHaveBeenCalledWith(
              Data.Prismic.getCareerPosts('post-1').data.title,
              'asText'
            );
          });

          it('should display title', () => {
            expect(page.careerTitle.textContent).toBeTruthy();
          });

          it('should display salary', () => {
            expect(page.careerSalary.textContent).toBe('Post 1 salary');
          });

          it('should set href', () => {
            expect(page.careers[0].href).toBe(
              'http://localhost/careers/post-1'
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
    return this.query<HTMLSpanElement>('.career span');
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
  prismicService = fixture.debugElement.injector.get<PrismicService>(
    PrismicService
  );
  jest.spyOn(MockApiPipe.prototype, 'transform');
  jest.spyOn(MockPrismicTextPipe.prototype, 'transform');

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
