import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StubLazyDirective, Data } from 'testing';
import { ImageComponent } from './image.component';

let comp: ImageComponent;
let fixture: ComponentFixture<ImageComponent>;
let page: Page;

describe('ImageComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [ImageComponent, StubLazyDirective]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  beforeEach(() => {
    comp.image = Data.Generic.getImage();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `image`', () => {
    expect(comp.image).toEqual(Data.Generic.getImage());
  });

  describe('Template', () => {
    it('should display img', () => {
      expect(page.img).toBeTruthy();
    });

    it('should set src', () => {
      expect(page.img.src).toBe(Data.Generic.getImage().src);
    });

    it('should set alt', () => {
      expect(page.img.alt).toBe(Data.Generic.getImage().alt);
    });

    it('should set `LazyDirective` `data` as `srcset`', () => {
      expect(page.lazyDirective.data).toEqual(Data.Generic.getImage().srcset);
    });
  });
});

class Page {
  get img() {
    return this.query<HTMLImageElement>('img');
  }

  get lazyDirective() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubLazyDirective)
    );
    return directiveEl.injector.get<StubLazyDirective>(StubLazyDirective);
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(ImageComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
