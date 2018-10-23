import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { Data } from 'testing';
import { AudioBlockComponent } from './audio-block.component';

let comp: AudioBlockComponent;
let fixture: ComponentFixture<AudioBlockComponent>;
let page: Page;

describe('AudioBlockComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AudioBlockComponent]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should display audio element', () => {
    expect(page.audio).toBeTruthy();
  });

  it('should set element src', () => {
    expect(page.audio.src).toBe('http://example.com/');
  });

  it('should set element preload as `none`', () => {
    expect(page.audio.getAttribute('preload')).toBe('none');
  });
});

class Page {
  get audio() {
    return this.query<HTMLAudioElement>('audio');
  }

  constructor() {
    comp.data = Data.Generic.getAudio();
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(AudioBlockComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
