import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  MockMetaService,
  MockApiPipe,
  StubFormComponent,
  StubImageComponent
} from 'testing';

import { MetaService } from 'shared';
import { ContactImages } from './contact.images';
import { ContactComponent } from './contact.component';

let comp: ContactComponent;
let fixture: ComponentFixture<ContactComponent>;
let page: Page;
let metaService: MetaService;
let apiPipe: jasmine.Spy;

describe('ContactComponent', () => {
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        ContactComponent,
        StubFormComponent,
        StubImageComponent,
        MockApiPipe
      ],
      providers: [{ provide: MetaService, useClass: MockMetaService }]
    }).compileComponents()));

  beforeEach(async(() => createComponent()));

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  describe('`ngOnInit`', () => {
    it('should call `MetaService` `setMetaTags` with `title` and `url` args', () => {
      expect(metaService.setMetaTags).toHaveBeenCalledWith({
        title: 'Contact',
        url: 'contact'
      });
    });
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
        expect(apiPipe).toHaveBeenCalledWith(ContactImages.contact);
      });

      it('should set `ImageComponent` `image` as `image`', () => {
        expect(page.imageComponent.image).toEqual(comp.images.contact as any);
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
  metaService = fixture.debugElement.injector.get<MetaService>(MetaService);
  apiPipe = spyOn(MockApiPipe.prototype, 'transform').and.callThrough();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => fixture.detectChanges());
}
