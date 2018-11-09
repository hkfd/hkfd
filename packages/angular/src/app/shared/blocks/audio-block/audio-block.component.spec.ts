import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Data } from 'testing';
import { AudioBlockComponent } from './audio-block.component';

let compHost: TestHostComponent;
let comp: AudioBlockComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;

@Component({
  selector: 'app-host',
  template: '<audio-block [data]="data"></audio-block>'
})
class TestHostComponent {
  data: any;
}

describe('AudioBlockComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, AudioBlockComponent]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  beforeEach(() => {
    compHost.data = Data.Generic.getAudio();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it('should set `data`', () => {
    expect(comp.data).toEqual(Data.Generic.getAudio());
  });

  describe('Template', () => {
    it('should display audio', () => {
      expect(page.audio).toBeTruthy();
    });

    it('should set src as `url`', () => {
      expect(page.audio.src).toBe(Data.Generic.getAudio().url);
    });
  });
});

class Page {
  get audio() {
    return this.query<HTMLAudioElement>('audio');
  }
  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(TestHostComponent);
  compHost = fixture.componentInstance;
  comp = fixture.debugElement.query(By.directive(AudioBlockComponent))
    .componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
