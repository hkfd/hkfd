import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Data } from 'testing';
import { LazyDirective } from 'shared';
import { VideoBlockComponent } from './video-block.component';

let comp: VideoBlockComponent;
let fixture: ComponentFixture<VideoBlockComponent>;
let page: Page;
let lazyDirective: LazyDirective;

describe('VideoBlockComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoBlockComponent, LazyDirective]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should display iframe', () => {
    expect(page.video).toBeTruthy();
  });

  it('should set LazyDirective data', () => {
    expect(lazyDirective.data).toEqual(comp.data.src);
  });
});

class Page {
  get video() {
    return this.query<HTMLIFrameElement>('iframe');
  }

  constructor() {
    comp.data = Data.Generic.getVideo();

    const directiveEl = fixture.debugElement.query(By.directive(LazyDirective));
    lazyDirective = directiveEl.injector.get<LazyDirective>(LazyDirective);
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(VideoBlockComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
