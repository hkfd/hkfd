import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  MockApiPipe,
  StubImageComponent,
  Data
} from 'testing';
import { ApiPipe } from 'shared';
import { SliderWorkComponent } from './slider-work.component';

let compHost: TestHostComponent;
let comp: SliderWorkComponent;
let fixture: ComponentFixture<TestHostComponent>;
let apiPipe: jasmine.Spy;
let page: Page;

@Component({
  selector: 'app-host',
  template: '<slider-work [caseStudies]="caseStudies"></slider-work>'
})
class TestHostComponent {
  caseStudies: any;
}

describe('SliderWorkComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        TestHostComponent,
        SliderWorkComponent,
        StubImageComponent
      ],
      providers: [{ provide: ApiPipe, useClass: MockApiPipe }]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`caseStudies`', () => {
    describe('Has `caseStudies`', () => {
      beforeEach(() => {
        compHost.caseStudies = Data.Api.getCaseStudies<void>();
        fixture.detectChanges();
      });

      it('should set `caseStudies`', () => {
        expect(comp.caseStudies).toEqual(Data.Api.getCaseStudies<void>());
      });

      describe('`images`', () => {
        it('should call `ApiPipe` with `thumbnail`', () => {
          comp.caseStudies.forEach(caseStudy =>
            expect(apiPipe).toHaveBeenCalledWith(caseStudy.thumbnail)
          );
        });

        it('should be set as transformed `thumbnail` array', () => {
          expect(comp.images).toEqual([
            Data.Api.getCaseStudies('Case Study 1').thumbnail,
            Data.Api.getCaseStudies('Case Study 2').thumbnail,
            Data.Api.getCaseStudies('Case Study 3').thumbnail
          ] as any);
        });
      });

      it('should call `sliderInit`', () => {
        expect(page.sliderInit).toHaveBeenCalled();
      });
    });

    describe('No `caseStudies`', () => {
      beforeEach(() => {
        compHost.caseStudies = undefined;
        fixture.detectChanges();
      });

      it('should not set `caseStudies`', () => {
        expect(comp.caseStudies).toBeUndefined();
      });

      it('should not set `images`', () => {
        expect(comp.images).toBeUndefined();
      });

      it('should not call `sliderInit`', () => {
        expect(page.sliderInit).not.toHaveBeenCalled();
      });
    });
  });

  describe('Template', () => {
    beforeEach(() => {
      compHost.caseStudies = Data.Api.getCaseStudies<void>();
      fixture.detectChanges();
    });

    describe('Nav', () => {
      describe('Prev', () => {
        it('should be displayed', () => {
          expect(page.sliderPrev).toBeTruthy();
        });

        it('should call `changeImage` on click with `-1` arg', () => {
          page.sliderPrev.click();

          expect(page.changeImage).toHaveBeenCalledWith(-1);
        });
      });

      describe('Next', () => {
        it('should be displayed', () => {
          expect(page.sliderNext).toBeTruthy();
        });

        it('should call `changeImage` on click with `1` arg', () => {
          page.sliderNext.click();

          expect(page.changeImage).toHaveBeenCalledWith(1);
        });
      });
    });

    describe('Slides', () => {
      it('should be displayed', () => {
        expect(page.slides.length).toBe(Data.Api.getCaseStudies<void>().length);
      });

      it('should set style transform as `currentIndex` translate', () => {
        comp.currentIndex = 5;
        fixture.detectChanges();

        expect(page.slideContainer.style.transform).toBe(
          `translateX(${5 * -100}%)`
        );
      });

      describe('Slide', () => {
        describe('Title', () => {
          it('should be displayed', () => {
            expect((page.slideTitle.textContent as string).trim()).toBe(
              Data.Api.getCaseStudies('Case Study 1').title
            );
          });

          it('should set href', () => {
            expect(page.slideTitle.href).toBe(
              `http://localhost:9876/work/${
                Data.Api.getCaseStudies('Case Study 1').id
              }`
            );
          });
        });

        it('should display sector', () => {
          expect(page.slideSector.textContent).toBe(Data.Api.getCaseStudies(
            'Case Study 1'
          ).sector as any);
        });

        describe('See more', () => {
          it('should be displayed', () => {
            expect(page.slideButton).toBeTruthy();
          });

          it('should set href', () => {
            expect(page.slideButton.href).toBe(
              `http://localhost:9876/work/${
                Data.Api.getCaseStudies('Case Study 1').id
              }`
            );
          });
        });

        describe('Thumbnail', () => {
          it('should be displayed', () => {
            expect(page.slideThumbnail).toBeTruthy();
          });

          it('should set `ImageComponent` `image` as `thumbnail`', () => {
            expect(page.imageComponent.image).toEqual(Data.Api.getCaseStudies(
              'Case Study 1'
            ).thumbnail as any);
          });

          it('should set `ImageComponent` `full-height` attribute', () => {
            expect(
              page.slideThumbnail.hasAttribute('full-height')
            ).toBeTruthy();
          });
        });

        it('should set class as `colour`', () => {
          expect(
            page.slides[0].classList.contains(
              Data.Api.getCaseStudies('Case Study 1').colour
            )
          ).toBeTruthy();
        });
      });
    });
  });
});

class Page {
  sliderInit: jasmine.Spy;
  changeImage: jasmine.Spy;

  get sliderPrev() {
    return this.query<HTMLButtonElement>('.slider-prev');
  }
  get sliderNext() {
    return this.query<HTMLButtonElement>('.slider-next');
  }
  get slideContainer() {
    return this.query<HTMLDivElement>('.slide-container');
  }
  get slides() {
    return this.queryAll<HTMLDivElement>('.slide');
  }
  get slideTitle() {
    return this.query<HTMLAnchorElement>('.slide .info-meta a');
  }
  get slideSector() {
    return this.query<HTMLElement>('.slide .info-meta span');
  }
  get slideButton() {
    return this.query<HTMLAnchorElement>('.slide .info-more a');
  }
  get slideThumbnail() {
    return this.query<HTMLElement>('.slide image-component');
  }

  get imageComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubImageComponent)
    );
    return directiveEl.injector.get<StubImageComponent>(StubImageComponent);
  }

  constructor() {
    this.sliderInit = spyOn(comp, 'sliderInit').and.callThrough();
    this.changeImage = spyOn(comp, 'changeImage').and.callThrough();
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(TestHostComponent);
  compHost = fixture.componentInstance;
  comp = fixture.debugElement.query(By.directive(SliderWorkComponent))
    .componentInstance;
  page = new Page();
  apiPipe = spyOn(MockApiPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
