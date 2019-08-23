import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  MockApiPipe,
  StubFormComponent,
  StubImageComponent
} from 'testing';

import { ContactImages } from './contact.images';
import { ContactComponent } from './contact.component';

let comp: ContactComponent;
let fixture: ComponentFixture<ContactComponent>;
let page: Page;

describe('ContactComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        ContactComponent,
        StubFormComponent,
        StubImageComponent,
        MockApiPipe
      ]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('Template', () => {
    it('should display title', () => {
      expect(page.title).toBeTruthy();
    });

    describe('Contact', () => {
      it('should be displayed', () => {
        expect(page.form).toBeTruthy();
      });
    });

    describe('Contact image', () => {
      it('should be displayed', () => {
        expect(page.contactImage).toBeTruthy();
      });

      it('should call `ApiPipe` with `image`', () => {
        expect(MockApiPipe.prototype.transform).toHaveBeenCalledWith(
          ContactImages.contact
        );
      });

      it('should set `ImageComponent` `image` as transformed `image`', () => {
        expect(page.imageComponent.image).toEqual({
          'mock-api-pipe': comp.images.contact
        } as any);
      });

      it('should set `ImageComponent` `full-height` attribute', () => {
        expect(page.contactImage.hasAttribute('full-height')).toBeTruthy();
      });
    });
  });
});

class Page {
  get title() {
    return this.query<HTMLHeadingElement>('h1');
  }
  get form() {
    return this.query<HTMLElement>('app-form');
  }
  get contactImage() {
    return this.query<HTMLImageElement>('#contact-image image-component');
  }

  get imageComponent() {
    const directiveEl = fixture.debugElement.query(
      By.directive(StubImageComponent)
    );
    return directiveEl.injector.get<StubImageComponent>(StubImageComponent);
  }

  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(ContactComponent);
  comp = fixture.componentInstance;
  page = new Page();
  jest.spyOn(MockApiPipe.prototype, 'transform');

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
