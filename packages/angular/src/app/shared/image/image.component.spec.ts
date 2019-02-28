import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StubLazyDirective, Data } from 'testing';
import { createPlaceholderImg } from './image.helpers';
import { ImageComponent } from './image.component';

let comp: ImageComponent;
let fixture: ComponentFixture<ImageComponent>;
let page: Page;

jest.mock('./image.helpers', () => ({
  createPlaceholderImg: jest.fn().mockReturnValue('createPlaceholderImgReturn')
}));

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

  beforeEach(jest.clearAllMocks);

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`image`', () => {
    describe('Has `image`', () => {
      beforeEach(() => (comp.image = Data.Generic.getImage()));

      it('should set `image`', () => {
        expect(comp.image).toEqual(Data.Generic.getImage());
      });

      it('should call `createPlaceholderImg` with `image` arg', () => {
        expect(createPlaceholderImg).toHaveBeenCalledWith(
          Data.Generic.getImage()
        );
      });

      it('should set `img` as `createPlaceholderImg` return', () => {
        expect(comp.img).toBe('createPlaceholderImgReturn');
      });
    });

    describe('No `image`', () => {
      beforeEach(() => (comp.image = null as any));

      it('should not set `image`', () => {
        expect(comp.image).toEqual(Data.Generic.getImage());
      });

      it('should not call `createPlaceholderImg`', () => {
        expect(createPlaceholderImg).not.toHaveBeenCalled();
      });
    });
  });

  describe('`handleVisible`', () => {
    beforeEach(() => {
      comp.img = undefined;
      comp.handleVisible();
    });

    it('should set `img` as `image`', () => {
      expect(comp.img).toEqual(Data.Generic.getImage());
    });
  });

  describe('Template', () => {
    beforeEach(() => {
      comp.img = Data.Generic.getImage();
      fixture.detectChanges();
    });

    it('should display img', () => {
      expect(page.img).toBeTruthy();
    });

    it('should set src', () => {
      expect(page.img.src).toBe(Data.Generic.getImage().src);
    });

    it('should set alt', () => {
      expect(page.img.alt).toBe(Data.Generic.getImage().alt);
    });

    it('should call `handleVisible` on `isVisible`', () => {
      page.img.dispatchEvent(new Event('isVisible'));

      expect(comp.handleVisible).toHaveBeenCalled();
    });
  });
});

class Page {
  get img() {
    return this.query<HTMLImageElement>('img');
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(ImageComponent);
  comp = fixture.componentInstance;
  page = new Page();

  jest.spyOn(comp, 'handleVisible');

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
