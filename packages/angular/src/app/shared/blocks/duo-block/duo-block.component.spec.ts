import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SlicePipe } from '@angular/common';

import { Data } from 'testing';
import { DuoBlockComponent } from './duo-block.component';

let comp: DuoBlockComponent;
let fixture: ComponentFixture<DuoBlockComponent>;
let page: Page;
let slicePipe: jasmine.Spy;

describe('DuoBlockComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DuoBlockComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it(`should display two ImageComponent's`, () => {
    expect(page.image.length).toBe(2);
  });

  it('should call SlicePipe', () => {
    expect(slicePipe).toHaveBeenCalled();
  });

  it('should call SlicePipe with 0:2', () => {
    expect(slicePipe).toHaveBeenCalledWith(Data.Generic.duo, 0, 2);
  });

  it(`should only display two ImageComponent's`, () => {
    comp.data = Data.Generic.images;
    fixture.detectChanges();
    page.addElements();

    expect(page.image.length).toBe(2);
  });
});

class Page {
  image!: DebugElement[];

  constructor() {
    comp.data = Data.Generic.duo;
  }

  addElements() {
    this.image = fixture.debugElement.queryAll(By.css('image-component'));
  }
}

function createComponent() {
  fixture = TestBed.createComponent(DuoBlockComponent);
  comp = fixture.componentInstance;
  slicePipe = spyOn(SlicePipe.prototype, 'transform').and.callThrough();
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}
