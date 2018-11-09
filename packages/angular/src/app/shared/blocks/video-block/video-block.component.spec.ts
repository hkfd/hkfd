import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StubLazyDirective, Data } from 'testing';

import { VideoBlockComponent } from './video-block.component';

let compHost: TestHostComponent;
let comp: VideoBlockComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;

@Component({
  selector: 'app-host',
  template: '<video-block [data]="data"></video-block>'
})
class TestHostComponent {
  data: any;
}

describe('VideoBlockComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, VideoBlockComponent, StubLazyDirective]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  beforeEach(() => {
    compHost.data = Data.Generic.getVideo();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `data`', () => {
    expect(comp.data).toEqual(Data.Generic.getVideo());
  });

  describe('Template', () => {
    describe('iframe', () => {
      describe('has `data`', () => {
        beforeEach(() => {
          compHost.data = Data.Generic.getVideo();
          fixture.detectChanges();
        });

        it('should be displayed', () => {
          expect(page.video).toBeTruthy();
        });

        it('should set `LazyDirective` `data` as `src`', () => {
          expect(page.lazyDirective.data).toEqual(comp.data.src);
        });
      });

      describe('no `data`', () => {
        beforeEach(() => {
          (compHost.data as any) = undefined;
          fixture.detectChanges();
        });

        it('should not be displayed', () => {
          expect(page.video).toBeFalsy();
        });
      });
    });
  });
});

class Page {
  get video() {
    return this.query<HTMLIFrameElement>('iframe');
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
  fixture = TestBed.createComponent(TestHostComponent);
  compHost = fixture.componentInstance;
  comp = fixture.debugElement.query(By.directive(VideoBlockComponent))
    .componentInstance;

  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
