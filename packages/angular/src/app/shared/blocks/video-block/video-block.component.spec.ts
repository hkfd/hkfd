import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Data } from '../../../../testing';
import { LazyDirective } from '../../shared.module';
import { VideoBlockComponent } from './video-block.component';

let comp: VideoBlockComponent;
let fixture: ComponentFixture<VideoBlockComponent>;
let page: Page;
let lazyDirective: LazyDirective;

describe('VideoBlockComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [VideoBlockComponent, LazyDirective]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createComponent()));

  it('should display iframe', () => {
    expect(page.video).toBeTruthy();
  });

  it('should set LazyDirective data', () => {
    expect(lazyDirective.data).toEqual(comp.data.src);
  });
});

function createComponent() {
  fixture = TestBed.createComponent(VideoBlockComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class Page {
  video: DebugElement;

  constructor() {
    comp.data = Data.Generic.video;

    const directiveEl = fixture.debugElement.query(By.directive(LazyDirective));
    lazyDirective = directiveEl.injector.get(LazyDirective);
  }

  addElements() {
    this.video = fixture.debugElement.query(By.css('iframe'));
  }
}
