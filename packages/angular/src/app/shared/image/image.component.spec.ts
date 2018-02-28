import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { LazyDirective, CloudinaryPipe } from '../shared.module';
import { ImageComponent } from './image.component';

let comp: ImageComponent;
let fixture: ComponentFixture<ImageComponent>;
let page: Page;

describe('ImageComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ImageComponent, LazyDirective]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createComponent()));

  it('should not call CloudinaryPipe without image', () => {
    comp.ngOnChanges({ image: new SimpleChange(null, null, null) });

    expect(page.cloudinaryPipe).not.toHaveBeenCalled();
  });

  describe('OnChanges', () => {
    beforeEach(() =>
      comp.ngOnChanges({ image: new SimpleChange(null, comp.image, null) })
    );

    it('should call CloudinaryPipe for src', () => {
      expect(page.cloudinaryPipe).toHaveBeenCalled();
    });

    it('should call CloudinaryPipe with src args', () => {
      expect(page.cloudinaryPipe).toHaveBeenCalledWith('example', {
        width: 64
      });
    });

    it('should set src', () => {
      expect(comp.src).toBeDefined();
    });

    it('should call CloudinaryPipe for srcset', () => {
      expect(page.cloudinaryPipe).toHaveBeenCalledTimes(6);
    });

    it('should call CloudinaryPipe with srcset args', () => {
      expect(page.cloudinaryPipe).toHaveBeenCalledWith('example', {
        width: jasmine.any(Number),
        height: jasmine.any(Number)
      });
    });

    it('should set srcset', () => {
      expect(comp.srcset).toBeDefined();
    });

    it(`should set srcset with attr as 'srcset'`, () => {
      expect(comp.srcset.attr).toBe('srcset');
    });

    it('should set srcset with value', () => {
      expect(comp.srcset.value.length).toBe(5);
    });
  });

  describe('imageLoaded', () => {
    beforeEach(() =>
      comp.ngOnChanges({ image: new SimpleChange(null, comp.image, null) })
    );

    it('should set image loaded to true', () => {
      comp.image.loaded = false;
      comp.imageLoaded();

      expect(comp.image.loaded).toBe(true);
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(ImageComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}

class Page {
  imageLoaded: jasmine.Spy;
  cloudinaryPipe: jasmine.Spy;

  constructor() {
    comp.image = {
      name: 'example',
      alt: ''
    };

    const cloudinary = fixture.debugElement.injector.get(CloudinaryPipe);

    this.imageLoaded = spyOn(comp, 'imageLoaded').and.callThrough();
    this.cloudinaryPipe = spyOn(cloudinary, 'transform').and.callThrough();
  }
}
