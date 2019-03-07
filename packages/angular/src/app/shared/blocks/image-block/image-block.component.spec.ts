import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StubImageComponent, Data } from 'testing';

import { ImageBlockComponent } from './image-block.component';

let compHost: TestHostComponent;
let comp: ImageBlockComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;

@Component({
  selector: 'app-host',
  template: '<image-block [data]="data"></image-block>'
})
class TestHostComponent {
  data: any;
}

describe('ImageBlockComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, ImageBlockComponent, StubImageComponent]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  beforeEach(() => {
    compHost.data = Data.Generic.getImage();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `data`', () => {
    expect(comp.data).toEqual(Data.Generic.getImage());
  });

  describe('Template', () => {
    describe('Has `data`', () => {
      beforeEach(() => {
        compHost.data = Data.Generic.getImage();
        fixture.detectChanges();
      });

      it('should display image', () => {
        expect(page.image).toBeTruthy();
      });

      it('should set `ImageComponent` `image` as `data`', () => {
        expect(page.imageComponent.image).toEqual(Data.Generic.getImage());
      });
    });

    describe('No `data`', () => {
      beforeEach(() => {
        compHost.data = undefined;
        fixture.detectChanges();
      });

      it('should not display image', () => {
        expect(page.image).toBeFalsy();
      });
    });
  });
});

class Page {
  get image() {
    return this.query<HTMLElement>('image-component');
  }

  get imageComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubImageComponent)
    );
    return directiveEl.injector.get<StubImageComponent>(StubImageComponent);
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(TestHostComponent);
  compHost = fixture.componentInstance;
  comp = fixture.debugElement.query(By.directive(ImageBlockComponent))
    .componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
