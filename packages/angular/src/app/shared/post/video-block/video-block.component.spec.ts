import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LazyDirective } from '../../shared.module';
import { VideoBlockComponent } from './video-block.component';

let comp: VideoBlockComponent;
let fixture: ComponentFixture<VideoBlockComponent>;
let page: Page;

fdescribe('VideoBlockComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [VideoBlockComponent, LazyDirective]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createComponent()));

  it(`should set iframe src as '' on init`, () => {
    expect(page.video.properties.src).toBe('');
  });

  it('should set iframe src on videoShow', () => {
    comp.videoShow();
    fixture.detectChanges();

    expect(page.video.properties.src).toContain('aaa');
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
    comp.data = {
      type: 'video',
      id: 'aaa'
    };
  }

  addElements() {
    this.video = fixture.debugElement.query(By.css('iframe'));
  }
}
