import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SlicePipe } from '@angular/common';

import { StubImageComponent, Data } from 'testing';

import { DuoBlockComponent } from './duo-block.component';

let compHost: TestHostComponent;
let comp: DuoBlockComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;

@Component({
  selector: 'app-host',
  template: '<duo-block [data]="data"></duo-block>'
})
class TestHostComponent {
  data: any;
}

describe('DuoBlockComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, DuoBlockComponent, StubImageComponent]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  beforeEach(() => {
    compHost.data = Data.Generic.getDuo();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `data`', () => {
    expect(comp.data).toEqual(Data.Generic.getDuo());
  });

  describe('Template', () => {
    describe('Has `data`', () => {
      beforeEach(() => {
        compHost.data = Data.Generic.getDuo();
        fixture.detectChanges();
      });

      it('should display images', () => {
        expect(page.images.length).toBe(Data.Generic.getDuo().length);
      });

      it('should call `SlicePipe` with `images` and `0:2` args', () => {
        expect(SlicePipe.prototype.transform).toHaveBeenCalledWith(
          Data.Generic.getDuo(),
          0,
          2
        );
      });

      describe('Image', () => {
        it('should set `ImageComponent` `image` as `data`', () => {
          expect(page.imageComponent.image).toEqual(Data.Generic.getDuo()[0]);
        });

        it('should set `ImageComponent` `full-height` attribute', () => {
          expect(page.images[0].hasAttribute('full-height')).toBeTruthy();
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
  comp = fixture.debugElement.query(By.directive(DuoBlockComponent))
    .componentInstance;
  jest.spyOn(SlicePipe.prototype, 'transform');
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
