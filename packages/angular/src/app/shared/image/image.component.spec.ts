import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Data } from 'testing';
import { LazyDirective } from 'shared';
import { ImageComponent } from './image.component';

let comp: ImageComponent;
let fixture: ComponentFixture<ImageComponent>;
let page: Page;
let lazyDirective: LazyDirective;

describe('ImageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageComponent, LazyDirective]
    }).compileComponents();
  }));

  beforeEach(async(() => createComponent()));

  it('should display img', () => {
    expect(page.img).toBeTruthy();
  });

  it('should set img src', () => {
    expect(page.img.properties.src).toBe('example.jpg');
  });

  it('should set img alt', () => {
    expect(page.img.properties.alt).toBe('Example image');
  });

  it('should set LazyDirective data', () => {
    expect(lazyDirective.data).toEqual(comp.image.srcset);
  });
});

class Page {
  img!: DebugElement;

  constructor() {
    comp.image = Data.Generic.image;

    const directiveEl = fixture.debugElement.query(By.directive(LazyDirective));
    lazyDirective = directiveEl.injector.get<LazyDirective>(LazyDirective);
  }

  addElements() {
    this.img = fixture.debugElement.query(By.css('img'));
  }
}

function createComponent() {
  fixture = TestBed.createComponent(ImageComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}
