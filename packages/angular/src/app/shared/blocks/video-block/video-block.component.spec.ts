import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By, DomSanitizer } from '@angular/platform-browser';

import { StubLazyDirective, StubDomSanitizer, Data } from 'testing';

import { VideoBlockComponent } from './video-block.component';

let compHost: TestHostComponent;
let comp: VideoBlockComponent;
let fixture: ComponentFixture<TestHostComponent>;
let domSanitizer: DomSanitizer;
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
      declarations: [TestHostComponent, VideoBlockComponent, StubLazyDirective],
      providers: [{ provide: DomSanitizer, useClass: StubDomSanitizer }]
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

  describe('`setVideoSrc`', () => {
    beforeEach(() => comp.setVideoSrc('src'));

    it('should call `DomSanitizer` `bypassSecurityTrustResourceUrl` with `src` arg', () => {
      expect(domSanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
        'src'
      );
    });

    it('should set `videoSrc` as  `DomSanitizer` `bypassSecurityTrustResourceUrl` return', () => {
      expect(comp.videoSrc).toBe('bypassSecurityTrustResourceUrl: src');
    });
  });

  describe('`handleVisible`', () => {
    beforeEach(() => {
      comp.data = { src: 'src' };
      comp.handleVisible();
    });

    it('should call `setVideoSrc` with `data.src` arg', () => {
      expect(comp.setVideoSrc).toHaveBeenCalledWith('src');
    });
  });

  describe('Template', () => {
    describe('Container', () => {
      it('should be displayed', () => {
        expect(page.container).toBeTruthy();
      });

      it('should call `handleVisible` on `isVisible`', () => {
        page.container.dispatchEvent(new Event('isVisible'));

        expect(comp.handleVisible).toHaveBeenCalled();
      });

      describe('iframe', () => {
        describe('Has `videoSrc`', () => {
          beforeEach(() => {
            comp.videoSrc = 'about:blank';
            fixture.detectChanges();
          });

          it('should be displayed', () => {
            expect(page.video).toBeTruthy();
          });

          it('should set src as `src`', () => {
            expect(page.video.src).toBe('about:blank');
          });
        });

        describe('No `videoSrc`', () => {
          beforeEach(() => {
            comp.videoSrc = undefined;
            fixture.detectChanges();
          });

          it('should not be displayed', () => {
            expect(page.video).toBeFalsy();
          });
        });
      });
    });
  });
});

class Page {
  get container() {
    return this.query<HTMLDivElement>('div');
  }
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
  domSanitizer = fixture.debugElement.injector.get<DomSanitizer>(DomSanitizer);
  page = new Page();

  jest.spyOn(comp, 'setVideoSrc');
  jest.spyOn(comp, 'handleVisible');

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
