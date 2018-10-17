import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ImageBlockComponent } from './image-block.component';

let comp: ImageBlockComponent;
let fixture: ComponentFixture<ImageBlockComponent>;
let page: Page;

describe('ImageBlockComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageBlockComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should display ImageComponent', () => {
    expect(page.image).toBeTruthy();
  });
});

class Page {
  get image() {
    return this.query<HTMLElement>('image-component');
  }

  constructor() {
    comp.data = {
      src: '',
      srcset: {
        attr: 'srcset',
        val: ['']
      },
      alt: ''
    };
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(ImageBlockComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
