import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ImageBlockComponent } from './image-block.component';

let comp: ImageBlockComponent;
let fixture: ComponentFixture<ImageBlockComponent>;
let page: Page;

describe('ImageBlockComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ImageBlockComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createComponent()));

  it('should display ImageComponent', () => {
    expect(page.image).toBeTruthy();
  });
});

function createComponent() {
  fixture = TestBed.createComponent(ImageBlockComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class Page {
  image: DebugElement;

  constructor() {
    comp.data = {
      type: 'image',
      image: { name: '', alt: '' },
      fullBleed: false
    };
  }

  addElements() {
    this.image = fixture.debugElement.query(By.css('image'));
  }
}