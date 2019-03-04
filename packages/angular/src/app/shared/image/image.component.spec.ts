import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { StubLazyDirective, Data } from 'testing';
import { createPlaceholderImg, createFullImg } from './image.helpers';
import { ImageComponent } from './image.component';

let comp: ImageComponent;
let fixture: ComponentFixture<ImageComponent>;
let page: Page;

jest.mock('./image.helpers', () => ({
  createPlaceholderImg: jest.fn().mockReturnValue('createPlaceholderImgReturn'),
  createFullImg: jest.fn().mockReturnValue('createFullImgReturn')
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

  describe('`handleImgLoad`', () => {
    beforeEach(() =>
      (comp.displayImage as jest.Mock).mockImplementation(() => undefined)
    );

    describe('No `img`', () => {
      it('should throw error', () => {
        comp.img = undefined;

        expect(() => comp.handleImgLoad()).toThrowError('No `img`');
      });
    });

    describe('Has `img`', () => {
      describe('`img.state` is loading-placeholder', () => {
        beforeEach(() => {
          comp.hasLoadedPlaceholderImage = false;
          comp.img = { state: 'loading-placeholder' } as any;
          comp.handleImgLoad();
        });

        it('should set `hasLoadedPlaceholderImage` as `true`', () => {
          expect(comp.hasLoadedPlaceholderImage).toBe(true);
        });

        it('should call `displayImage`', () => {
          expect(comp.displayImage).toHaveBeenCalled();
        });
      });

      describe('`img.state` is loading-full', () => {
        beforeEach(() => {
          comp.hasLoadedFullImage = false;
          comp.img = { state: 'loading-full' } as any;
          comp.handleImgLoad();
        });

        it('should set `hasLoadedFullImage` as `true`', () => {
          expect(comp.hasLoadedFullImage).toBe(true);
        });

        it('should call `displayImage`', () => {
          expect(comp.displayImage).toHaveBeenCalled();
        });
      });
    });
  });

  describe('`handleImgVisible`', () => {
    beforeEach(() => {
      (comp.displayImage as jest.Mock).mockImplementation(() => undefined);
      comp.isVisible = false;
      comp.handleImgVisible();
    });

    it('should set `isVisible` as `true`', () => {
      expect(comp.isVisible).toBe(true);
    });

    it('should call `displayImage`', () => {
      expect(comp.displayImage).toHaveBeenCalled();
    });
  });

  describe('`displayPlaceHolderImage`', () => {
    describe('No `image`', () => {
      beforeEach(() => ((comp as any)._image = undefined));

      it('should throw error', () => {
        expect(() => comp.displayPlaceHolderImage()).toThrowError('No `image`');
      });
    });

    describe('Has `image`', () => {
      beforeEach(() => (comp.image = Data.Generic.getImage()));

      describe('`isVisible` and `hasLoadedPlaceholderImage`', () => {
        beforeEach(() => {
          comp.isVisible = true;
          comp.hasLoadedPlaceholderImage = true;
          comp.displayPlaceHolderImage();
        });

        it('should call `createFullImg` with `image` args', () => {
          expect(createFullImg).toHaveBeenCalledWith(Data.Generic.getImage());
        });

        it('should set `img` as `createFullImg` return', () => {
          expect(comp.img).toBe('createFullImgReturn');
        });
      });

      describe('`isVisible` is `false`', () => {
        beforeEach(() => {
          comp.isVisible = false;
          comp.hasLoadedPlaceholderImage = true;
          comp.displayPlaceHolderImage();
        });

        it('should not call `createFullImg`', () => {
          expect(createFullImg).not.toHaveBeenCalled();
        });
      });

      describe('`hasLoadedPlaceholderImage` is `false`', () => {
        beforeEach(() => {
          comp.isVisible = true;
          comp.hasLoadedPlaceholderImage = false;
          comp.displayPlaceHolderImage();
        });

        it('should not call `createFullImg`', () => {
          expect(createFullImg).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('`displayFullImage`', () => {
    describe('No `img`', () => {
      beforeEach(() => (comp.img = undefined));

      it('should throw error', () => {
        expect(() => comp.displayFullImage()).toThrowError('No `img`');
      });
    });

    describe('Has `img`', () => {
      beforeEach(() => (comp.img = { src: 'src' } as any));

      it('should set `img.state` as loaded if `hasLoadedFullImage` is `true`', () => {
        comp.hasLoadedFullImage = true;
        comp.displayFullImage();

        expect(comp.img).toEqual({ src: 'src', state: 'loaded' });
      });

      it('should not set `img.state` as loaded if `hasLoadedFullImage` is `false`', () => {
        comp.hasLoadedFullImage = false;
        comp.displayFullImage();

        expect(comp.img).toEqual({ src: 'src' });
      });
    });
  });

  describe('`displayImage`', () => {
    beforeEach(() => {
      (comp.displayPlaceHolderImage as jest.Mock).mockImplementation(
        () => undefined
      );
      (comp.displayFullImage as jest.Mock).mockImplementation(() => undefined);
    });

    describe('No `img`', () => {
      beforeEach(() => (comp.img = undefined));

      it('should throw error', () => {
        expect(() => comp.displayImage()).toThrowError('No `img`');
      });
    });

    describe('Has `img`', () => {
      it('should call `displayPlaceHolderImg` if `img.state` is loading-placeholder', () => {
        comp.img = {
          state: 'loading-placeholder'
        } as any;
        comp.displayImage();

        expect(comp.displayPlaceHolderImage).toHaveBeenCalled();
      });

      it('should call `displayFullImg` if `img.state` is loading-full', () => {
        comp.img = {
          state: 'loading-full'
        } as any;
        comp.displayImage();

        expect(comp.displayFullImage).toHaveBeenCalled();
      });
    });
  });

  describe('Template', () => {
    describe('Container', () => {
      describe('Has `img`', () => {
        beforeEach(() => {
          comp.img = {} as any;
          fixture.detectChanges();
        });

        it('should be displayed', () => {
          expect(page.container).toBeTruthy();
        });

        it('should set className as `img.state`', () => {
          comp.img = { state: 'state' } as any;
          fixture.detectChanges();

          expect(page.container.className).toBe('state');
        });

        it('should call `handleImgVisible` on `isVisible`', () => {
          page.container.dispatchEvent(new Event('isVisible'));

          expect(comp.handleImgVisible).toHaveBeenCalled();
        });

        describe('Img', () => {
          describe('`isVisible` is `false`', () => {
            beforeEach(() => {
              comp.isVisible = false;
              fixture.detectChanges();
            });

            it('should not be displayed', () => {
              expect(page.img).toBeFalsy();
            });
          });

          describe('`isVisible` is `true`', () => {
            beforeEach(() => {
              comp.isVisible = true;
              fixture.detectChanges();
            });

            it('should be displayed', () => {
              expect(page.img).toBeTruthy();
            });

            it('should set src as `img.src`', () => {
              comp.img = { src: 'src' } as any;
              fixture.detectChanges();

              expect(page.img.src).toBe('http://localhost/src');
            });

            describe('`srcset`', () => {
              it('should set srcset as `img.srcset` if `img.srcset`', () => {
                comp.img = { srcset: 'srcset' } as any;
                fixture.detectChanges();

                expect(page.img.srcset).toBe('srcset');
              });

              it('should not set srcset if `img.srcset` is `undefined`', () => {
                comp.img = { srcset: undefined } as any;
                fixture.detectChanges();

                expect(page.img.srcset).toBe('');
              });
            });

            describe('`alt`', () => {
              it('should set alt as `img.alt` if `img.alt`', () => {
                comp.img = { alt: 'alt' } as any;
                fixture.detectChanges();

                expect(page.img.alt).toBe('alt');
              });

              it('should not set alt if `img.alt` is `undefined`', () => {
                comp.img = { alt: undefined } as any;
                fixture.detectChanges();

                expect(page.img.alt).toBe('');
              });
            });

            it('should call `handleImgLoad` on `load`', () => {
              page.img.dispatchEvent(new Event('load'));

              expect(comp.handleImgLoad).toHaveBeenCalled();
            });
          });
        });
      });

      describe('No `img`', () => {
        beforeEach(() => {
          comp.img = undefined;
          fixture.detectChanges();
        });

        it('should not be displayed', () => {
          expect(page.container).toBeFalsy();
        });
      });
    });
  });
});

class Page {
  get container() {
    return this.query<HTMLDivElement>('div');
  }
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

  jest.spyOn(comp, 'displayImage');
  jest.spyOn(comp, 'displayFullImage');
  jest.spyOn(comp, 'displayPlaceHolderImage');
  jest.spyOn(comp, 'handleImgLoad');
  jest.spyOn(comp, 'handleImgVisible');

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
