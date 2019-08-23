import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';
import {
  RouterTestingModule,
  MockApiService,
  MockApiPipe,
  StubImageComponent,
  Data
} from 'testing';

import { ApiService } from 'shared';
import { AboutImages } from './about.images';
import { AboutComponent } from './about.component';

let comp: AboutComponent;
let fixture: ComponentFixture<AboutComponent>;
let page: Page;
let apiService: ApiService;

beforeEach(jest.clearAllMocks);

describe('AboutComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AboutComponent, StubImageComponent, MockApiPipe],
      providers: [{ provide: ApiService, useClass: MockApiService }]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`ngOnInit`', () => {
    it('should set `team$` as `ApiService` `getTeam`', () => {
      const returnValue = of('getTeam');
      (apiService.getTeam as jest.Mock).mockReturnValue(returnValue);
      comp.ngOnInit();

      expect(comp.team$).toBe(returnValue);
    });
  });

  describe('Template', () => {
    it('should display title', () => {
      expect(page.title).toBeTruthy();
    });

    describe('Intro', () => {
      describe('Image', () => {
        it('should be displayed', () => {
          expect(page.introImage).toBeTruthy();
        });

        it('should call `ApiPipe`', () => {
          expect(MockApiPipe.prototype.transform).toHaveBeenCalledWith(
            AboutImages.intro
          );
        });

        it('should set `ImageComponent` `image` as image', () => {
          expect(page.imageComponents[0].image).toEqual({
            'mock-api-pipe': AboutImages.intro
          } as any);
        });

        it('should set `ImageComponent` `full-height` attribute', () => {
          expect(page.introImage.hasAttribute('full-height')).toBeTruthy();
        });
      });
    });

    describe('People', () => {
      it('should be displayed', () => {
        expect(page.people.length).toBe(Data.Api.getTeam<void>().length + 1);
      });

      describe('Person', () => {
        describe('Thumbnail', () => {
          it('should be displayed', () => {
            expect(page.personThumbnail).toBeTruthy();
          });

          it('should call `ApiPipe`', () => {
            expect(MockApiPipe.prototype.transform).toHaveBeenCalledWith(
              Data.Api.getTeam('Person 1').thumbnail
            );
          });

          it('should set ImageComponent `image` as transformed `thumbnail`', () => {
            expect(page.imageComponents[1].image).toEqual({
              'mock-api-pipe': Data.Api.getTeam('Person 1').thumbnail
            } as any);
          });
        });

        it('should display name', () => {
          expect(page.personName.textContent).toBe(
            Data.Api.getTeam('Person 1').name
          );
        });

        it('should display position', () => {
          expect(page.personPosition.textContent).toBe(
            Data.Api.getTeam('Person 1').position
          );
        });
      });

      describe('Join the team', () => {
        it('should be displayed', () => {
          expect(page.personJoinTeam).toBeTruthy();
        });

        it('should set href', () => {
          expect(page.personJoinTeam.href).toBe('http://localhost/careers');
        });
      });
    });
  });
});

class Page {
  get title() {
    return this.query<HTMLHeadingElement>('h1');
  }
  get introImage() {
    return this.query<HTMLElement>('#intro-image image-component');
  }
  get people() {
    return this.queryAll<HTMLDivElement>('.person');
  }
  get personThumbnail() {
    return this.query<HTMLElement>('.person image-component');
  }
  get personName() {
    return this.query<HTMLHeadingElement>('.person h4');
  }
  get personPosition() {
    return this.query<HTMLSpanElement>('.person span');
  }
  get personJoinTeam() {
    return this.query<HTMLAnchorElement>('a.person');
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
  fixture = TestBed.createComponent(AboutComponent);
  comp = fixture.componentInstance;
  page = new Page();
  apiService = fixture.debugElement.injector.get<ApiService>(ApiService);
  jest.spyOn(MockApiPipe.prototype, 'transform');

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
