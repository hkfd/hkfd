import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
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

  it('should only display two ImageComponents', () => {
    expect(page.image.length).toBe(2);
  });

  it('should call SlicePipe', () => {
    expect(slicePipe).toHaveBeenCalled();
  });

  it('should call SlicePipe with 0:2', () => {
    expect(slicePipe).toHaveBeenCalledWith(Data.Generic.duo, 0, 2);
  });

  it('should only display two ImageComponents', () => {
    comp.data = Data.Generic.images;
    fixture.detectChanges();

    expect(page.image.length).toBe(2);
  });
});

class Page {
  get image() {
    return this.queryAll<HTMLElement>('image-component');
  }

  constructor() {
    comp.data = Data.Generic.duo;
  }

  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(DuoBlockComponent);
  comp = fixture.componentInstance;
  slicePipe = spyOn(SlicePipe.prototype, 'transform').and.callThrough();
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
