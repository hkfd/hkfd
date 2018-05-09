import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import {
  RouterTestingModule,
  MockTitleService,
  MockApiPipe
} from '../../../testing';

import { TitleService } from '../../shared/shared.module';
import { ContactImages } from './contact.images';
import { ContactComponent } from './contact.component';

const app = <any>window;
let comp: ContactComponent;
let fixture: ComponentFixture<ContactComponent>;
let page: Page;
let titleService: TitleService;
let apiPipe: jasmine.Spy;

describe('ContactComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [ContactComponent, MockApiPipe],
        providers: [{ provide: TitleService, useClass: MockTitleService }],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(async(() => createComponent()));

  it('should call TitleService setTitle', () => {
    expect(titleService.setTitle).toHaveBeenCalled();
  });

  it('should call TitleService setTitle with argument', () => {
    expect(titleService.setTitle).toHaveBeenCalledWith(jasmine.any(String));
  });

  it('should call ApiPipe', () => {
    expect(apiPipe).toHaveBeenCalled();
  });

  it('should call ApiPipe with contact image', () => {
    expect(apiPipe).toHaveBeenCalledWith(ContactImages.contact);
  });

  describe('messageClick', () => {
    it(`should call messageClick on 'message us' click`, () => {
      page.messageButton.triggerEventHandler('click', {});

      expect(page.messageClick).toHaveBeenCalled();
    });

    it('should call ga', () => {
      page.messageButton.triggerEventHandler('click', {});

      expect(app.ga).toHaveBeenCalled();
    });

    it('should call ga with params', () => {
      page.messageButton.triggerEventHandler('click', {});

      expect(app.ga).toHaveBeenCalledWith(
        'send',
        'event',
        'Message Us Button',
        'click'
      );
    });
  });
});

function createComponent() {
  fixture = TestBed.createComponent(ContactComponent);
  comp = fixture.componentInstance;
  titleService = fixture.debugElement.injector.get(TitleService);
  apiPipe = spyOn(MockApiPipe.prototype, 'transform').and.callThrough();
  page = new Page();
  new GoogleAnalytics();

  fixture.detectChanges();
  return fixture.whenStable().then(_ => {
    fixture.detectChanges();
    page.addElements();
  });
}

class GoogleAnalytics {
  constructor() {
    app.ga = jasmine.createSpy('ga');
  }
}

class Page {
  messageClick: jasmine.Spy;

  messageButton: DebugElement;

  constructor() {
    this.messageClick = spyOn(comp, 'messageClick').and.callThrough();
  }

  addElements() {
    this.messageButton = fixture.debugElement.query(By.css('.button'));
  }
}
