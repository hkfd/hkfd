import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

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

  it(`should display 'audio' element`, () => {
    expect(page.audio).toBeTruthy();
  });

  it('should set element src', () => {
    expect(page.audio.nativeElement.src).toBe('http://example.com/');
  });

  it(`should set element preload as 'none'`, () => {
    expect(page.audio.nativeElement.getAttribute('preload')).toBe('none');
  });
});

function createComponent() {
  fixture = TestBed.createComponent(AudioBlockComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class Page {
  audio!: DebugElement;

  constructor() {
    comp.data = Data.Generic.audio;
  }

  addElements() {
    this.audio = fixture.debugElement.query(By.css('audio'));
  }
}
