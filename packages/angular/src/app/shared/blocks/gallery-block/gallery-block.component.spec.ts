import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Data } from 'testing';
import { GalleryBlockComponent } from './gallery-block.component';

let comp: GalleryBlockComponent;
let fixture: ComponentFixture<GalleryBlockComponent>;
let page: Page;

describe('GalleryBlockComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryBlockComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should display ImageComponent', () => {
    expect(page.image.length).toBeGreaterThan(0);
  });

  it('should display ImageComponent for every image', () => {
    expect(page.image.length).toBe(5);
  });
});

function createComponent() {
  fixture = TestBed.createComponent(GalleryBlockComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class Page {
  image!: DebugElement[];

  constructor() {
    comp.data = Data.Generic.images;
  }

  addElements() {
    this.image = fixture.debugElement.queryAll(By.css('image-component'));
  }
}
