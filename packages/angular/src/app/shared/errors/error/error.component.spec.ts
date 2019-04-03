import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RouterTestingModule } from 'testing';
import { ErrorComponent } from './error.component';

let comp: ErrorComponent;
let fixture: ComponentFixture<TestHostComponent>;
let page: Page;

@Component({
  selector: 'app-host',
  template: '<error></error>'
})
class TestHostComponent {}

describe('ErrorComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [TestHostComponent, ErrorComponent]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('Template', () => {
    describe('Home link', () => {
      it('should be displayed', () => {
        expect(page.homeLink).toBeTruthy();
      });

      it('should set href as homepage', () => {
        expect(page.homeLink.href).toBe('http://localhost/');
      });
    });
  });
});

class Page {
  get homeLink() {
    return this.query<HTMLAnchorElement>('a');
  }
  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(TestHostComponent);
  comp = fixture.debugElement.query(By.directive(ErrorComponent))
    .componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
