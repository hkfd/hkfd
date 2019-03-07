import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StubImageComponent, Data } from 'testing';

import { GalleryBlockComponent } from './gallery-block.component';

let compHost: TestHostComponent;
let comp: GalleryBlockComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;

@Component({
  selector: 'app-host',
  template: '<gallery-block [data]="data"></gallery-block>'
})
class TestHostComponent {
  data: any;
}

describe('GalleryBlockComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        GalleryBlockComponent,
        StubImageComponent
      ]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  beforeEach(() => {
    compHost.data = Data.Generic.getImages();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `data`', () => {
    expect(comp.data).toEqual(Data.Generic.getImages());
  });

  describe('Template', () => {
    describe('Has `data`', () => {
      beforeEach(() => {
        compHost.data = Data.Generic.getImages();
        fixture.detectChanges();
      });

      it('should display images', () => {
        expect(page.images.length).toBe(Data.Generic.getImages().length);
      });

      describe('Image', () => {
        it('should set `ImageComponent` `image` as `data`', () => {
          expect(page.imageComponent.image).toEqual(
            Data.Generic.getImages()[0]
          );
        });

        it('should set `ImageComponent` `gallery` attribute', () => {
          expect(page.images[0].hasAttribute('gallery')).toBeTruthy();
        });
      });
    });

    describe('No `data`', () => {
      beforeEach(() => {
        compHost.data = undefined;
        fixture.detectChanges();
      });

      it('should not display images', () => {
        expect(page.images.length).toBeFalsy();
      });
    });
  });
});

class Page {
  get images() {
    return this.queryAll<HTMLElement>('image-component');
  }

  get imageComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubImageComponent)
    );
    return directiveEl.injector.get<StubImageComponent>(StubImageComponent);
  }

  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(TestHostComponent);
  compHost = fixture.componentInstance;
  comp = fixture.debugElement.query(By.directive(GalleryBlockComponent))
    .componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
