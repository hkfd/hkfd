import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { duoBlock } from '../../../../testing';
import { DuoBlockComponent } from './duo-block.component';

let comp: DuoBlockComponent;
let fixture: ComponentFixture<DuoBlockComponent>;
let page: Page;

describe('DuoBlockComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [DuoBlockComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createComponent()));

  it('should display ImageComponent', () => {
    expect(page.image.length).toBeGreaterThan(0);
  });

  it('should display ImageComponent twice', () => {
    expect(page.image.length).toBe(2);
  });
});

function createComponent() {
  fixture = TestBed.createComponent(DuoBlockComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class Page {
  image: DebugElement[];

  constructor() {
    comp.data = duoBlock;
  }

  addElements() {
    this.image = fixture.debugElement.queryAll(By.css('image-component'));
  }
}
