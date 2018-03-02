import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { LazyDirective, CloudinaryPipe } from '../shared.module';
import { ImageComponent } from './image.component';

let comp: ImageComponent;
let fixture: ComponentFixture<ImageComponent>;
let page: Page;
let cloudinaryPipe: CloudinaryPipeStub;

describe('ImageComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ImageComponent, LazyDirective]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createComponent()));

  it('should not call CloudinaryPipe transform without image', () => {
    comp.ngOnChanges({ image: new SimpleChange(null, null, null) });

    expect(cloudinaryPipe.transform).not.toHaveBeenCalled();
  });

  describe('OnChanges', () => {
    beforeEach(() =>
      comp.ngOnChanges({ image: new SimpleChange(null, comp.image, null) })
    );

    it('should call CloudinaryPipe transform for src', () => {
      expect(cloudinaryPipe.transform).toHaveBeenCalled();
    });

    it('should call CloudinaryPipe transform with src args', () => {
      expect(cloudinaryPipe.transform).toHaveBeenCalledWith('example', {
        width: 64
      });
    });

    it('should set src', () => {
      expect(comp.src).toBeDefined();
    });

    it('should call CloudinaryPipe transform for srcset', () => {
      expect(cloudinaryPipe.transform).toHaveBeenCalledTimes(6);
    });

    it('should call CloudinaryPipe transform with srcset args', () => {
      expect(cloudinaryPipe.transform).toHaveBeenCalledWith('example', {
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
  cloudinaryPipe = new CloudinaryPipeStub();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
  });
}

class CloudinaryPipeStub {
  transform: jasmine.Spy;

  constructor() {
    const cloudinary = fixture.debugElement.injector.get(CloudinaryPipe);

    this.transform = spyOn(cloudinary, 'transform').and.callThrough();
  }
}

class Page {
  imageLoaded: jasmine.Spy;

  constructor() {
    comp.image = {
      name: 'example',
      alt: ''
    };

    this.imageLoaded = spyOn(comp, 'imageLoaded').and.callThrough();
  }
}
